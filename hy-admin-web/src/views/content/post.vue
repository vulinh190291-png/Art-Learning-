<template>
  <div class="app-container">
    <el-card shadow="never">
      <el-input v-model="qId" placeholder="帖子ID" style="width: 200px" />
      <el-button type="primary" @click="search">查询</el-button>
    </el-card>
    <el-card style="margin-top: 20px">
      <el-table :data="list" border>
        <el-table-column prop="postId" label="ID" width="80" />
        <el-table-column label="封面" width="120">
          <template #default="{ row }">
             <el-image :src="row.imageUrl" style="width: 100px; height: 100px" fit="cover" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="description" label="内容" show-overflow-tooltip />
        <el-table-column label="操作" width="150">
          <template #default="{ row }">
            <el-button type="danger" size="small" @click="del(row)">违规删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getPost, deletePost } from '@/api/content'
import { ElMessage } from 'element-plus'

const qId = ref('')
const list = ref([])

const search = async () => {
  if(!qId.value) return
  const res = await getPost(qId.value)
  list.value = res ? [res] : []
}

const del = async (row) => {
  await deletePost(row.postId)
  ElMessage.success('删除成功')
  list.value = []
}
</script>