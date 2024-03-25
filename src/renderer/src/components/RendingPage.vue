<script setup lang="ts">
   
</script>

<template>
<div class="flex-container">
    <div class="mb-4">
      <el-button type="success" @click="clearFileList">启动</el-button>
      </div>
<el-input
    v-model="textarea"
   
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

</style>