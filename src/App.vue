<template>
  <a-layout style="min-height: 100vh">
    <!-- 侧边栏 -->
    <SidebarMenu />
    <!-- 右侧布局 -->
    <a-layout>
      <!-- 顶部导航栏 -->
      <a-layout-header style="background: #fff; padding: 0 20px">
        <div style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          ">
          <div>
            <menu-unfold-outlined v-if="collapsed" class="trigger" @click="collapsed = !collapsed" />
            <menu-fold-outlined v-else class="trigger" @click="collapsed = !collapsed" />
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
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <router-view />
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
  import SidebarMenu from '@/components/SidebarMenu.vue';
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