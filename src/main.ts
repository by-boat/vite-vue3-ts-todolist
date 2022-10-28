import { createApp } from 'vue'
import App from './App.vue'
import { ElButton, ElDialog, ElTableColumn, ElTag, ElForm, ElFormItem, ElInput } from 'element-plus'; // 按需引入
// import 'element-plus/dist/index.css'
import { createPinia } from 'pinia';
// 创建 Pinia 实例
const pinia = createPinia();

createApp(App)
    .use(ElButton)
    .use(ElDialog)
    .use(ElTableColumn)
    .use(ElTag)
    .use(ElForm)
    .use(ElFormItem)
    .use(ElInput)
    .use(pinia)
    .mount('#app');
