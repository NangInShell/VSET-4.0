import { ref } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('inputconfig',()=>{
  const fileList = ref([]);

  return {
    fileList,
  }
})