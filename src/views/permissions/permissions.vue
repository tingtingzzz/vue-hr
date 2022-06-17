<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 表格 -->
      <el-card>
        <div style="text-align: right; margin-bottom: 20px">
          <el-button v-allow="'aa'" type="primary" size="small" @click="hAdd(1,'0')">添加权限</el-button>
        </div>
        <el-table border :data="list" row-key="id">
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.type===1" type="text" @click="hAdd(2,scope.row.id)">添加</el-button>
              <el-button type="text" @click="hEdit(scope.row.id)">编辑</el-button>
              <el-button v-if="scope.row.children.length===0" type="text" @click="hDel(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <el-dialog :visible.sync="showDialog" :title="isEdit ? '添加' : '编辑' " @close="hclose">
      <!-- 表单内容 -->
      <el-form label-width="100px">
        <el-form-item label="权限名称">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="权限标识">
          <el-input v-model="formData.code" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" />
        </el-form-item>
        <el-form-item label="权限启用">
          <el-switch
            v-model="formData.enVisible"
            active-text="启用"
            active-value="1"
            inactive-text="不启用"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div style="text-align: right;">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="hSubmit">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { addPermission, delPermission, getPermissionDetail, getPermissionList, updatePermission } from '@/api/permisson'
import { arrayToTree } from '@/utils'

export default {
  data() {
    return {
      isEdit: false,
      list: [],
      showDialog: false, // 是否显示弹层
      formData: {
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        enVisible: '0', // 开启
        pid: '', // 添加到哪个节点下
        type: '' // 类型
      }
    }
  },
  created() {
    this.loadPermissionList()
  },
  methods: {
    // 获取所有数据
    async loadPermissionList() {
      const { data: res } = await getPermissionList()
      // console.log(res)
      // 数组转树
      this.list = arrayToTree(res)
    },
    //  添加
    hAdd(type, pid) {
      this.isEdit = true
      this.showDialog = true
      this.formData.type = type
      this.formData.pid = pid
      console.log(type, pid)
    },
    //  确定
    hSubmit() {
      this.isEdit ? this.doAdd() : this.doEdit()
    },
    async doAdd() {
      try {
        await addPermission(this.formData)
        this.$message.success('添加成功')
        await this.loadPermissionList()
        this.showDialog = false
      } catch (e) {
        console.log(e)
        this.$message.error('添加失败')
      }
    },
    // 点击了编辑
    async hEdit(id) {
      this.isEdit = false
      this.showDialog = true
      const { data: res } = await getPermissionDetail(id)
      this.formData = res
    },
    async doEdit() {
      try {
        await updatePermission(this.formData)
        this.$message.success('编辑成功')
        this.showDialog = false
        await this.loadPermissionList()
      } catch (e) {
        console.log(e)
        this.$message.error('bianjishibai')
      }
    },
    // 强制清空
    hclose() {
      this.formData = {
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        enVisible: '0', // 开启
        pid: '', // 添加到哪个节点下
        type: '' // 类型
      }
    },
    //  点击删除
    hDel(id) {
      this.$confirm('确定要删除吗', '提示').then(async() => {
        await delPermission(id)
        this.$message.success('删除成功')
        this.showDialog = false
        await this.loadPermissionList()
      }).catch(() => {
        this.$message.error('shanchushibai')
      })
    }
  }
}
</script>
