<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
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
                  <el-button size="small" type="primary">编辑</el-button>
                  <el-button size="small" type="danger" @click="hDel(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件 -->
              <el-pagination
                :total="total"
                :page-size="pagesize"
                :page-sizes="[1, 2, 3, 4]"
                :current-page="page"
                layout="prev,pager,next,sizes"
                @current-change="hCurrentChange"
                @size-change="handleSizeChange"
              />

            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>

import { addRole, deleteRole, getRoles } from '@/api/settings'

export default {
  data() {
    return {
      roles: [], // 数据
      total: 0, // 总条数
      page: 1,
      pagesize: 2
    }
  },
  created() {
    this.logadRoles()
  },
  methods: {
    // 添加
    async  hAdd() {
      await addRole({ name: 'ikun', description: '保安' })
      this.$message.success('添加成功')
      await this.logadRoles()
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
      this.$confirm('确认要删除嘛', '提示').then(() => {
        this.doDel(id)
      }).catch(() => {
        this.$message.error('失败')
      })
    },
    async logadRoles() {
      try {
        const { data: res } = await getRoles({ page: this.page, pagesize: this.pagesize })
        this.roles = res.rows
        this.total = res.total
        console.log(res)
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

<style scoped>

</style>
