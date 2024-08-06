<template>
  <div class="logo-container flex-center">
    <a href="/">
      <img class="logo" alt="logo" src="/vite.svg"/>
      <div class="title" v-if="true">后台管理</div>
    </a>
  </div>

</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {onMounted, onUnmounted, onBeforeMount, onBeforeUpdate, onUpdated} from 'vue';

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

.logo-container {
  position: relative;
  display: flex;
  justify-content: center;

  // padding-left: 24px;
  height: 60px;
  overflow: hidden;
  line-height: 60px;
  background: transparent;

  .title {
    display: inline-block;
    margin-left: 12px;
    font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    vertical-align: middle;
  }

  .logo {
    display: inline-block;
    width: 32px;

    height: 32px;
    vertical-align: middle;
  }
}
</style>
