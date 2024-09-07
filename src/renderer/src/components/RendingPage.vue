<template>
  <div class="flex-container">
    <div class="mb-4">
      <el-button type="success" @click="StartSR">启动</el-button>
    </div>

    <div class="mb-4">
      <el-button type="success" @click="StartSR">测试</el-button>
    </div>

    <n-space vertical>
      <n-log
        ref="logInstRef"
        :log="inputData"
        language="naive-log"
        trim
      />
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { storeToRefs } from 'pinia'

// 引入状态管理
import useInputconfigStore from '@renderer/store/InputStore'
import useSrsettingconfigStore from '@renderer/store/SrSettingsStore'
import useFilterconfigStore from '@renderer/store/FilterStore'
import useOutputconfigStore from '@renderer/store/OutputStote'

// 初始化状态管理
const InputConfigStore = useInputconfigStore()
const { fileList } = storeToRefs(InputConfigStore)

const SrSettingStore = useSrsettingconfigStore()
const {
  useSR,
  SRMethodValue,
  RealcuganTileValue,
  RealcuganInferenceValue,
  RealcuganModelValue,
  RealcuganAlphaValue,
  RealesrganInferenceValue,
  RealesrganModelValue,
  RealesrganTileValue,
  RealesrganScaleValue,
  Waifu2xInferenceValue,
  Waifu2xModelValue,
  Waifu2xTileValue
} = storeToRefs(SrSettingStore)

const FilterConfigStore = useFilterconfigStore()
const {
  UseResize_BeforeEnhance,
  UseResize_AfterEnhance,
  ResizeWidth_BeforeEnhance,
  ResizeHeight_BeforeEnhance,
  ResizeWidth_AfterEnhance,
  ResizeHeight_AfterEnhance,
  ReduceLeft_BeforeEnhance,
  ReduceRight_BeforeEnhance,
  ReduceOn_BeforeEnhance,
  ReduceDown_BeforeEnhance,
  ReduceLeft_AfterEnhance,
  ReduceRight_AfterEnhance,
  ReduceOn_AfterEnhance,
  ReduceDown_AfterEnhance
} = storeToRefs(FilterConfigStore)

const OutputConfigStore = useOutputconfigStore()
const {
  bitValue,
  crfValue,
  encoderValue,
  qualityValue,
  videoContainer,
  AudioContainer,
  isUseCrf,
  isSaveAudio,
  outputfolder,
} = storeToRefs(OutputConfigStore)

// 定义日志内容
const inputData = ref('')
const logInstRef = ref<any>(null)

const StartSR = () => {
  const fileListNames = fileList.value.map(file => (file.path).replace(/\\/g, '/'))

  const jsonData = {
    fileList: fileListNames,
    useSR: useSR.value,
    SRMethodValue: SRMethodValue.value,
    RealcuganTileValue: RealcuganTileValue.value,
    RealcuganInferenceValue: RealcuganInferenceValue.value,
    RealcuganModelValue: RealcuganModelValue.value,
    RealcuganAlphaValue: RealcuganAlphaValue.value,
    RealesrganInferenceValue: RealesrganInferenceValue.value,
    RealesrganModelValue: RealesrganModelValue.value,
    RealesrganTileValue: RealesrganTileValue.value,
    RealesrganScaleValue: RealesrganScaleValue.value,
    Waifu2xInferenceValue: Waifu2xInferenceValue.value,
    Waifu2xModelValue: Waifu2xModelValue.value,
    Waifu2xTileValue: Waifu2xTileValue.value,
    UseResize_BeforeEnhance: UseResize_BeforeEnhance.value,
    UseResize_AfterEnhance: UseResize_AfterEnhance.value,
    ResizeWidth_BeforeEnhance: ResizeWidth_BeforeEnhance.value,
    ResizeHeight_BeforeEnhance: ResizeHeight_BeforeEnhance.value,
    ResizeWidth_AfterEnhance: ResizeWidth_AfterEnhance.value,
    ResizeHeight_AfterEnhance: ResizeHeight_AfterEnhance.value,
    ReduceLeft_BeforeEnhance: ReduceLeft_BeforeEnhance.value,
    ReduceRight_BeforeEnhance: ReduceRight_BeforeEnhance.value,
    ReduceOn_BeforeEnhance: ReduceOn_BeforeEnhance.value,
    ReduceDown_BeforeEnhance: ReduceDown_BeforeEnhance.value,
    ReduceLeft_AfterEnhance: ReduceLeft_AfterEnhance.value,
    ReduceRight_AfterEnhance: ReduceRight_AfterEnhance.value,
    ReduceOn_AfterEnhance: ReduceOn_AfterEnhance.value,
    ReduceDown_AfterEnhance: ReduceDown_AfterEnhance.value,
    bitValue: bitValue.value,
    crfValue: crfValue.value,
    encoderValue: encoderValue.value,
    qualityValue: qualityValue.value,
    videoContainer: videoContainer.value,
    AudioContainer: AudioContainer.value,
    isUseCrf: isUseCrf.value,
    isSaveAudio: isSaveAudio.value,
    outputfolder: outputfolder.value,
  }

  // 保存输入输出和基本设置
  window.electron.ipcRenderer.send('generate-json', jsonData)

  const command = ref('ffmpeg -y -i "D:/code/VSET_Vue/video/test2.mp4" "D:/code/VSET_Vue/video/1080_upscale.mp4"')

  // 开始执行
  window.electron.ipcRenderer.send('execute-command', command, jsonData)

  window.electron.ipcRenderer.on('ffmpeg-output', (event, msg) => {
    inputData.value += msg
  })
}

// 使用 watch 监听 inputData 的变化
watch(() => inputData.value, () => {
  nextTick(() => {
    logInstRef.value?.scrollTo({ position: 'bottom', silent: true })
  })
})
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: column; /* 设置为垂直排列 */
  gap: 15px; /* 可选项，用于设置组件之间的间隔 */
}
</style>
