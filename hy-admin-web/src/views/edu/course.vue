<template>
  <div class="app-container">
    <el-card shadow="never">
      <el-button type="primary" @click="loadData">刷新课程 (ID 1-5)</el-button>
    </el-card>
    <el-card style="margin-top: 20px">
      <el-table :data="list" border>
        <el-table-column prop="courseId" label="ID" width="80" />
        <el-table-column prop="title" label="课程名" />
        <el-table-column prop="price" label="价格">
           <template #default="{ row }">
             <span style="color: red; font-weight: bold;">￥{{ row.price }}</span>
           </template>
        </el-table-column>
        <el-table-column prop="studentCount" label="学员数" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="danger" size="small" @click="del(row)">下架</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCourseBatch, deleteCourse } from '@/api/edu'
import { ElMessage } from 'element-plus'

const list = ref([])

const loadData = async () => {
  const ids = [1,2,3,4,5]
  const res = await getCourseBatch(ids)
  list.value = res
}

const del = async (row) => {
  await deleteCourse(row.courseId)
  ElMessage.success('已下架')
  loadData()
}

onMounted(() => loadData())
</script>