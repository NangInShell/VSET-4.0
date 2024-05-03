<script setup lang="ts">
import { ref} from 'vue'
import {storeToRefs} from 'pinia'

import useInputconfigStore from '@renderer/store/InputStore'
  const InputConfigStore = useInputconfigStore()
  const {
    fileList
  } = storeToRefs(InputConfigStore)

  

  import useSrsettingconfigStore from '@renderer/store/SrSettingsStore'
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

  import useFilterconfigStore from '@renderer/store/FilterStore'
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

import useOutputconfigStore from '@renderer/store/OutputStote'
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


const StartSR=()=> {
  const command = ref('ffmpeg -y -i "D:/file/videos/三笠艾伦对白.mp4" "D:/file/videos/test2.mp4"')
  window.electron.ipcRenderer.send('execute-command', command)
  // window.api.compress('ffmpeg -y -i "D:/file/videos/三笠艾伦对白.mp4" "D:/file/videos/test.mp4"')
}

const inputData = ref('')

const GenerateJson = () => {
  const fileListNames = fileList.value.map(file => (file.path).replace(/\\/g, '/'));
  console.log(fileListNames)
  console.log(useSR.value)
    const jsonData = { 
      fileList: fileListNames,

      useSR:useSR.value,
      SRMethodValue:SRMethodValue.value,
      RealcuganTileValue:RealcuganTileValue.value,
      RealcuganInferenceValue:RealcuganInferenceValue.value,
      RealcuganModelValue:RealcuganModelValue.value,
      RealcuganAlphaValue:RealcuganAlphaValue.value,
      RealesrganInferenceValue:RealesrganInferenceValue.value,
      RealesrganModelValue:RealesrganModelValue.value,
      RealesrganTileValue:RealesrganTileValue.value,
      RealesrganScaleValue:RealesrganScaleValue.value,
      Waifu2xInferenceValue:Waifu2xInferenceValue.value,
      Waifu2xModelValue:Waifu2xModelValue.value,
      Waifu2xTileValue:Waifu2xTileValue.value,

      UseResize_BeforeEnhance:UseResize_BeforeEnhance.value,
      UseResize_AfterEnhance:UseResize_AfterEnhance.value,
      ResizeWidth_BeforeEnhance:ResizeWidth_BeforeEnhance.value,
      ResizeHeight_BeforeEnhance:ResizeHeight_BeforeEnhance.value,
      ResizeWidth_AfterEnhance:ResizeWidth_AfterEnhance.value,
      ResizeHeight_AfterEnhance:ResizeHeight_AfterEnhance.value,
      ReduceLeft_BeforeEnhance:ReduceLeft_BeforeEnhance.value,
      ReduceRight_BeforeEnhance:ReduceRight_BeforeEnhance.value,
      ReduceOn_BeforeEnhance:ReduceOn_BeforeEnhance.value,
      ReduceDown_BeforeEnhance:ReduceDown_BeforeEnhance.value,
      ReduceLeft_AfterEnhance:ReduceLeft_AfterEnhance.value,
      ReduceRight_AfterEnhance:ReduceRight_AfterEnhance.value,
      ReduceOn_AfterEnhance:ReduceOn_AfterEnhance.value,
      ReduceDown_AfterEnhance:ReduceDown_AfterEnhance.value,

      bitValue:bitValue.value,
      crfValue:crfValue.value,
      encoderValue:encoderValue.value,
      qualityValue:qualityValue.value,
      videoContainer:videoContainer.value,
      AudioContainer:AudioContainer.value,
      isUseCrf:isUseCrf.value,
      isSaveAudio:isSaveAudio.value,
      outputfolder:outputfolder.value,

 }; 
  window.electron.ipcRenderer.send('generate-json', jsonData);
  };


</script>

<template>
<div class="flex-container">
    <div class="mb-4">
      <el-button type="success" @click="StartSR">启动</el-button>
      </div>

      <div class="mb-4">
      <el-button type="success" @click="GenerateJson">测试</el-button>
      </div>

<el-input
    v-model="inputData"
    :rows="10"
    type="textarea"
    placeholder="Please input"
  />

</div>
</template>

<style scoped>
.flex-container {
    display: flex;
    flex-direction: column; /* 设置为垂直排列 */
    gap: 15px; /* 可选项，用于设置组件之间的间隔 */
  }

</style>../store/SrSettingsStore.js