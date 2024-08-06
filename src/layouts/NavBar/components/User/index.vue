<template>
  <el-dropdown @visible-change="onChange" @command="handleCommand">
    <div class="avatar-dropdown">
      <img class="user-avatar" :src="profile" alt=""/>
      <div class="user-name">{{ name }}</div>
      <el-icon class="up-down">
        <component :is="visible ? ArrowUp : ArrowDown"/>
      </el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="logout">
          <svg-icon name="logout" size="16px"/>
          <span>退出登陆</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import {ref} from 'vue'

import {userInfo} from '@/store/user/userInfo.ts'
import {ArrowUp, ArrowDown} from '@element-plus/icons-vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import {useRouter} from "vue-router";
// import { LOGIN_URL } from '@/config/config'

// const router = useRouter()
// const route = useRoute()
const userStore = userInfo()


const name = ref(userStore.name)
const profile = ref(userStore.profile)
const visible = ref(false)

const onChange = (show: boolean) => {
  visible.value = show
}

const handleCommand = (command: string) => {
  if (command === 'logout') {
    logout()
  }
}
const rouers = useRouter()
const logout = async () => {
  await ElMessageBox.confirm('您确定要退出吗？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
  userStore.clearToken()
  await rouers.push("/Login")
  ElMessage.success('退出登录成功！')
}
</script>
<style scoped lang="scss">
.avatar-dropdown {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  height: 50px;
  padding: 0;

  .user-avatar {
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-name {
    position: relative;
    margin: 0 6px;
    cursor: pointer;
  }
}
</style>
