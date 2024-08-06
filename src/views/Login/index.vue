<template>
  <div class="bg-login">
    <div class="bg-login-card flex">
      <div class="w-[55%] h-full  rounded-l-[16px] card-bg"></div>
      <div class="w-[45%] h-full relative rounded-r-[16px] card-login-bg">
        <div class="text-center w-full mt-14 text-xl font-bold">后台管理系统</div>
        <div class="login-form">
          <el-form label-position="top" label-width="120px" :model="loginUserForm">
            <el-form-item label="账号：">
              <el-input v-model="loginSettingStore.account"/>
            </el-form-item>
            <el-form-item label="密码：">
              <el-input @input="savePassword" show-password v-model="Password "/>
            </el-form-item>

            <div class="mt-[-5px]">
              <el-checkbox @click="isSave" v-model="loginSettingStore.pswChecked" label="记住密码" size="large"/>
            </div>
            <el-form-item>
              <el-button class="w-full mt-2" type="primary" size="large" @click="onSubmit" v-loading="loading">登录</el-button>
            </el-form-item>
          </el-form>

          <slideVerifyPop></slideVerifyPop>


        </div>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted, onBeforeMount, onBeforeUpdate, onUpdated} from 'vue';
import type {loginForm, userTokenAndPermission} from '@/types/login.ts'
import slideVerifyPop from "@/components/slideVerify/slideVerifyPop.vue";
import {loginSetting} from "@/store/settings/loginSetting.ts";

import {login} from "@/api/user.ts";
import {useRoute, useRouter} from "vue-router";
import {userInfo} from "@/store/user/userInfo.ts";
import {useLoading} from "@/hooks/useLoading.ts";


const loginSettingStore = loginSetting()
const userInfoStore = userInfo()


const routes = useRouter()
const router = useRoute()


/**
 * hooks
 */
const {loading, isShow} = useLoading()

const Password = ref("")

if (loginSettingStore.pswChecked) {
  Password.value = loginSettingStore.Password
}


const loginUserForm = ref<loginForm>()


const onSubmit = async () => {
  loginUserForm.value = {
    accountNumber: loginSettingStore.account,
    password: Password.value
  }
  // 用户第一次失败后再调用弹窗验证，0为调用次数为0，每次调用+1，成功登陆清空
  // 当前登录重试次数大于0次，且当前登陆校验成功为false则开启校验
  if (loginSettingStore.submitNum > 0 && !loginSettingStore.slideSuccess) {
    loginSettingStore.slideFlagChange()
    return
  }
  isShow()
  const res = await login<userTokenAndPermission>(loginUserForm.value)
  // 登录后重置登录次数，重置滑动成功状态，
  userInfoStore.tokenChange(res.data.token)
  loginSettingStore.changeSlideSyncFlag()
  loginSettingStore.submitNumReset()
  const toPath = router.query.redirect as string || "/index"
  await routes.push({path: toPath})


}
/**
 * 记住密码后持续输入回调
 */
const savePassword = () => {
  if (loginSettingStore.pswChecked) {
    loginSettingStore.Password = Password.value

  }

}
/**
 * 是否保存，初始值false，勾的情况下是false，未勾的情况下是true，我也不知道框架是怎么去弄得所以只能取反使用
 */

const isSave = () => {
  console.log(loginSettingStore.pswChecked)
  if (!loginSettingStore.pswChecked) {
    loginSettingStore.Password = Password.value

  } else {
    loginSettingStore.Password = ""
  }

}

// 生命周期钩子
onBeforeMount(() => {
  console.log('组件挂载前');
  // 在组件挂载前执行的代码
});

onMounted(() => {
  console.log('组件已挂载');
  // 在组件挂载后执行的代码
});

onBeforeUpdate(() => {
  console.log('组件更新前');
  // 在组件更新前执行的代码
});

onUpdated(() => {
  console.log('组件已更新');
  // 在组件更新后执行的代码
});

onUnmounted(() => {
  console.log('组件将卸载');
  // 在组件卸载前执行的代码
});


</script>


<style scoped lang="scss">
.bg-login {
  background: url("@/assets/images/login/login-background(1).jpg") no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100vw;


}

.silde-pop {
  width: fit-content;
  height: fit-content;
  padding: 15px;
  background: #ffffff;
}


.bg-login-card {
  width: 1000px;
  height: 550px;
  background: white;
  position: relative;
  top: 50%;
  left: 50%;
  border-radius: 16px;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 30px 1px rgba(0, 0, 0, .1);

  .login-form {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 15px;
  }

  .card-bg {
    background: url("@/assets/images/login/3605.jpg_wh1200(1).jpg") no-repeat;
    background-size: cover;
  }

  .card-login-bg {
    background: #ffffff;
  }


}

</style>
