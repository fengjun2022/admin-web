import {defineStore} from "pinia";
import {StoreName} from "@/constant/StoreName.ts";
import {ref} from "vue";
import {DefaultConfig} from "@/class/DefaultConfig.ts";
import {ThemeConfigProps} from "@/types/store.ts";

export const layoutRouterSetting = defineStore(StoreName.layoutRouter,()=>{
    /**
     * 页面sideBar是否收起或是展开
     */
    const collapse = ref(false);

    /**
     * 页面路由刷新
     */
    const refresh = ref(false);


    const themeConfig = ref<ThemeConfigProps>({
        primary: DefaultConfig.DefaultBackground,
        isDark: false
    })



    /**
     * 改变当前sideBar状态
     */
   const  changeCollapse = ()=> {
       collapse.value = !collapse.value
    }

    /**
     * 刷新当前路由方法
     */
    const  setRefresh = () =>{
        refresh.value = !refresh.value
    }

    const  setThemeConfig = (newConfig: ThemeConfigProps) => {
        themeConfig.value = newConfig
    }


return {
    collapse,
    refresh,
    themeConfig,
    changeCollapse,
    setRefresh,
    setThemeConfig

    }


})
