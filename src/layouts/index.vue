<template>
<div class="layout-admin-wrapper">

  <div class="layout-container-vertical fixed">
    <!-- SubMenu -->
    <LayoutSideBar />
    <div class="layout-main" :class="{ 'is-collapse': collapse }">
      <!-- Header -->
      <div
          class="layout-header fixed-header"
          :class="{ 'is-collapse': collapse }"
      >
        <LayoutNavBar />
        <LayoutTabsBar />
      </div>
      <div class="app-main-container">
        <!-- Main -->
        <LayoutMain />
        <!-- Footer -->
        <LayoutFooter />
      </div>
    </div>
  </div>

  <!-- 主题切换 -->
  <ThemeDrawer />

</div>


</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { onMounted, onUnmounted, onBeforeMount, onBeforeUpdate, onUpdated, computed} from 'vue';
import LayoutFooter from './Footer/index.vue'
import LayoutMain from './Main/index.vue'
import LayoutSideBar from './SideBar/index.vue'
import LayoutNavBar from './NavBar/index.vue'
import LayoutTabsBar from './TabsBar/index.vue'
import {layoutRouterSetting} from "@/store/settings/layoutRouterSetting.ts";
import ThemeDrawer from './NavBar/components/ThemeDrawer/index.vue'

const settingsStore = layoutRouterSetting()

const collapse = computed(() => settingsStore.collapse);














// 生命周期钩子
onBeforeMount(() => {
  console.log('组件挂载前');
  // 在组件挂载前执行的代码
});

onMounted(() => {
  console.log('组件已挂载');
  // 在组件挂载后执行的代码
});

onBeforeUpdate(() => {
  console.log('组件更新前');
  // 在组件更新前执行的代码
});

onUpdated(() => {
  console.log('组件已更新');
  // 在组件更新后执行的代码
});

onUnmounted(() => {
  console.log('组件将卸载');
  // 在组件卸载前执行的代码
});

// 侦听器
// watch(state, (newValue, oldValue) => {
//   console.log(`state 值从  变更为 `);
//   // 当 state 值变化时执行的代码
// });







</script>


<style scoped lang="scss">
@import "@/styles/variable.scss";
@mixin fix-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: $base-z-index - 2;
  width: calc(100% - $base-left-menu-width);
}

.layout-admin-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;

  .layout-container-vertical {
    &.fixed {
      padding-top: calc(#{$base-top-bar-height} + #{$base-tabs-bar-height});
    }

    .layout-main {
      min-height: 100%;
      margin-left: $base-left-menu-width;

      &.is-collapse {
        margin-left: $base-left-menu-width-min;
        border-right: 0;
      }

      .layout-header {
        box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

        &.fixed-header {
          @include fix-header;
        }

        &.is-collapse {
          width: calc(100% - $base-left-menu-width-min);
        }
      }

      .app-main-container {
        padding: 20px;
      }
    }
  }
}

</style>
