<template>
  <div class="app-container">
    <el-card shadow="never" class="filter-container">
      <div class="filter-item">
        <el-input 
          v-model="listQuery.id" 
          placeholder="请输入讲师ID查询" 
          style="width: 200px; margin-right: 10px;" 
          clearable 
          @keyup.enter="handleFilter"
        />
        <el-button type="primary" icon="Search" @click="handleFilter">查找</el-button>
        <el-button icon="Refresh" @click="loadMockList">重置/刷新列表</el-button>
        <el-button type="success" icon="Plus" @click="handleCreate" style="margin-left: 10px;">添加讲师</el-button>
      </div>
    </el-card>

    <el-card shadow="never" style="margin-top: 20px;">
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row>
        
        <el-table-column prop="id" label="ID" width="80" align="center" />
        
        <el-table-column label="讲师头像" width="100" align="center">
          <template #default="{ row }">
            <el-avatar :size="50" :src="row.avatarUrl" />
          </template>
        </el-table-column>

        <el-table-column prop="name" label="姓名" width="150" align="center" />
        
        <el-table-column prop="title" label="头衔/职位" width="180" align="center">
          <template #default="{ row }">
            <el-tag effect="plain">{{ row.title || '暂无头衔' }}</el-tag>
          </template>
        </el-table-column>
        
        <el-table-column prop="bio" label="讲师简介" show-overflow-tooltip />

        <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleUpdate(row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :title="dialogStatus === 'create' ? '添加讲师' : '编辑讲师'" v-model="dialogFormVisible" width="500px">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="80px" style="width: 400px; margin-left:50px;">
        
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" placeholder="请输入讲师姓名" />
        </el-form-item>
        
        <el-form-item label="头衔" prop="title">
          <el-input v-model="temp.title" placeholder="例如：高级Java讲师" />
        </el-form-item>
        
        <el-form-item label="头像URL" prop="avatarUrl">
          <el-input v-model="temp.avatarUrl" placeholder="输入图片地址" />
        </el-form-item>
        
        <el-form-item label="简介" prop="bio">
          <el-input 
            v-model="temp.bio" 
            type="textarea" 
            :rows="4" 
            placeholder="请输入讲师详细介绍" 
          />
        </el-form-item>
        
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogStatus === 'create' ? createData() : updateData()">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { getInstructor, addInstructor, updateInstructor, deleteInstructor } from '@/api/edu'
import { ElMessage, ElMessageBox } from 'element-plus'

// --- 数据定义 ---
const list = ref([])
const listLoading = ref(false)
const listQuery = reactive({ id: '' })

// 弹窗控制
const dialogFormVisible = ref(false)
const dialogStatus = ref('create') // 'create' or 'update'
const temp = ref({
  id: undefined,
  name: '',
  title: '',
  avatarUrl: '',
  bio: ''
})

// --- 方法实现 ---

// 1. 获取列表 (模拟)
// 因为后端没有提供 listAll 接口，这里我们模拟查询 ID 1-5 的数据
const loadMockList = async () => {
  listLoading.value = true
  const mockData = []
  // 循环尝试获取 ID 1 到 5 的讲师
  for (let i = 1; i <= 5; i++) {
    try {
      // 注意：这里可能会因为后端查不到抛错，我们在 catch 里忽略
      const res = await getInstructor(i)
      if (res) mockData.push(res)
    } catch (e) {
      // 忽略查不到的 ID
    }
  }
  list.value = mockData
  listLoading.value = false
}

// 2. 单个查询
const handleFilter = async () => {
  if (!listQuery.id) {
    ElMessage.warning('请输入ID')
    return
  }
  listLoading.value = true
  try {
    const res = await getInstructor(listQuery.id)
    if (res) {
      list.value = [res]
    } else {
      list.value = []
      ElMessage.info('未找到该讲师')
    }
  } catch (e) {
    list.value = []
  } finally {
    listLoading.value = false
  }
}

// 3. 打开新增弹窗
const handleCreate = () => {
  temp.value = { id: undefined, name: '', title: '', avatarUrl: '', bio: '' }
  dialogStatus.value = 'create'
  dialogFormVisible.value = true
}

// 4. 执行新增
const createData = async () => {
  // 简单的表单校验
  if(!temp.value.name) return ElMessage.warning('姓名不能为空')
  
  try {
    await addInstructor(temp.value)
    ElMessage.success('添加成功')
    dialogFormVisible.value = false
    loadMockList() // 刷新列表
  } catch (e) {
    // request.js 会处理错误提示
  }
}

// 5. 打开编辑弹窗
const handleUpdate = (row) => {
  temp.value = { ...row } // 拷贝对象，防止修改弹窗影响表格显示
  dialogStatus.value = 'update'
  dialogFormVisible.value = true
}

// 6. 执行更新
const updateData = async () => {
  try {
    await updateInstructor(temp.value)
    ElMessage.success('更新成功')
    dialogFormVisible.value = false
    loadMockList() // 刷新列表
  } catch (e) {
    // 错误处理
  }
}

// 7. 删除
const handleDelete = (row) => {
  ElMessageBox.confirm(`确定要删除讲师 "${row.name}" 吗?`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await deleteInstructor(row.id)
    ElMessage.success('删除成功')
    // 如果列表里只有这一条，清空；否则刷新
    if (list.value.length === 1 && list.value[0].id === row.id) {
      list.value = []
    } else {
      loadMockList()
    }
  })
}

// 初始化加载
onMounted(() => {
  loadMockList()
})
</script>

<style scoped>
.filter-container {
  margin-bottom: 20px;
}
.filter-item {
  display: flex;
  align-items: center;
}
</style>