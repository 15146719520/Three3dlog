import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { createApp } from 'vue'
import pinia from "./stores";

import 'virtual:svg-icons-register'

import App from './App.vue'
import router from './router'

import gloaComponent from '@/components' //自定义全局组件



const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(gloaComponent)


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
