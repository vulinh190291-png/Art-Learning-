<template>
  <div class="app-container">
    <el-card shadow="never">
      <el-button type="primary" @click="fetchOrders">刷新最近订单 (User 1-5)</el-button>
    </el-card>

    <el-card style="margin-top: 20px" shadow="never">
      <el-table :data="list" border>
        <el-table-column prop="orderId" label="订单ID" width="80" />
        <el-table-column prop="orderNumber" label="订单编号" width="180" />
        <el-table-column prop="userId" label="用户ID" width="80" />
        <el-table-column prop="totalPrice" label="总价" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag>{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button size="small" type="primary" @click="shipOrder(row)">发货</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getOrderBatch, updateOrder } from '@/api/mall'
import { ElMessage } from 'element-plus'

const list = ref([])

const fetchOrders = async () => {
  // 假设查询用户ID为 1 到 5 的所有订单
  const userIds = [1, 2, 3, 4, 5]
  const res = await getOrderBatch(userIds)
  list.value = res
}

const shipOrder = async (row) => {
  const newRow = { ...row, status: 'SHIPPED' }
  await updateOrder(newRow)
  ElMessage.success('发货成功')
  fetchOrders()
}

onMounted(() => fetchOrders())
</script>