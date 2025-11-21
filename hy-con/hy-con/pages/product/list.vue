<template>
  <admin-layout>
    <div style="margin-bottom: 20px;">
      <el-button type="primary" icon="el-icon-plus" @click="handleCreate">添加作品</el-button>
    </div>

    <el-table :data="products" border stripe>
      <el-table-column prop="product_id" label="ID" width="60"></el-table-column>
      <el-table-column label="封面" width="100">
        <template slot-scope="scope">
          <el-image style="width: 60px; height: 60px" :src="scope.row.cover_image_url" fit="cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="作品名称"></el-table-column>
      <el-table-column prop="price" label="价格">
        <template slot-scope="scope">¥{{ scope.row.price }}</template>
      </el-table-column>
      <el-table-column prop="stock" label="库存"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input-number v-model="form.price" :precision="2" :step="10"></el-input-number>
        </el-form-item>
        <el-form-item label="库存">
          <el-input-number v-model="form.stock" :step="1"></el-input-number>
        </el-form-item>
        <el-form-item label="封面图">
          <el-upload
            class="avatar-uploader"
            action="/api/upload/image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :headers="uploadHeaders">
            <img v-if="form.cover_image_url" :src="form.cover_image_url" class="avatar" style="width: 100px; height: 100px; display: block;">
            <i v-else class="el-icon-plus avatar-uploader-icon" style="border: 1px dashed #d9d9d9; padding: 40px;"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </admin-layout>
</template>

<script>
import AdminLayout from '@/components/AdminLayout.vue';

export default {
  components: { AdminLayout },
  data() {
    return {
      products: [
        { product_id: 101, name: '莫奈睡莲复刻版', price: 299.00, stock: 5, cover_image_url: 'https://via.placeholder.com/150' }
      ],
      dialogVisible: false,
      dialogTitle: '新增作品',
      form: {
        product_id: null,
        name: '',
        price: 0,
        stock: 0,
        cover_image_url: ''
      },
      // 上传图片时需要带 Token
      uploadHeaders: {
        Authorization: 'Bearer ' + uni.getStorageSync('admin_token')
      }
    }
  },
  methods: {
    handleCreate() {
      this.form = { name: '', price: 0, stock: 10, cover_image_url: '' };
      this.dialogTitle = '新增作品';
      this.dialogVisible = true;
    },
    handleEdit(row) {
      this.form = { ...row }; // 深拷贝
      this.dialogTitle = '编辑作品';
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file) {
      // 假设后端返回格式 { code: 200, data: { url: '...' } }
      this.form.cover_image_url = res.data.url; 
      // 本地演示直接用生成的 Blob
      // this.form.cover_image_url = URL.createObjectURL(file.raw);
    },
    submitForm() {
      // 这里调用后端保存接口
      this.$message.success('保存成功');
      this.dialogVisible = false;
      // this.fetchData(); // 刷新列表
    },
    handleDelete(row) {
      this.$confirm('确定删除吗？', '提示', { type: 'warning' }).then(() => {
        this.$message.success('删除成功');
      });
    }
  }
}
</script>