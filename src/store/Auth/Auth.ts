import {defineStore} from "pinia";
import {StoreName} from "@/constant/StoreName.ts";
import { ref} from "vue";

export const useAuthStore = defineStore(StoreName.useAuthStore,()=>{




    // 处理之后侧边栏菜单列表
    const authMenuList = ref<Menu.MenuOptions[]>([]);

    const setAuthMenuList =  (list:Menu.MenuOptions[])=>{
        authMenuList.value = list
    }


    return {authMenuList,setAuthMenuList}

})
