<template>
  <p>{{ message }}</p>
  <a-button type="primary" @click="handleClick">增加</a-button>
</template>

<script setup>
  import { ref } from 'vue';
  import { useMainStore } from '@/store'

  const store = useMainStore();
  const message = ref(`计数器: ${store.counter}`);

  const handleClick = () => {
    store.increment();
    message.value = `计数器: ${store.counter}`;
  };

</script>

<style scoped>

</style>