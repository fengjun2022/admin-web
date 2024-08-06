<template>

  <template v-for="subItem in props.menuList" :key="subItem.path">
    <el-sub-menu
        v-if="subItem.children && subItem.children.length > 1"
        :index="subItem.path"
    >
      <template #title>
        <el-icon>
          <component :is="subItem.meta.icon"></component>
        </el-icon>
        <span>{{ subItem.meta.title }}</span>
      </template>
      <!-- 有children递归本次组件 -->
      <SubMenu :menuList="subItem.children" />
    </el-sub-menu>
    <el-menu-item
        v-else-if="subItem.children && subItem.children.length == 1"
        :index="subItem.children[0].path"
        @click="handleClickMenu(subItem.children[0])"
    >
      <el-icon>
        <component :is="subItem.children[0].meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ subItem.children[0].meta.title }}</span>
      </template>
    </el-menu-item>
    <el-menu-item
        v-else
        :index="subItem.path"
        @click="handleClickMenu(subItem)"
    >
      <el-icon>
        <component :is="subItem.meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ subItem.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>



</template>

<script setup lang="ts">
import {onMounted, onUnmounted, onBeforeMount, onBeforeUpdate, onUpdated} from 'vue';
import { useRouter } from 'vue-router'
import {Menu} from "@/typings/global";




// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  // eslint-disable-next-line no-undef
  menuList:Menu.MenuOptions[]

}>();




const router = useRouter()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const  handleClickMenu = (subItem)=> {
  // 跳转外部链接
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, '_blank')
  // 判断只有一级的话，直接跳转子级相关信息
  // const { children } = subItem
  // if (children?.length === 1) {
  //   router.push(children[0].path)
  //   return
  // }
  router.push(subItem.path)
}


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
</style>
