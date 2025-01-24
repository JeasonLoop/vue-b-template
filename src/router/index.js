import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import User from '../views/User.vue';
import Settings from '../views/Settings.vue';

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      title: '首页',
      icon: 'HomeOutlined', // Ant Design Vue 图标名称
    },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '关于我们',
      icon: 'InfoCircleOutlined',
    },
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: {
      title: '用户管理',
      icon: 'UserOutlined',
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      title: '系统设置',
      icon: 'SettingOutlined',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
