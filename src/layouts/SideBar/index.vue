<template>

  <div class="layout-sidebar-container" :class="{ 'is-collapse': collapse }">
    <Logo/>

    <el-scrollbar>
      <el-menu
          background-color="#001529"
          text-color="hsla(0,0%,100%,.65)"
          active-text-color="#fff"
          :defaultActive="activeMenu"
          :collapse="collapse"
          :unique-opened="true"
      >
        <SubMenu :menuList="menuList"></SubMenu>
      </el-menu>
    </el-scrollbar>

  </div>


</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {onMounted, onUnmounted, onBeforeMount, onBeforeUpdate, onUpdated, computed} from 'vue';
import Logo from '../Logo/index.vue'
import {useAuthStore} from "@/store/Auth/Auth.ts";
import {layoutRouterSetting} from "@/store/settings/layoutRouterSetting.ts";
import {useRoute} from "vue-router";
import constantRoutes from "@/router/constantRoutes.ts"
import SubMenu from "./components/SubMenu/SubMenu.vue"


const settingsStore = layoutRouterSetting()
const authStore = useAuthStore();
const useRoutes = useRoute();
// eslint-disable-next-line no-undef
authStore.setAuthMenuList(constantRoutes as Menu.MenuOptions[]);

// authStore.setAuthMenuList()
// 获取当前sidebar状态
const collapse = computed(() => settingsStore.collapse)

// 获取当前路由已经处理完成的sideBar列表
const menuList = computed(() => authStore.authMenuList)
console.log(menuList)

const activeMenu = computed(() => useRoutes.meta["activeMenu"] ? (useRoutes.meta["activeMenu"] as string) : useRoutes.path
)
console.log(activeMenu)


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

@mixin active {
  &:hover {
    color: $base-color-white;
  }

  &.is-active {
    color: $base-color-white;
    background-color: var(--el-color-primary) !important;
  }
}

.layout-sidebar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: $base-z-index;
  width: $base-left-menu-width;
  height: 100vh;
  background: $base-menu-background;
  box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
  transition: width $base-transition-time;

  &.is-collapse {
    width: $base-left-menu-width-min;
    border-right: 0;
  }

  :deep(.el-scrollbar__wrap) {
    overflow-x: hidden;

    .el-menu {
      border: 0;
    }

    .el-menu-item,
    .el-submenu__title {
      height: $base-menu-item-height;
      overflow: hidden;
      line-height: $base-menu-item-height;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
    }

    .el-menu-item {
      @include active;
    }
  }
}


</style>
