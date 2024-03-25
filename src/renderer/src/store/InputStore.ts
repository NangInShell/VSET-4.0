import { ref } from 'vue'
import { defineStore } from 'pinia'
import { UploadFileInfo } from 'naive-ui'

export const useInputStore = defineStore(
    'InputPath',
    () => {
      const outputpath = ref<string>('')
  
      const inputFileList = ref<UploadFileInfo[]>([])
  
      return {
        outputpath,
        inputFileList
      }
    },
  )