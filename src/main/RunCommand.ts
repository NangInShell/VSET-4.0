import { spawn, spawnSync } from 'child_process'
import path from 'path'
import { app} from 'electron'
import { ref } from 'vue'
import { vi } from 'element-plus/es/locale';

const electron = require("electron");
const appPath = electron.app.getAppPath();
const fs = require('fs');

let child


function generate_vpy(config_json,videoName) {
  let vpyContent = '';

  vpyContent += 'import vapoursynth as vs\n'
  vpyContent += 'core = vs.core\n'
  vpyContent += 'res = core.lsmas.LWLibavSource(r"' + videoName + '")\n'

  //前置缩放(需要在此改进色彩控制)
  if(config_json.UseResize_BeforeEnhance==true){
    vpyContent +=
    'res = core.resize.Bicubic(clip=res,width=' + config_json.ResizeWidth_BeforeEnhance +
     ',height=' + config_json.ResizeHeight_BeforeEnhance + ',format=vs.YUV420P16)\n'
  }else{
    vpyContent +='res = core.resize.Bicubic(clip=res,format=vs.YUV420P16)\n'
  }

  //超分
  if(config_json.useSR==true){
    vpyContent +='res = core.resize.Bicubic(clip=res,range=1,matrix_in_s="709",format=vs.RGB48)\n'
    vpyContent +='res=core.fmtc.bitdepth(res, bits=32)\n'

    //超分设备
    vpyContent +='from vsmlrt import CUGAN,RealESRGAN,Waifu2x,RIFE,Backend\n'
    if (config_json.RealcuganInferenceValue == 'Cuda'){
      vpyContent +='device_sr=Backend.ORT_CUDA()\n'
    }
    if (config_json.RealcuganInferenceValue == 'TensorRt'){
      vpyContent +='device_sr=Backend.TRT()\n'
    }
    if (config_json.RealcuganInferenceValue == 'NCNN'){
      vpyContent +='device_sr=Backend.NCNN_VK()\n'
    }
    if (config_json.RealcuganInferenceValue == 'OV'){
      vpyContent +='device_sr=Backend.OV_GPU()\n'
    }
    vpyContent +='device_sr.device_id=0\n'
    vpyContent +='device_sr.fp16=True\n'


  if(config_json.SRMethodValue=='Real_cugan'){
    const model_switch = {
      'pro-conservative-up2x': [0, 2, 2],
      'pro-conservative-up3x': [0, 3, 2],
      'pro-denoise3x-up2x': [3, 2, 2],
      'pro-denoise3x-up3x': [3, 3, 2],
      'pro-no-denoise3x-up2x': [-1, 2, 2],
      'pro-no-denoise3x-up3x': [-1, 3, 2],
      'up2x-latest-conservative': [0, 2, 1],
      'up2x-latest-denoise1x': [1, 2, 1],
      'up2x-latest-denoise2x': [2, 2, 1],
      'up2x-latest-denoise3x': [3, 2, 1],
      'up2x-latest-no-denoise': [-1, 2, 1],
      'up3x-latest-conservative': [0, 3, 1],
      'up3x-latest-denoise3x': [3, 3, 1],
      'up3x-latest-no-denoise': [-1, 3, 1],
      'up4x-latest-conservative': [0, 4, 1],
      'up4x-latest-denoise3x': [3, 4, 1],
      'up4x-latest-no-denoise': [-1, 4, 1]
    };
    const [noise, scale, version] = model_switch[config_json.RealcuganModelValue] || [0, 2, 2];
    vpyContent += `res = CUGAN(res, noise=${noise}, scale=${scale}, tiles=${config_json.RealcuganTileValue}, version=${version}, alpha=${config_json.RealcuganAlphaValue}, backend=device_sr)\n`
  }
  if (config_json.SRMethodValue=='Real_esrgan'){
    const model_switch = {
            'animevideov3': 0,
            'animevideo-xsx2': 1,
            'animevideo-xsx4': 2,
            'animejanaiV2L1' : 5005,
            'animejanaiV2L2' : 5006,
            'animejanaiV2L3' : 5007,
            'animejanaiV3_HD_L1' : 5008,
            'animejanaiV3_HD_L2' : 5009,
            'animejanaiV3_HD_L3' : 5010,
    };
    const model = model_switch[config_json.RealesrganModelValue] || 0;
    vpyContent +='res = RealESRGAN(res, scale=' + config_json.RealesrganScaleValue + ',tiles=' + 
    config_json.RealesrganTileValue + ',model=' + model + ', backend=device_sr)\n'
  }
}
//后置缩放(需要在此改进色彩控制)
if(config_json.UseResize_AfterEnhance==true){
  vpyContent +=
  'res = core.resize.Bicubic(clip=res,width=' + config_json.ResizeWidth_AfterEnhance +
   ',height=' + config_json.ResizeHeight_AfterEnhance + ',format=vs.YUV420P16)\n'
}else{
  vpyContent +='res = core.resize.Bicubic(clip=res,matrix_s="709",format=vs.YUV420P16)\n'
}
vpyContent += 'res.set_output()\n'
  return vpyContent
}

export async function RunCommand(event, command, config_json): Promise<void> {

  const commandValue = command['_value'];
  const videos = config_json.fileList;

// 转换为格式化的 JSON 字符串
// const jsonString = JSON.stringify(config_json, null, 2); 

//生成vpy文件
for (const video of videos){
const vpyPath = path.join(appPath, "vpyFiles", "vpyFile.vpy");
const vipipePath=path.join(appPath, "package", "VSPipe.exe");
const ffmpegPath=path.join(appPath, "package", "ffmpeg.exe");
const vpyFile = generate_vpy(config_json,video)
fs.writeFileSync(vpyPath, vpyFile);

let cmd = '"'+vipipePath+'"'+' "-c" "y4m" '+'"'+vpyPath+'" "-" | '+'"'+ffmpegPath+'" "-hide_banner" "-y" "-i" "pipe:" "-i" "'+
          video+'"'+' "-map" "0:v:0" "-map" "1:a" "-c:v" '+'"'+config_json.encoderValue+'" '

if(config_json.encoderValue=='libx265'){
  cmd +='"-pix_fmt" "yuv420p10le" "-profile:v" "main10" "-vtag" "hvc1" '
}
if(config_json.encoderValue=='libx264'){
  cmd +='"-pix_fmt" "yuv420p" "-profile:v" "main" '
}
if(config_json.encoderValue=='libaom-av1'){
  cmd +='"-pix_fmt" "yuv420p10le" '
}
if(config_json.encoderValue=='h264_nvenc'){
  cmd +='"-pix_fmt" "yuv420p" '
}
if(config_json.encoderValue=='hevc_nvenc'){
  cmd +='"-pix_fmt" "p010le" "-profile:v" "main10" "-vtag" "hvc1" '
}
if(config_json.encoderValue=='av1_nvenc'){
  cmd +='"-pix_fmt" "p010le" '
}

cmd+='-preset '+'"'+config_json.qualityValue+'" '
if(config_json.isUseCrf==true){
  cmd+='"-crf" '+'"'+config_json.crfValue+'" '
}
else{
  cmd+='"-b:v" '+'"'+config_json.bitValue+'M" '
}

if(config_json.isSaveAudio==true){
  cmd+='"-c:a" "copy" '
}
else{
  cmd+='"-c:a" '+'"'+config_json.AudioContainer.toLowerCase()+'" '
}

cmd += '"'+config_json.outputfolder+'/'+path.parse(path.basename(video)).name+'_enhance'+'.'+config_json.videoContainer.toLowerCase()+'"'

  event.sender.send('ffmpeg-output', `Executing command: ${cmd}\n`)
// 开始运行
  child = spawn(cmd, { shell: true })

  child.stdout.on('data', (data) => {
    event.sender.send('ffmpeg-output', data.toString())
  })

  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`) 
    event.sender.send('ffmpeg-output', data.toString())
  })

  child.on('close', (code) => {
    console.log(`finish`)
    event.sender.send('ffmpeg-output', 'finish')
  })
}
}