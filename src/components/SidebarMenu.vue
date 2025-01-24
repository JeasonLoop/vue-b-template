<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible>
    <div class="logo">
      <img src="@/assets/vue.svg" alt="Logo" style="width: 32px; height: 32px" />
      <h1 v-if="!collapsed" style="color: white; margin-left: 10px">
        B 端项目
      </h1>
    </div>
    <a-menu theme="dark" mode="inline" :selectedKeys="selectedKeys" @click="handleMenuClick">
      <template v-for="route in menuRoutes" :key="route.path">
        <a-menu-item v-if="!route.children" :key="route.path">
          <template #icon>
            <component :is="route.meta.icon" />
          </template>
          <span>{{ route.meta.title }}</span>
        </a-menu-item>
        <a-sub-menu v-else :key="route.path">
          <template #icon>
            <component :is="route.meta.icon" />
          </template>
          <template #title>{{ route.meta.title }}</template>
          <a-menu-item v-for="child in route.children" :key="child.path" @click="handleMenuClick({ key: child.path })">
            <span>{{ child.meta.title }}</span>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </a-layout-sider>

</template>

<script setup>
  import { ref, computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router';

  const router = useRouter();
  const route = useRoute();
  const collapsed = ref(false);

  // 获取路由配置
  const menuRoutes = computed(() => {
    return router.options.routes.filter((r) => r.meta && r.meta.title);
  });

  // 当前选中的菜单项
  const selectedKeys = computed(() => {
    return [route.path];
  });

  // 处理菜单点击事件
  const handleMenuClick = ({ key }) => {
    router.push(key);
  };
</script>

<style scoped>
  /* 自定义样式 */
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