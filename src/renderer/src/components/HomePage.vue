<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ipcRenderer } from 'electron'

const CPUInfo = ref<Array<string>>([])
const GPUInfo = ref<Array<string>>([])
const GPUMainInfo = ref('')

const getCPUInfo = async () => {
  const info = await window.api.getCpuInfo()
  // const info = await ipcRenderer.invoke('getSystemInfo') // 通过IPC从主进程获取信息
  CPUInfo.value = info
}

const getGPUInfo = async () => {
  const info = await window.api.getGpuInfo()
  // const info = await ipcRenderer.invoke('getSystemInfo') // 通过IPC从主进程获取信息
  GPUInfo.value = info
  GPUMainInfo.value=GPUInfo.value[0]
  console.log(GPUInfo.value)
}

onMounted(() => {
  getCPUInfo()
  getGPUInfo()
})
</script>

<template>
<div class="flex-container">
    <n-result status="404" title="主页面怎么画我还不知道" description="VSET" size="huge">
    </n-result>
<div class="slider-demo-block">
    <span class="demonstration">CPU</span>
    <el-tag type="primary" size = 'large'>{{ CPUInfo }}</el-tag>
  </div>

<div class="slider-demo-block">
    <span class="demonstration">GPU</span>
    <el-select v-model="GPUMainInfo" placeholder="GPU列表" style="max-width: 300px">
    <el-option
    v-for="(item, index) in GPUInfo"
    :key="index"
    :label="`${index}: ${item}`"
    :value="item"
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