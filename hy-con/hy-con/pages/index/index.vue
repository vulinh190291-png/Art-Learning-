<template>
  <admin-layout>
    <h2>📊 数据概览</h2>
    
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in stats" :key="index">
        <el-card shadow="hover">
          <div style="color: #909399;">{{ item.title }}</div>
          <div style="font-size: 24px; font-weight: bold; margin-top: 10px;">{{ item.value }}</div>
        </el-card>
      </el-col>
    </el-row>

    <el-divider></el-divider>
    <div style="text-align: center; color: #999; padding: 50px;">
      此处可集成 ECharts 图表展示销售趋势
    </div>
  </admin-layout>
</template>

<script>
import AdminLayout from '@/components/AdminLayout.vue';
import request from '@/common/request.js';

export default {
  components: { AdminLayout },
  data() {
    return {
      stats: [
        { title: '总用户数', value: '0' },
        { title: '今日订单', value: '0' },
        { title: '总交易额', value: '¥0.00' },
        { title: '作品库存预警', value: '0' }
      ]
    }
  },
  onShow() {
    this.getStats();
  },
  methods: {
    async getStats() {
      // 模拟数据
      this.stats = [
        { title: '总用户数', value: '1,203' },
        { title: '今日订单', value: '45' },
        { title: '总交易额', value: '¥12,450.00' },
        { title: '作品库存预警', value: '3' }
      ];
    }
  }
}
</script>