<template>
  <div>
    <el-card>
      <div style="margin-bottom: 10px; display:flex; justify-content:space-between;">
        <el-input v-model="keyword" placeholder="搜索用户名" style="width:200px"></el-input>
        <el-button type="primary" @click="showAdd">新增用户</el-button>
      </div>

      <el-table :data="filteredUsers" border>
        <el-table-column prop="id" label="ID" width="80"/>
        <el-table-column prop="name" label="姓名"/>
        <el-table-column prop="role" label="角色"/>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button type="text" @click="editUser(scope.row)">编辑</el-button>
            <el-button type="text" style="color:red" @click="deleteUser(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑/新增弹窗 -->
    <el-dialog :visible.sync="dialogVisible" :title="isEdit ? '编辑用户' : '新增用户'">
      <el-form :model="editForm">
        <el-form-item label="姓名">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>

        <el-form-item label="角色">
          <el-select v-model="editForm.role">
            <el-option label="管理员" value="admin"/>
            <el-option label="普通用户" value="user"/>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="saveUser">保存</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
      dialogVisible: false,
      isEdit: false,
      editForm: {
        id: null,
        name: "",
        role: ""
      },

      // 假数据（未来可用Axios接后端）
      users: [
        { id: 1, name: "张三", role: "admin" },
        { id: 2, name: "李四", role: "user" }
      ]
    }
  },
  computed: {
    filteredUsers() {
      return this.keyword
        ? this.users.filter(u => u.name.includes(this.keyword))
        : this.users
    }
  },
  methods: {
    showAdd() {
      this.isEdit = false
      this.editForm = { id: null, name: "", role: "" }
      this.dialogVisible = true
    },
    editUser(row) {
      this.isEdit = true
      this.editForm = { ...row }
      this.dialogVisible = true
    },
    saveUser() {
      if (this.isEdit) {
        // 编辑
        let idx = this.users.findIndex(u => u.id === this.editForm.id)
        this.users.splice(idx, 1, { ...this.editForm })
      } else {
        // 新增
        let newId = this.users.length + 1
        this.users.push({ id: newId, ...this.editForm })
      }
      this.dialogVisible = false
    },
    deleteUser(id) {
      this.users = this.users.filter(u => u.id !== id)
    }
  }
}
</script>
