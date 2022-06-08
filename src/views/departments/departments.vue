<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
        <!-- 用一个行列布局 -->
        <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
          <el-col :span="20">
            <svg-icon icon-class="雪糕" /><span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <!-- 两个内容 -->
              <el-col>负责人</el-col>
              <!-- 下拉菜单 element -->
              <el-col>
                <el-dropdown>
                  <span>
                    操作<i class="el-icon-arrow-down" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-tree :data="data" :props="defaultProps" :default-expand-all="true" @node-click="handleNodeClick">
          <template slot-scope="{data}">
            <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width:100%">
              <el-col :span="20">
                <svg-icon icon-class="雪糕" /><span>{{ data.name }}</span>
              </el-col>
              <el-col :span="4">
                <el-row type="flex" justify="end">
                  <!-- 两个内容 -->
                  <el-col>{{ data.manager }}</el-col>
                  <!-- 下拉菜单 element -->
                  <el-col>
                    <el-dropdown>
                      <span>
                        操作<i class="el-icon-arrow-down" />
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="hAdd(data.id)">添加部门</el-dropdown-item>
                        <el-dropdown-item @click.native="hEdit(data.id)">编辑部门</el-dropdown-item>
                        <el-dropdown-item>删除部门</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

          </template>
        </el-tree>
      </el-card>
    </div>
    <el-dialog
      :title="isEdit ? '编辑部门' : '添加部门'"
      :visible.sync="showDialog"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <dept-dialog :pid="pid" :is-edit="isEdit" @success="hSuccess" />
    </el-dialog>
  </div>
</template>

<script>

import { getDepartments } from '@/api/departments'
import { arrayToTree } from '@/utils'
import DeptDialog from '@/views/departments/deptDialog'

export default {
  components: { DeptDialog },

  data() {
    return {
      isEdit: false,
      pid: '',
      showDialog: false,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.loadDepartments()
  },
  methods: {
    hEdit(id) {
      this.isEdit = true
      this.showDialog = true
      this.pid = id
    },
    hAdd(id) {
      this.showDialog = true
      this.pid = id
      this.isEdit = false
    },
    handleNodeClick(data) {
      console.log(data)
    },
    async loadDepartments() {
      const { data: res } = await getDepartments()
      console.log(res)
      res.depts.shift() // 删除数组第一个
      this.data = arrayToTree(res.depts)
    },
    hSuccess() {
      this.showDialog = false
      //  重新发送请求
      this.loadDepartments()
    }
  }
}
</script>
