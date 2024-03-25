<template>
  <div>
    <!-- 区域 -->
    <div
      class="file-drop-area"
      @dragover.prevent
      @drop.prevent="handleDrop"
      @click="openFilePicker"
    >
      将文件拖到此处或点击选择文件
    </div>

    <!-- 文件路径列表 -->
    <div v-if="filePaths.length > 0" class="file-path-list">
      <div v-for="(path, index) in filePaths" :key="index" class="file-path-item">
        {{ path }}
        <span @click="removeFilePath(index)" class="remove-btn">x</span>
      </div>
    </div>

    <!-- 文件选择器 -->
    <input
      ref="fileInput"
      type="file"
      style="display: none;"
      multiple
      @change="handleFileInputChange"
    />
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'FileUpload',
  setup() {
    const filePaths = ref([]);

    // 打开文件选择器
    const openFilePicker = () => {
      const fileInput = document.getElementById('fileInput');
      if (fileInput) {
        fileInput.click();
      }
    };

    // 处理文件拖放事件
    const handleDrop = (event) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          filePaths.value.push(files[i].path);
        }
      }
    };

    // 处理文件选择器变化
    const handleFileInputChange = (event) => {
      const files = event.target.files;
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          filePaths.value.push(files[i].path);
        }
      }
    };

    // 删除文件路径
    const removeFilePath = (index) => {
      filePaths.value.splice(index, 1);
    };

    return {
      filePaths,
      openFilePicker,
      handleDrop,
      handleFileInputChange,
      removeFilePath,
    };
  },
};
</script>

<style>
.file-drop-area {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}

.file-path-list {
  margin-top: 10px;
}

.file-path-item {
  margin-bottom: 5px;
}

.remove-btn {
  cursor: pointer;
  color: red;
  margin-left: 5px;
}
</style>
