<template>
  <a-layout-content style="margin: 24px 16px 0">
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      <!-- 个人信息 -->
      <a-row :gutter="16">
        <a-col :span="8">
          <a-avatar :size="128" :src="avatarUrl" :style="{borderColor:'#d8d8d8'}" />
        </a-col>
        <a-col :span="16">
          <h1>关于我</h1>
          <a-flex gap="10" align="center">
            <mail-outlined />
            <strong>邮箱：</strong>{{ email }}
          </a-flex>
          <a-flex gap="10" align="center">
            <github-outlined />
            <strong>GitHub：</strong>
            <a :href="githubUrl" target="_blank">{{ githubUrl }}</a>
          </a-flex>
          <a-flex gap="10" align="center">
            <phone-outlined />
            <strong>联系方式：</strong>{{ contact }}
          </a-flex>
        </a-col>
      </a-row>

      <!-- 随机简介 -->
      <a-row style="margin-top: 24px">
        <a-col>
          <h2>每日一句</h2>
          <div class="quote-container">
            <div class="typing-effect">{{ quote }}</div>
          </div>
        </a-col>
      </a-row>
    </div>
  </a-layout-content>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import avatar from '@/assets/avatar.jpg';

  // 个人信息
  const avatarUrl = ref(avatar); // 替换为你的头像 URL
  const email = ref('fsj77524@163.com'); // 替换为你的邮箱
  const githubUrl = ref('https://github.com/JeasonLoop'); // 替换为你的 GitHub 地址
  const contact = ref('+86 13675963811'); // 替换为你的联系方式

  // 随机简介
  const quote = ref('');

  // 获取随机诗歌
  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get('https://v1.jinrishici.com/all.json');
      quote.value = response.data.content;
    } catch (error) {
      console.error('Failed to fetch quote:', error);
      quote.value = '生活就像一盒巧克力，你永远不知道下一颗是什么味道。';
    }
  };

  // 页面加载时获取随机诗歌
  onMounted(() => {
    fetchRandomQuote();
  });
</script>

<style scoped>
  .quote-container {
    margin-top: 16px;
    padding: 16px;
    background: #f5f5f5;
    border-radius: 8px;
    font-size: 18px;
    font-style: italic;
  }

  .typing-effect {
    color: #1890ff;
    font-weight: bold;
    overflow: hidden;
    /* 隐藏溢出内容 */
    white-space: nowrap;
    /* 防止换行 */
    border-right: 2px solid #1890ff;
    /* 光标效果 */
    animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
  }

  @keyframes typing {
    from {
      width: 0;
    }

    to {
      width: 100%;
    }
  }

  @keyframes blink-caret {

    from,
    to {
      border-color: transparent;
    }

    50% {
      border-color: #1890ff;
    }
  }

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  h2 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  p {
    font-size: 16px;
    margin-bottom: 8px;
  }
</style>