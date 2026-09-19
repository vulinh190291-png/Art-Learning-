<template>
  <admin-layout>
    <div style="margin-bottom: 20px;">
      <el-input v-model="keyword" placeholder="搜索用户名/昵称" style="width: 300px; margin-right: 10px;"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="fetchData">搜索</el-button>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="user_id" label="ID" width="80"></el-table-column>
      <el-table-column label="头像" width="80">
        <template slot-scope="scope">
          <el-avatar :src="scope.row.avatar_url"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column prop="bio" label="简介" show-overflow-tooltip></el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 1 ? 'danger' : 'success'">
             {{ scope.row.status === 1 ? '小黑屋' : '正常' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" v-if="scope.row.status === 0" @click="toggleBan(scope.row)">关小黑屋</el-button>
          <el-button size="mini" type="success" v-else @click="toggleBan(scope.row)">释放</el-button>
        </template>
      </el-table-column>
    </el-table>
  </admin-layout>
</template>

<script>
import AdminLayout from '@/components/AdminLayout.vue';
import request from '@/common/request.js';

export default {
  components: { AdminLayout },
  data() {
    return {
      keyword: '',
      tableData: [] // 这里存放后端返回的 userList
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      // 模拟调用后端： request({ url: '/user/list', data: { keyword: this.keyword } })
      this.tableData = [
        { user_id: 1, username: 'zhangsan', nickname: '张三', bio: '我爱画画', status: 0, avatar_url: '' },
        { user_id: 2, username: 'lisi', nickname: '捣乱者', bio: '我是来发广告的', status: 1, avatar_url: '' }
      ];
    },
    toggleBan(row) {
      const action = row.status === 0 ? '封禁' : '解封';
      this.$confirm(`确认要${action}用户 ${row.nickname} 吗？`, '提示', { type: 'warning' })
        .then(async () => {
           // await request({ url: '/user/status', method: 'POST', data: { id: row.user_id, status: row.status === 0 ? 1 : 0 } });
           row.status = row.status === 0 ? 1 : 0; // 乐观更新
           this.$message.success('操作成功');
        });
    }
  }
}
</script>