<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div style="margin-bottom: 10px">
        <el-input v-model="listQuery.userId" placeholder="请输入用户ID" style="width: 200px;" class="filter-item" />
        <el-button type="primary" icon="Search" @click="handleFilter">查找</el-button>
        <el-button icon="Refresh" @click="mockList">模拟加载列表</el-button>
      </div>
    </el-card>

    <el-card style="margin-top: 20px" shadow="never">
      <el-table :data="list" border stripe v-loading="listLoading">
        <el-table-column prop="userId" label="ID" width="80" />
        <el-table-column label="头像" width="100">
          <template #default="{ row }">
            <el-avatar :src="row.userAvatar" />
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="用户名" />
        <el-table-column prop="nickName" label="昵称" />
        <el-table-column prop="userBio" label="简介" show-overflow-tooltip />
        <el-table-column label="操作" width="200" align="center">
          <template #default="{ row }">
            <el-button type="danger" size="small" @click="handleDelete(row)">删除/注销</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getUserDetail, deleteUser, getBatchUsers } from '@/api/user'
import { ElMessage, ElMessageBox } from 'element-plus'

const list = ref([])
const listLoading = ref(false)
const listQuery = ref({ userId: '' })

const handleFilter = async () => {
  if(!listQuery.value.userId) return
  listLoading.value = true
  try {
    const res = await getUserDetail(listQuery.value.userId)
    list.value = res ? [res] : []
  } finally {
    listLoading.value = false
  }
}

// 模拟列表：因为后端没有 listAll，这里手动查 ID 1-5
const mockList = async () => {
  listLoading.value = true
  const ids = [1, 2, 3, 4, 5]
  const res = await getBatchUsers(ids)
  list.value = res.filter(i => i !== null)
  listLoading.value = false
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定注销该用户吗？', '警告', { type: 'warning' }).then(async () => {
    await deleteUser(row.userId)
    ElMessage.success('已删除')
    mockList() // 刷新
  })
}

onMounted(() => mockList())
</script>