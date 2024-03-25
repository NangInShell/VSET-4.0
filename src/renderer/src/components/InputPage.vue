<script setup lang="ts">

import { ref } from 'vue'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import { ipcRenderer } from 'electron'
import { Delete } from '@element-plus/icons-vue'


const fileList = ref<UploadUserFile[]>([])

const clearFileList = () => {
  fileList.value = []
}

</script>

<template>

<div class="flex-container">
    <div class="mb-4">
      <el-button :icon="Delete" type="success" @click="clearFileList">清空输入</el-button>

  </div>

    <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      drag
      multiple
      :auto-upload="false"
    >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>

      <div class="el-upload__text">
       拖入文件 或<em>点击选择文件</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          mp4, mkv, mov, m2ts, ts 等文件后缀
        </div>
      </template>
    </el-upload>
  </div>
</template>

<style scoped>


.flex-container {
    display: flex;
    flex-direction: column; /* 设置为垂直排列 */
    gap: 15px; /* 可选项，用于设置组件之间的间隔 */
  }

</style>