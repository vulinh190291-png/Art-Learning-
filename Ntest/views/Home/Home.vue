<template>
  <div>
    <el-row :gutter="20">
      <!-- 数据卡片 -->
      <el-col :span="8">
        <el-card shadow="hover">
          <div slot="header">用户总数</div>
          <div style="font-size: 30px; font-weight: bold; color: #409EFF;">1,204</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <div slot="header">今日访问</div>
          <div style="font-size: 30px; font-weight: bold; color: #67C23A;">352</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <div slot="header">待办事项</div>
          <div style="font-size: 30px; font-weight: bold; color: #E6A23C;">12</div>
        </el-card>
      </el-col>
    </el-row>

    <el-card style="margin-top: 20px; height: 400px;">
      <div slot="header">
        <span>快捷操作</span>
      </div>
      <el-button type="primary" icon="el-icon-plus">发布课程</el-button>
      <el-button type="success" icon="el-icon-user">添加用户</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>