import { defineStore } from 'pinia';

// 全局状态存储
export const useMainStore = defineStore('global', {
  state: () => ({
    counter: 0,
  }),
  actions: {
    increment() {
      this.counter++;
    },
  },
});
