<template>
  <a-layout style="min-height: 100vh">
    <!-- 侧边栏 -->
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo">
        <img
          src="@/assets/vue.svg"
          alt="Logo"
          style="width: 32px; height: 32px"
        />
        <h1 v-if="!collapsed" style="color: white; margin-left: 10px">
          B 端项目
        </h1>
      </div>
      <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1">
          <template #icon>
            <home-outlined />
          </template>
          <span>首页</span>
        </a-menu-item>
        <a-menu-item key="2">
          <template #icon>
            <user-outlined />
          </template>
          <span>用户管理</span>
        </a-menu-item>
        <a-menu-item key="3">
          <template #icon>
            <setting-outlined />
          </template>
          <span>系统设置</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <!-- 右侧布局 -->
    <a-layout>
      <!-- 顶部导航栏 -->
      <a-layout-header style="background: #fff; padding: 0 20px">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <div>
            <menu-unfold-outlined
              v-if="collapsed"
              class="trigger"
              @click="collapsed = !collapsed"
            />
            <menu-fold-outlined
              v-else
              class="trigger"
              @click="collapsed = !collapsed"
            />
          </div>
          <div>
            <a-dropdown>
              <a-avatar style="background-color: #87d068">
                <template #icon><user-outlined /></template>
              </a-avatar>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1">个人中心</a-menu-item>
                  <a-menu-item key="2">退出登录</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </a-layout-header>

      <!-- 内容区域 -->
      <a-layout-content style="margin: 24px 16px 0">
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          <h1>欢迎来到 B 端项目</h1>
          <p>这里是首页内容区域。</p>
          <p>{{ message }}</p>
          <a-button type="primary" @click="handleClick">增加</a-button>
        </div>
      </a-layout-content>

      <!-- 页脚 -->
      <a-layout-footer style="text-align: center">
        B 端项目 ©2023 Created by Your Company
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue';
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
import { useMainStore } from '@/store'

const collapsed = ref(false);
const selectedKeys = ref(['1']);
const store = useMainStore();
const message = ref(`计数器: ${store.counter}`);

const handleClick = () => {
  store.increment();
  message.value = `计数器: ${store.counter}`;
};

</script>

<style scoped>
.logo {
  height: 32px;
  margin: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.trigger {
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}
</style>
