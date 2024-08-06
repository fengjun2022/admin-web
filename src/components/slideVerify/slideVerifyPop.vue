<template>
  <div v-if="loginSettingStore.slideFlag" class="box hw-center">
    <div class="silde_box">
      <div class="flex justify-between w-full">
        <div class="text-[14px] mb-3">请完成拼图认证</div>
        <div @click="closeBox" class="cursor-pointer">
          <el-icon>
            <Close/>
          </el-icon>
        </div>
      </div>
      <slide-verify
          class="silde_box"
          ref="block"
          :slider-text="'向右滑动'"
          :accuracy="1"
          @again="onAgain"
          @success="onSuccess"
          @fail="onFail"
          @refresh="onRefresh"
          :imgs="IMAGES"
      ></slide-verify>


      <!--    <button class="btn" @click="handleClick">在父组件可以点我刷新哦</button>-->
      <div v-if="susccessTextFlag" class="text-[14px]">{{ pretext }} <span class="text-[14px] text-blue-500"> {{ msg }}</span></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

/**
 * @slide-verify 组件属性
 * accuracy  Number  滑动验证的误差范围，默认值 5
 * imgs  Array  picture array 背景图数组，默认值 []
 * show  Boolean  是否显示刷新按钮，默认值 true
 * interval  Number  节流函数的时间间隔，默认值 50
 *
 * @callBack
 *
 * success  Function  success callback  返回时间参数，单位为毫秒
 * fail  Function  fail callback
 * refresh  Function  点击刷新按钮后的回调函数
 * again  Function  检测到非人为操作滑动时触发的回调函数
 *
 */


// 局部注册组件，需要单独引用组件样式
// 只提供局部引用的方式，不再采用插件形式，方便按需加载，减少主包大小
import SlideVerify, {SlideVerifyInstance} from "vue3-slide-verify";
import "vue3-slide-verify/dist/style.css";
import {loginSetting} from "@/store/settings/loginSetting.ts";


/**
 * src/components/slideVerify/images/img.png
 * 使用本地定义图片
 */
const imgSrc = "src/components/slideVerify/images/"
const IMAGES = [imgSrc + "img.png", imgSrc + "img1.png", imgSrc + "img2.png", imgSrc + "img3.png", imgSrc + "img4png",
  imgSrc + "img5.png", imgSrc + "img6.png", imgSrc + "img7.png", imgSrc + "img8.png", imgSrc + "img9.png",
  imgSrc + "img10.png",]


const loginSettingStore = loginSetting()


const msg = ref("");
const pretext = ref("")
const block = ref<SlideVerifyInstance>();

const onAgain = () => {
  msg.value = "检测到非人为操作的哦！ try again";
  // 刷新
  block.value?.refresh();
};


const susccessTextFlag = ref(false)
const onSuccess = (times: number) => {
  pretext.value = "验证成功耗时"
  msg.value = `${(times / 1000).toFixed(1)}s`;
  susccessTextFlag.value = true
  setTimeout(() => {
    loginSettingStore.slideFlagChange()
    loginSettingStore.changeSlideSyncFlag()
    susccessTextFlag.value = false
  }, 800)

};

const onFail = () => {
  susccessTextFlag.value = true
  pretext.value = "验证不通过";
};

const onRefresh = () => {

};

const closeBox = () => {
  loginSettingStore.slideFlagChange()
}


</script>
<style scoped lang="scss">
.silde_box {
  margin: 0 auto;
}

.box {
  width: fit-content;
  height: fit-content;
  border: 1px solid #e8f4ff;
  padding: 15px;
  box-sizing: border-box;
  background: white;
  z-index: 999;
}
</style>
