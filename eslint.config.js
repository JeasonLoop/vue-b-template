import vuePlugin from 'eslint-plugin-vue';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  {
    // 全局配置
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser, // 浏览器环境全局变量
        ...globals.node, // Node.js 环境全局变量
        process: 'readonly', // 声明 process 为全局变量
      },
    },
    plugins: {
      vue: vuePlugin, // Vue 插件
      prettier: prettierPlugin, // Prettier 插件
    },
    rules: {
      // 自定义规则
      'prettier/prettier': 'error', // 启用 Prettier 规则
      'vue/multi-word-component-names': 'off', // 允许单文件组件名
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 生产环境禁用 console
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 生产环境禁用 debugger
    },
  },
  {
    // Vue 文件配置
    files: ['src/**/*.vue'], // 匹配所有 .vue 文件
    languageOptions: {
      parser: vuePlugin.parser, // 使用 Vue 解析器
    },
    rules: {
      ...vuePlugin.configs['vue3-recommended'].rules, // Vue 3 推荐规则
    },
  },
  {
    // JavaScript 文件配置
    files: ['src/**/*.js'], // 匹配所有 .js 文件
    rules: {
      ...prettierPlugin.configs.recommended.rules, // Prettier 推荐规则
    },
  },
];