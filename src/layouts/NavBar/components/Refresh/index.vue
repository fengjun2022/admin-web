<!--
 * @Description:
 * @Autor: 李海波
 * @Date: 2023-03-03 13:41:05
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-17 11:40:25
-->
<template>
  <div class="btn">
    <el-tooltip content="刷新">
      <el-button circle @click="onRefresh">
        <el-icon><Refresh /></el-icon>
      </el-button>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">

import {layoutRouterSetting} from "@/store/settings/layoutRouterSetting.ts";



    const settingsStore = layoutRouterSetting()
    const onRefresh = () => {
      settingsStore.setRefresh()
    }

</script>

<style scoped lang="scss">
.btn {
  margin-right: 20px;
  cursor: pointer;
  transition: all 0.3s;
}
</style>
