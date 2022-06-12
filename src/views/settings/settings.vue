<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="hAdd"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table :data="roles">
              <el-table-column label="序号" width="120" type="index" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button
                    size="small"
                    type="primary"
                    @click="hEdit(scope.row)"
                  >编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="hDel(scope.row.id)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <!-- 分页组件 -->
              <el-pagination
                :total="total"
                :page-size="pagesize"
                :page-sizes="[2, 4, 8, 10]"
                :current-page="page"
                layout="prev,pager,next,sizes"
                @current-change="hCurrentChange"
                @size-change="handleSizeChange"
              />
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!-- 新增弹框 -->
      <el-dialog
        :title="isEdit ? '添加' : '编辑'"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :visible.sync="showDialog"
        @close="qwe"
      >
        <el-form
          ref="roleForm"
          :model="roleForm"
          :rules="rules"
          label-width="100px"
        >
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name" />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="roleForm.description" />
          </el-form-item>
        </el-form>
        <!-- 底部 -->
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" @click="showDialog = false">取消</el-button>
            <el-button
              size="small"
              type="primary"
              @click="hSubmit"
            >确定</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { addRole, deleteRole, editRole, getRoles } from '@/api/settings'

export default {
  data() {
    return {
      isEdit: false,
      roles: [], // 数据
      total: 0, // 总条数
      page: 1,
      pagesize: 4,
      showDialog: false,
      roleForm: {
        name: '',
        description: ' '
      },
      rules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        description: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.logadRoles()
  },
  methods: {
    // 重置表单
    qwe() {
      this.$nextTick(() => {
        this.$refs.roleForm.resetFields()
      })
    },
    // 编辑
    hEdit(data) {
      this.showDialog = true
      this.isEdit = false
      this.roleForm = { ...data }
    },
    // 确定
    hSubmit() {
      this.$refs.roleForm.validate((valid) => {
        if (!valid) return this.$message.error('添加失败')
        this.isEdit ? this.doAdd() : this.doEdit()
      })
    },
    // 编辑
    async doEdit() {
      try {
        await editRole(this.roleForm)
        this.$message.success('编辑成功')
        this.showDialog = false
        await this.logadRoles()
      } catch (e) {
        console.log(e)
      }
    },
    // 添加
    async doAdd() {
      try {
        await addRole(this.roleForm)
        this.total++
        this.page = Math.ceil(this.total / this.pagesize)
        await this.logadRoles()
        this.showDialog = false
        this.$message.success('添加成功')
      } catch (e) {
        console.log(e)
      }
    },
    async hAdd() {
      // await addRole({ name: 'ikun', description: '保安' })
      // this.$message.success('添加成功')
      // await this.logadRoles()
      this.showDialog = true
      this.isEdit = true
    },
    // 删除
    async doDel(id) {
      const res = await deleteRole(id)
      this.$message.success(res.message)
      if (this.roles.length === 1 && this.page > 1) {
        this.page--
      }
      await this.logadRoles()
    },
    hDel(id) {
      this.$confirm('确认要删除嘛', '提示')
        .then(() => {
          this.doDel(id)
        })
        .catch(() => {
          this.$message.error('取消了')
        })
    },
    async logadRoles() {
      try {
        const { data: res } = await getRoles({
          page: this.page,
          pagesize: this.pagesize
        })
        this.roles = res.rows
        this.total = res.total
        // console.log(res)
      } catch (e) {
        this.$message.error(e)
      }
    },
    hCurrentChange(c) {
      this.page = c
      this.logadRoles()
    },
    handleSizeChange(c) {
      this.pagesize = c
      this.logadRoles()
    }
  }
}
</script>

<style scoped></style>
