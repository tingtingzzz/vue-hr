<template>
  <div class="employees-container">
    <div class="app-container">
      <page-tools title="总数">
        <el-button type="warning" size="small">excel导入</el-button>
        <el-button type="danger" size="small">excel导出</el-button>
        <el-button type="primary" size="small" @click="showDialog=true">新增员工</el-button>
      </page-tools>
    </div>
    <el-card style="margin-top: 10px">
      <el-table border :data="employee" :default-sort="{prop:'timeOfEntry'}">
        <el-table-column label="序号" type="index" />
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="工号" prop="workNumber" />
        <el-table-column label="聘用形式" prop="formOfEmployment">
          <template slot-scope="scope">{{
            format(scope.row.formOfEmployment)
          }}
          </template>
        </el-table-column>
        <el-table-column label="部门" prop="departmentName" />
        <el-table-column label="入职时间" prop="timeOfEntry" sortable />
        <el-table-column label="账户状态" />
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button type="info" round size="mini">查看</el-button>
            <el-button type="primary" round>分配角色</el-button>
            <el-button type="success" round @click="hDel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <el-pagination
          :total="total"
          :page-sizes="[2,5,10,15]"
          :page-size="size"
          :current-page="page"
          layout="total, prev, pager, next,sizes"
          @current-change="hCurrentChange"
          @size-change="handleSizeChange"
        />
      </el-row>
    </el-card>
    <el-dialog
      title="添加员工"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="showDialog"
      @close="hclose"
    >
      <emp-dialog ref="qwe" @success="hsuccess" @quxiao="hquxiao" />
    </el-dialog>
  </div>
</template>
<script>
import PageTools from '@/components/PageTools'
import { delEmployee, getEmployeeList } from '@/api/employees'
import { TYPE_MAP } from '@/constant'
import EmpDialog from '@/views/employees/empDialog'

export default {
  components: {
    EmpDialog,
    PageTools
  },
  data() {
    return {
      showDialog: false,
      employee: [],
      total: 0,
      page: 1, // 当前页码
      size: 10 //  每页几条
    }
  },
  created() {
    this.loadEmployee()
  },
  methods: {
    hclose() {
      this.$refs.qwe.resetForm()
    },
    hquxiao() {
      this.showDialog = false
    },
    hsuccess() {
      this.showDialog = false
      this.loadEmployee()
      this.total++
      this.page = Math.ceil(this.total / this.size)
    },
    // 删除
    async doDel(id) {
      try {
        await delEmployee(id)
        if (this.employee.length === 1 && this.page > 1) {
          this.page--
        }
        this.$message.success('删除成功')
        await this.loadEmployee()
      } catch (e) {
        console.log(e)
      }
    },
    hDel(id) {
      this.$confirm('确定要删除吗', '提示').then(() => {
        this.doDel(id)
      }).catch(() => {
        this.$message.error('shanchushibai')
      })
    },
    hCurrentChange(c) {
      this.page = c
      this.loadEmployee()
    },
    handleSizeChange(c) {
      this.size = c
      this.loadEmployee()
    },
    async loadEmployee() {
      const { data: res } = await getEmployeeList({ page: this.page, size: this.size })
      // console.log(res)
      this.total = res.total
      this.employee = res.rows
    },
    format(val) {
      return TYPE_MAP[val] || '未知'
    }
  }
}
</script>
