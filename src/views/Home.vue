<template>
  <a-layout-content style="margin: 24px 16px 0">
    <div :style="{ background: '#fff', minHeight: '360px' }">
      <h1>数据可视化仪表盘</h1>

      <!-- 折线图 -->
      <a-row :gutter="16" style="margin-bottom: 24px">
        <a-col :span="8">
          <div class="chart-container">
            <v-chart class="chart" :option="lineChartOption1" autoresize />
          </div>
        </a-col>
        <a-col :span="8">
          <div class="chart-container">
            <v-chart class="chart" :option="lineChartOption2" autoresize />
          </div>
        </a-col>
        <a-col :span="8">
          <div class="chart-container">
            <v-chart class="chart" :option="lineChartOption3" autoresize />
          </div>
        </a-col>
      </a-row>

      <!-- 饼图 -->
      <a-row :gutter="16">
        <a-col :span="12">
          <div class="chart-container">
            <v-chart class="chart" :option="pieChartOption1" autoresize />
          </div>
        </a-col>
        <a-col :span="12">
          <div class="chart-container">
            <v-chart class="chart" :option="pieChartOption2" autoresize />
          </div>
        </a-col>
      </a-row>
    </div>
  </a-layout-content>
</template>

<script setup>
import { ref } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';

// 注册 ECharts 组件
use([
  CanvasRenderer,
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

// 折线图 1 配置
const lineChartOption1 = ref({
  title: {
    text: '折线图 1',
  },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'line',
    },
  ],
});

// 折线图 2 配置
const lineChartOption2 = ref({
  title: {
    text: '折线图 2',
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [80, 120, 90, 150, 200, 170, 130],
      type: 'line',
    },
  ],
});

// 折线图 3 配置
const lineChartOption3 = ref({
  title: {
    text: '折线图 3',
  },
  xAxis: {
    type: 'category',
    data: ['2021', '2022', '2023', '2024', '2025'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [1000, 1500, 2000, 1800, 2500],
      type: 'line',
    },
  ],
});

// 饼图 1 配置
const pieChartOption1 = ref({
  title: {
    text: '饼图 1',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    bottom: '10%',
    left: 'center',
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: '直接访问' },
        { value: 735, name: '邮件营销' },
        { value: 580, name: '联盟广告' },
        { value: 484, name: '视频广告' },
        { value: 300, name: '搜索引擎' },
      ],
    },
  ],
});

// 饼图 2 配置
const pieChartOption2 = ref({
  title: {
    text: '饼图 2',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    bottom: '10%',
    left: 'center',
  },
  series: [
    {
      name: '销售占比',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 40, name: '产品 A' },
        { value: 30, name: '产品 B' },
        { value: 20, name: '产品 C' },
        { value: 10, name: '产品 D' },
      ],
    },
  ],
});
</script>

<style scoped>
.chart-container {
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 400px; /* 固定高度 */
}

.chart {
  width: 100%;
  height: 100%;
}

h1 {
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: bold;
}

h3 {
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: bold;
}
</style>