<template>
  <div class="nav-bar-container">
    <el-row :gutter="15">
      <el-col :sm="12" :md="12" :lg="12" :xl="12">
        <div class="left-panel">
          <el-icon class="fold-unfold" @click="handleCollapse">
            <component :is="collapse ? 'Expand' : 'Fold'"></component>
          </el-icon>
          <Breadcrumb />
        </div>
      </el-col>
      <el-col :sm="12" :md="12" :lg="12" :xl="12">
        <div class="right-panel">
          <Refresh />
          <ScreenFull />
          <Settings />
          <User />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { onMounted, onUnmounted, onBeforeMount, onBeforeUpdate, onUpdated, computed} from 'vue';
import {layoutRouterSetting} from "@/store/settings/layoutRouterSetting.ts";
import Breadcrumb from "./components/Breadcrumb/index.vue"
import Refresh from "./components/Refresh/index.vue"
import ScreenFull from './components/ScreeFull/index.vue'
import Settings from './components/Settings/index.vue'
import User from "./components/User/index.vue"
const settingsStore = layoutRouterSetting()
const collapse = computed(()=>settingsStore.collapse)
const  handleCollapse = ()=> {
  settingsStore.changeCollapse()
}

// 创建响应式数据

// 生命周期钩子
onBeforeMount(() => {

  // 在组件挂载前执行的代码
});

onMounted(() => {

  // 在组件挂载后执行的代码
});

onBeforeUpdate(() => {

  // 在组件更新前执行的代码
});

onUpdated(() => {

  // 在组件更新后执行的代码
});

onUnmounted(() => {

  // 在组件卸载前执行的代码
});


</script>


<style scoped lang="scss">
@import "@/styles/variable.scss";
.nav-bar-container {
  position: relative;
  height: $base-nav-bar-height;
  padding-right: $base-padding;
  padding-left: $base-padding;
  overflow: hidden;
  user-select: none;
  background: $base-color-white;
  box-shadow: $base-box-shadow;

  .left-panel {
    display: flex;
    align-items: center;
    justify-items: center;
    height: 60px;

    .fold-unfold {
      font-size: 18px;
      color: $base-color-gray;
      cursor: pointer;
    }
  }

  .right-panel {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    height: $base-nav-bar-height;
  }
}
</style>
