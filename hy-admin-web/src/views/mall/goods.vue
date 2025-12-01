<template>
  <div class="app-container">
    <el-card shadow="never">
      <el-input v-model="queryId" placeholder="商品ID" style="width: 200px; margin-right: 10px;" />
      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button @click="loadMock">重置</el-button>
    </el-card>

    <el-card style="margin-top: 20px" shadow="never">
      <el-table :data="list" border>
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column label="商品图片" width="120">
          <template #default="{ row }">
            <el-image :src="row.imageUrl" style="width: 80px; height: 80px" fit="cover" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="price" label="价格">
          <template #default="{ row }">￥{{ row.price }}</template>
        </el-table-column>
        <el-table-column prop="stock" label="库存" width="100" />
        <el-table-column label="认证" width="100">
          <template #default="{ row }">
            <el-tag :type="row.isCertified ? 'success' : 'info'">{{ row.isCertified ? '是' : '否' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button size="small" @click="handleEdit(row)">编辑/认证</el-button>
            <el-button size="small" type="danger" @click="handleDelete(row)">下架</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="商品编辑">
      <el-form :model="temp" label-width="100px">
        <el-form-item label="名称"><el-input v-model="temp.name" /></el-form-item>
        <el-form-item label="价格"><el-input v-model="temp.price" type="number" /></el-form-item>
        <el-form-item label="官方认证">
          <el-switch v-model="temp.isCertified" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateData">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProduct, updateProduct, deleteProduct } from '@/api/mall'
import { ElMessage } from 'element-plus'

const list = ref([])
const queryId = ref('')
const dialogVisible = ref(false)
const temp = ref({})

const handleSearch = async () => {
  if(!queryId.value) return
  const res = await getProduct(queryId.value)
  list.value = res ? [res] : []
}

const loadMock = async () => {
  // 模拟批量
  const arr = []
  for(let i=1; i<=3; i++) {
    try { const p = await getProduct(i); if(p) arr.push(p) } catch(e){}
  }
  list.value = arr
}

const handleEdit = (row) => {
  temp.value = { ...row }
  dialogVisible.value = true
}

const updateData = async () => {
  await updateProduct(temp.value)
  ElMessage.success('更新成功')
  dialogVisible.value = false
  loadMock()
}

const handleDelete = async (row) => {
  await deleteProduct(row.id)
  ElMessage.success('已下架')
  loadMock()
}

onMounted(() => loadMock())
</script>