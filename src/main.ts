import { createApp } from 'vue'
import './style.css'
// 由于App.vue没有默认导出，使用具名导入
import App  from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
