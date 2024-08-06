<template>
  <section class="app-mian-height">
    <router-view v-slot="{ Component, route }" v-if="isShow">
      <transition appear name="fade-transform" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </section>
</template>

<script setup lang="ts">
import {  nextTick, ref, watch } from 'vue'
import {layoutRouterSetting} from "@/store/settings/layoutRouterSetting.ts";




    const settingsStore = layoutRouterSetting()
    const isShow = ref(true)
    watch(
      () => settingsStore.refresh,
      () => {
        isShow.value = false
        nextTick(() => {
          isShow.value = true
        })
      },
    )


</script>

<style scoped lang="scss">
@import "@/styles/variable";
.app-mian-height {
  min-height: $base-app-main-height;

  // padding: 20px;
  background-color: inherit;
}
</style>
