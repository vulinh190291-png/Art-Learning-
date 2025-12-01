<template>
  <div class="dashboard-container">
    <el-row :gutter="40" class="panel-group">
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>用户总量</template>
          <div class="card-num">1,203</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>商品数量</template>
          <div class="card-num">560</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>今日订单</template>
          <div class="card-num">42</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>待审帖子</template>
          <div class="card-num" style="color: red">15</div>
        </el-card>
      </el-col>
    </el-row>
    <el-card style="margin-top: 20px;">
      <h3>系统公告</h3>
      <p>欢迎使用 HyAll 管理系统，这里模仿了 Litemall 的设计风格。</p>
    </el-card>
  </div>
</template>

<style scoped>
.card-num { font-size: 24px; font-weight: bold; }
</style>