import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import Antd from 'ant-design-vue';
import router from './router'; // 引入 Antd 的样式
import * as Icons from '@ant-design/icons-vue';


const app = createApp(App);
// 全局注册 Ant Design Vue 图标
for (const icon in Icons) {
  app.component(icon, Icons[icon]);
}

app.use(Antd); // 使用 Antd
app.use(router); // 使用路由
app.use(createPinia()); // 使用pinia
app.mount('#app');
