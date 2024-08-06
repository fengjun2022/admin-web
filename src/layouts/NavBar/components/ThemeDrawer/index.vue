<template>
  <el-drawer title="主题设置" v-model="drawerVisible" size="300px">
    <el-divider class="divider" content-position="center">全局主题</el-divider>
    <div class="theme-item">
      <span>暗黑模式</span>
      <SwitchDark />
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import mittBus from '@/utils/mitt.ts'
import SwitchDark from "./components/SwitchDark.vue";

const drawerVisible = ref(false)
mittBus.on('openThemeDrawer', () => {
  drawerVisible.value = true

})
</script>

<style scoped lang="scss">
.theme-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 14px 0;
}
</style>
