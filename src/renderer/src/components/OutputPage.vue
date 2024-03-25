<script setup lang="ts">
    import { ref,computed  } from 'vue'
    const value1 = ref(20)
    const value2 = ref(16)

    const encoderValue = ref('')
    const qualityValue= ref('')
    const videoContainer=ref('MP4')
    const AudioContainer=ref('AAC')


    const isUseCrf=ref(true)
    const isSaveAudio=ref(false)
    const encoder_options = [
  {
    value: 'libx265',
    label: 'CPU_H265',
  },
  {
    value: 'libx264',
    label: 'CPU_H264',
  },
  {
    value: 'libaom-av1',
    label: 'CPU_Av1',
  },
  {
    value: 'hevc_nvenc',
    label: 'NVENC_H265',
  },
  {
    value: 'h264_nvenc',
    label: 'NVENC_H264',
  },
  {
    value: 'av1_nvenc',
    label: 'NVENC_Av1',
  },
]

const CpuH265_options = [
  {
    value: 'veryslow',
    label: 'veryslow',
  },
  {
    value: 'slower',
    label: 'slower',
  },
  {
    value: 'slow',
    label: 'slow',
  },
  {
    value: 'medium',
    label: 'medium',
  },
  {
    value: 'fast',
    label: 'fast',
  },
  {
    value: 'faster',
    label: 'faster',
  },
  {
    value: 'veryfast',
    label: 'veryfast',
  },
]

const CpuH264_options = CpuH265_options
const CpuAv1_options = CpuH265_options

const NvencH265_options = [
  {
    value: 'slow',
    label: 'slow',
  },
  {
    value: 'medium',
    label: 'medium',
  },
  {
    value: 'fast',
    label: 'fast',
  },
  {
    value: 'hp',
    label: 'hp',
  },
  {
    value: 'hq',
    label: 'hq',
  },
  {
    value: 'bd',
    label: 'bd',
  },
  {
    value: 'll',
    label: 'll',
  },
  {
    value: 'llhq',
    label: 'llhq',
  },
  {
    value: 'llhp',
    label: 'llhp',
  },
  {
    value: 'p1',
    label: 'p1',
  },
  {
    value: 'p2',
    label: 'p2',
  },
  {
    value: 'p3',
    label: 'p3',
  },
  {
    value: 'p4',
    label: 'p4',
  },
  {
    value: 'p5',
    label: 'p5',
  },
  {
    value: 'p6',
    label: 'p6',
  },
  {
    value: 'p7',
    label: 'p7',
  },

]

const NvencH264_options=[
{
    value: 'slow',
    label: 'slow',
  },
  {
    value: 'medium',
    label: 'medium',
  },
  {
    value: 'fast',
    label: 'fast',
  },
  {
    value: 'hp',
    label: 'hp',
  },
  {
    value: 'hq',
    label: 'hq',
  },
  {
    value: 'bd',
    label: 'bd',
  },
  {
    value: 'll',
    label: 'll',
  },
  {
    value: 'llhq',
    label: 'llhq',
  },
  {
    value: 'llhp',
    label: 'llhp',
  }
]

const NvencAv1_options=[
{
    value: 'slow',
    label: 'slow',
  },
  {
    value: 'medium',
    label: 'medium',
  },
  {
    value: 'fast',
    label: 'fast',
  },
  {
    value: 'hp',
    label: 'hp',
  },
  {
    value: 'hq',
    label: 'hq',
  },
]

const qualityPresets = computed(() => {
    switch (encoderValue.value) {
      case 'libx265':
        return CpuH265_options;
      case 'libx264':
        return CpuH264_options;
      case 'libaom-av1':
        return CpuAv1_options;
      case 'hevc_nvenc':
        return NvencH265_options;
      case 'h264_nvenc':
        return NvencH264_options;
      case 'av1_nvenc':
        return NvencAv1_options;
    }
  });

 

  const VideoContainer_options = [
  {
    value: 'mp4',
    label: 'MP4',
  },
  {
    value: 'mkv',
    label: 'MKV',
  },
  {
    value: 'mov',
    label: 'MOV',
  }
]

const AudioContainer_options = [
  {
    value: 'aac',
    label: 'AAC',
  },
  {
    value: 'flac',
    label: 'FLAC',
  },
]

const changeSelect = (value: string) => {
  qualityValue.value = 'slow'; 
  encoderValue.value = value; 
};

</script>

<template>
<div class="flex-container">
  <div class="slider-demo-block">
    <span class="demonstration">编码器/格式</span>
    <el-select
      v-model="encoderValue"
      placeholder="Select"
      @change="changeSelect"
      size="large"
      style="width: 240px"
    >
      <el-option
        v-for="item in encoder_options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>


  <div class="slider-demo-block">
    <span class="demonstration">质量预设</span>
    <el-select 
     v-model="qualityValue"
     placeholder="Select Quality Preset"
     size="large"
     style="width: 240px;">
      <el-option v-for="item in qualityPresets" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>

  <div class="slider-demo-block">
    <span class="demonstration">质量控制参数</span>
    <el-radio-group v-model="isUseCrf" >
    <el-radio-button :value="false">码率</el-radio-button>
    <el-radio-button :value="true">CRF</el-radio-button>
  </el-radio-group>
  </div>

<div class="slider-demo-block" v-if="!isUseCrf">
    <span class="demonstration">码率(M)</span>
    <el-slider v-model="value1" :min="1" :max="100" show-input style="max-width: 500px;"/>
  </div>
  <div class="slider-demo-block" v-if="isUseCrf">
    <span class="demonstration">CRF</span>
    <el-slider v-model="value2" :min="1" :max="50" show-input style="max-width: 500px;"/>
  </div>

  <div class="slider-demo-block">
    <span class="demonstration">视频容器</span>
    <el-select
      v-model="videoContainer"
      placeholder="Select"
      size="large"
      style="width: 240px"
    >
      <el-option
        v-for="item in VideoContainer_options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>

  <div class="slider-demo-block">
    <span class="demonstration">音频处理</span>
    <el-radio-group v-model="isSaveAudio" >
    <el-radio-button :value="true">保留</el-radio-button>
    <el-radio-button :value="false">二压</el-radio-button>
  </el-radio-group>
  </div>

  <div class="slider-demo-block" v-if="!isSaveAudio">
    <span class="demonstration">音频格式</span>
   
    <el-select
      v-model="AudioContainer"
      placeholder="Select"
      size="large"
      style="width: 240px"
    >
      <el-option
        v-for="item in AudioContainer_options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>

</div>
</template>

<style scoped>
.slider-demo-block {
  width: 100%;
  display: flex;
  align-items: center;
  flex-basis: calc(100% - 20px);
}

.slider-demo-block .demonstration {
  font-size: 18px;
  color: var(--el-text-color-secondary);
  line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 70%;
}

.flex-container {
    display: flex;
    flex-direction: column; /* 设置为垂直排列 */
    gap: 15px; /* 可选项，用于设置组件之间的间隔 */
  }

</style>