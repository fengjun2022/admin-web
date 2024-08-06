import {createApp} from 'vue'
import App from './App.vue'
import store from "@/store/index"
import "@/styles/base.css"
import "@/styles/Tailwind.css"
import {router} from "@/router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
import '@/styles/common.scss'
import '@/mockjs/index.ts'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "./permission.ts"; // permission control


/** 导入全部Element-icon */



const app = createApp(App)


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(store)
    .use(router)
    .use(ElementPlus)
    .mount('#app')
