<template>
  <div class="tabs-bar-container">
    <div class="tabs-content">
      <el-tabs
          type="card"
          v-model="activeTabsValue"
          @tab-click="tabClick"
          @tab-remove="removeTab"
      >
        <el-tab-pane
            v-for="item in visitedViews "
            type="card"
            :key="item.path"
            :path="item.path"
            :label="item.title"
            :name="item.path"
            :closable="!(item.meta && item.meta['affix'])"
        >
          <template #label>
            <el-icon
                size="16"
                class="tabs-icon"

                v-if="item.meta && item.meta['icon']"
            >
              <component :is="item.meta['icon']"></component>
            </el-icon>
            {{ item.title }}
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="tabs-action">
      <el-dropdown trigger="hover">
        <el-icon color="rgba(0, 0, 0, 0.65)" :size="20">
          <Menu/>
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="closeCurrentTab">
              <el-icon :size="14">
                <FolderRemove/>
              </el-icon>
              关闭当前
            </el-dropdown-item>
            <el-dropdown-item @click="closeOtherTab">
              <el-icon :size="14">
                <Close/>
              </el-icon>
              关闭其他
            </el-dropdown-item>
            <el-dropdown-item @click="closeAllTab">
              <el-icon :size="14">
                <FolderDelete/>
              </el-icon>
              关闭所有
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {ref, onMounted, onUnmounted, onBeforeMount, onBeforeUpdate, onUpdated, computed, watch} from 'vue';
import {tabsBar} from "@/store/tabsbar/tabsbar.ts";
import type {TabPaneName, TabsPaneContext} from "element-plus";
import {routersType, tagsType} from "@/layouts/TabsBar/types/types.ts";
import {RouteRecordRaw, useRoute, useRouter} from "vue-router";
import {useAuthStore} from "@/store/Auth/Auth.ts";
import path from "path-browserify";


/**
 * 导入配置部分
 */

const tabsBarStore = tabsBar()
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()


/**
 * 计算属性获取与修改当前全局选择路由
 */

const activeTabsValue = computed({
  get: () => {
    return tabsBarStore.activeTabsValue
  },
  set: (val) => {
    tabsBarStore.setTabsMenuValue(val)
  },
})

const visitedViews = computed<routersType[]>(
    () => tabsBarStore.visitedViews as routersType[]
);


// 饿了么点击时间，参数看饿了么ui 文档
const tabClick = (tabItem: TabsPaneContext) => {
  let path = tabItem.props.name as string
  router.push(path)
}


/**
 *判断传参是否等于当前路由路径
 * @function isActive
 * @param path 传入路径
 * @return 等于返回true否则false
 */
const isActive = (path: string): boolean => {
  return path === route.path
}
const removeTab = async (activeTabPath: TabPaneName) => {
  if (isActive(activeTabPath as string)) {
    toLastView(activeTabPath as string)
  }
  await tabsBarStore.delView(activeTabPath)
}

// 删除以后切换到下一个
function toLastView(activeTabPath: string) {
  let index = visitedViews.value.findIndex(
      (item) => item.path === activeTabPath,
  )
  const nextTab = visitedViews.value[index + 1] || visitedViews.value[index - 1];
  if (!nextTab) return
  router.push(nextTab.path)
  tabsBarStore.addVisitedView(nextTab)
}

/**
 * 关闭当前标签
 */
const closeCurrentTab = () => {
  tabsBarStore.toLastView(route.path)
  tabsBarStore.delView(route.path)
}

/**
 * 关闭其他标签
 */
const closeOtherTab = () => {
  tabsBarStore.delOtherViews(route.path)
}

/**
 * 关闭所有标签
 */
const closeAllTab = async () => {
  tabsBarStore.delAllViews()
  tabsBarStore.goHome()
}

/**
 * 当前的路由表
 */

const routes = computed(() => authStore.authMenuList)

/**
 * 当前初始化添加的路由文件
 */

let affixTags = ref<RouteRecordRaw[]>([])


/**
 * @description: 拿到需要固定的路由表，添加进 store
 * @author: codeBo
 */
const initTags = () => {
  let routesNew = routes.value as RouteRecordRaw[]

  let affixTag = (affixTags.value = filterAffixTags(routesNew) as unknown as RouteRecordRaw[])
  for (const tag of affixTag) {
    if (tag.name) {
      tabsBarStore.addVisitedView(tag)
    }
  }
}

const addTags = () => {
  const {name} = route
  if (name === 'Login') {
    return
  }
  if (name) {
    tabsBarStore.addView(route as unknown as RouteRecordRaw)
  }
  return false
}


const filterAffixTags = (routes: RouteRecordRaw[], basePath = '/') => {
  let tags: tagsType[] = []
  routes.forEach((route) => {
    if (route.meta && route.meta['affix']) {
      // 获取 path
      const tagPath = path.resolve(basePath, route.path) as string

      tags.push(<tagsType>{
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: {...route.meta},
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  console.log(tags)
  return tags
}

watch(route, () => {
  addTags()
})

// 生命周期钩子
onBeforeMount(() => {

  // 在组件挂载前执行的代码
});

onMounted(() => {

  initTags()
  addTags()

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
@import "@/styles/Tabsbar";

:deep(.el-icon) {
  font-size: 1rem !important;
}
</style>
