import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import Antd from 'ant-design-vue';
import router from './router'; // 引入 Antd 的样式

const app = createApp(App);
app.use(Antd); // 使用 Antd
app.use(router); // 使用路由
app.use(createPinia()); // 使用pinia
app.mount('#app');
