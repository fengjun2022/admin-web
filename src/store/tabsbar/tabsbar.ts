import {defineStore} from "pinia";
import {StoreName} from "@/constant/StoreName.ts";
import {ref} from "vue";
import type {RouteRecordRaw} from "vue-router";
import {router} from "@/router";


export const tabsBar = defineStore(StoreName.tabsBar,()=>{

    /**
     * @activeTabsValue 当前的选择的路由
     */
    const activeTabsValue = ref("/index");


    /**
     * @visitedViews 选中过的路由表
     */
    const visitedViews = ref<RouteRecordRaw[]>([])


    /**
     * @cachedViews 使用keepAlive缓存的路由表
     */
    const cachedViews = ref<RouteRecordRaw[]>([])

    /**
     * 修改全局路径
     * @param val
     */
    const setTabsMenuValue = (val:string)=>{
        activeTabsValue.value = val
    }


    /**
     * 删除当前路径标签，该方法删除 visitedViews路由数组与缓存路由数组
     * @param activeTabPath 传入的删除路径
     */
    const delView = (activeTabPath)=>{
        return new Promise((resolve) => {
          delVisitedView(activeTabPath)
           delCachedView(activeTabPath)
            resolve({
                visitedViews: [...visitedViews.value],
                cachedViews: [...cachedViews.value],
            })
        })
    }

    /**
     * 删除特定路径的访问视图。
     * @param {string} path - 要删除的视图的路径。
     * @returns {Promise<Array>} - 返回一个包含更新后的访问视图数组的Promise对象。
     */
    const delVisitedView = (path) => {
        return new Promise((resolve) => {
            visitedViews.value = visitedViews.value.filter((v) => {
                if (!v.meta) return true;  // 如果没有meta信息，则保留该视图
                return v.path !== path || v.meta.affix; // 删除指定路径的视图，除非它被标记为affix
            });
            resolve([...visitedViews.value]);
        });
    }




    /**
     * 删除特定视图的缓存。
     * @param {RouteRecordRaw} view - 要删除缓存的视图对象。
     * @returns {Promise<Array>} - 返回一个包含更新后的缓存视图数组的Promise对象。
     */
    const delCachedView = (view) => {
        return new Promise((resolve) => {
            // @ts-ignore
            const index = cachedViews.value.indexOf(view.name); // 找到视图在缓存中的索引
            if (index > -1) cachedViews.value.splice(index, 1); // 如果找到，则删除
            resolve([...cachedViews.value]);
        });
    }

    /**
     * 添加一个新视图到访问过的视图列表。
     * 如果该视图的路径已存在于列表中，或者视图没有元数据，则不执行任何操作。
     * @param {RouteRecordRaw} view - 要添加的视图对象。
     */
    const addVisitedView = (view: RouteRecordRaw) => {
        // 设置当前选中的菜单项，函数 `setTabsMenuValue` 可能是更新选项卡菜单状态的方法。
        setTabsMenuValue(view.path);

        // 如果视图已存在于访问过的视图列表中，或视图没有元数据，则直接返回不添加。
        if (visitedViews.value.some((v) => v.path === view.path) || !view.meta) return;

        // 将新视图添加到访问过的视图列表中。
        // 使用 `Object.assign` 来创建视图的一个副本，并添加或覆盖标题属性。
        visitedViews.value.push(
            Object.assign({}, view, {
                title: view.meta.title || 'no-name', // 如果视图没有标题，则使用 'no-name' 作为默认值。
            }),
        );

        // 如果视图设置了 `keepAlive` 并且有名称，则将视图的名称添加到缓存视图列表中。
        if (view.meta.keepAlive && view.name) {
            // @ts-ignore
            cachedViews.value.push(view.name);
        }
    }

// toLastView 函数：用于在关闭当前标签页时跳转到最近访问的另一个标签页
  const  toLastView = (activeTabPath: string) => {
        // 在已访问视图的数组中找到当前激活标签的索引
        const index = visitedViews.value.findIndex(
            (item) => item.path === activeTabPath,
        )

        // 获取当前标签的下一个标签或上一个标签作为下一个跳转目标
        const nextTab = visitedViews.value[index + 1] || visitedViews.value[index - 1]

        // 如果没有下一个标签，则函数返回，不执行任何操作
        if (!nextTab) return

        // 使用 Vue Router 跳转到下一个标签的路径
        router.push(nextTab.path)

        // 将下一个标签添加到已访问视图中
        addVisitedView(nextTab)
    }

// delOtherViews 函数：用于删除除了当前激活的标签页和固定的标签页之外的所有标签页
   const  delOtherViews = (path: string) => {
        // 过滤 visitedViews 数组，只保留当前激活的标签页和固定的标签页
        // 判断条件是：标签页的路径等于当前路径，或者标签页的 meta 对象存在且其 affix 属性为 true
        visitedViews.value = visitedViews.value.filter((item) => {
            return item.path === path || (item.meta && item.meta.affix)
        })

        // 过滤 cachedViews 数组，逻辑同上
        // 这是为了确保 Vue 组件缓存也只保留当前激活和固定的标签页
        cachedViews.value = visitedViews.value.filter((item) => {
            return item.path === path || (item.meta && item.meta.affix)
        })
    }


    /**
     * 删除所有只保留 affix标记的路由
     */

    const delAllViews = () => {
       visitedViews.value = visitedViews.value.filter(
            (v) => v.meta && v.meta.affix,
        )
      cachedViews.value = visitedViews.value.filter((v) => v.meta && v.meta.affix)
    }

    const goHome = ()=> {
        activeTabsValue.value = '/index'
        router.push({ path: '/index' })
    }

    const addView = (view: RouteRecordRaw) => {
       addVisitedView(view)
    }


    return {
        activeTabsValue,
        visitedViews,
        cachedViews,
        setTabsMenuValue,
        delView,
        addVisitedView,
        toLastView,
        delOtherViews,
        delAllViews,
        goHome,
        addView
  }


})
