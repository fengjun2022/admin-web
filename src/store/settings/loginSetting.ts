import {defineStore} from "pinia";
import {StoreName} from "@/constant/StoreName.ts";
import {ref} from "vue";


export const loginSetting = defineStore(StoreName.loginStore, () => {
    /**
     * @slideFlag 控制滑动模块显示
     */
    const slideFlag = ref(false)


    /**
     * @slideSuccess 用户滑动是否成功
     * @function slideSyncFlag
     */
    const slideSuccess = ref(false)

    const slideFlagChange = () => {
        // 如果当前开启任务则不能重复开启time锁以及被持有
        slideFlag.value = !slideFlag.value
    }


    const changeSlideSyncFlag = () => {
        return slideSuccess.value = !slideSuccess.value
    }


    /**
     * @SubmitNum 计数当前重试登录次数，登陆失败后则开启滑动校验
     */
    const submitNum = ref(0)
    const submitNumChange = () => {
        submitNum.value++
    }
    const submitNumReset = () => {
        submitNum.value = 0
    }


    /**
     * @account 账号
     * @password 密码
     */
    const account = ref('')
    const Password = ref("")


    /**
     * 用户是否记住密码
     */
    const pswChecked = ref(false)


    return {
        slideFlag,
        submitNum,
        account,
        Password,
        pswChecked,
        slideSuccess,
        slideFlagChange,
        submitNumChange,
        submitNumReset,
        changeSlideSyncFlag


    }


}, {persist: true,})
