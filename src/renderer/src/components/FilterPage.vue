<script setup lang="ts">


  import useFilterconfigStore from '@renderer/store/FilterStore'
  import {storeToRefs} from 'pinia'
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

   

</script>

<template>
<div class="flex-container">
<el-text class="mx-1" size="large">预处理（AI渲染前工作）</el-text>

<div class="slider-demo-block">
    <span class="demonstration">视频长宽缩放(前)</span>
    <el-switch
    v-model="UseResize_BeforeEnhance"
    class="ml-2"
    inline-prompt
    size="large"
    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
    active-text="启用缩放"
    inactive-text="关闭缩放"
  />

    <div>
      长度：
    <el-input-number v-model="ResizeWidth_BeforeEnhance" :min="1" :max="7680" />
      宽度：
    <el-input-number v-model="ResizeHeight_BeforeEnhance" :min="1" :max="4320" />
    </div>
  </div>

  <div class="slider-demo-block">
    <span class="demonstration">视频黑边(左右)</span>
    <div>
      左侧：
    <el-input-number v-model="ReduceLeft_BeforeEnhance" :min="-1000" :max="1000" />
      右侧：
    <el-input-number v-model="ReduceRight_BeforeEnhance" :min="-1000" :max="1000" />
    </div>
  </div>

  <div class="slider-demo-block">
    <span class="demonstration">视频黑边(上下)</span>
    <div>
      上边：
    <el-input-number v-model="ReduceOn_BeforeEnhance" :min="-1000" :max="1000" />
      下边：
    <el-input-number v-model="ReduceDown_BeforeEnhance" :min="-1000" :max="1000"  />
    </div>
  </div>

<el-text class="mx-1" size="large">后处理（AI渲染后工作）</el-text>
  
<div class="slider-demo-block">
    <span class="demonstration">视频长宽缩放(末)</span>
    <el-switch
    v-model="UseResize_AfterEnhance"
    class="ml-2"
    inline-prompt
    size="large"
    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
    active-text="启用缩放"
    inactive-text="关闭缩放"
  />
 
    <div>
      长度：
    <el-input-number v-model="ResizeWidth_AfterEnhance" :min="1" :max="7680" />
      宽度：
    <el-input-number v-model="ResizeHeight_AfterEnhance" :min="1" :max="4320" />
    </div>
  </div>

  <div class="slider-demo-block">
    <span class="demonstration">视频黑边(左右)</span>
    <div>
      左侧：
    <el-input-number v-model="ReduceLeft_AfterEnhance" :min="-1000" :max="1000"  />
      右侧：
    <el-input-number v-model="ReduceRight_AfterEnhance" :min="-1000" :max="1000" />
    </div>
  </div>

  <div class="slider-demo-block">
    <span class="demonstration">视频黑边(上下)</span>
    <div>
      上边：
    <el-input-number v-model="ReduceOn_AfterEnhance" :min="-1000" :max="1000"  />
      下边：
    <el-input-number v-model="ReduceDown_AfterEnhance" :min="-1000" :max="1000"  />
    </div>
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

/* 修改这里 */
.flex-container .flex-container {
  flex-wrap: wrap; /* 开启换行 */
}
</style>