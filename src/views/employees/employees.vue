<template>
  <div class="employees-container">
    <div class="app-container">
      <page-tools title="总数">
        <el-button type="warning" size="small">excel导入</el-button>
        <el-button type="danger" size="small">excel导出</el-button>
        <el-button type="primary" size="small">新增员工</el-button>
      </page-tools>
    </div>
    <el-card style="margin-top: 10px">
      <el-table border :data="employee">
        <el-table-column label="序号" type="index" />
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="工号" prop="workNumber" />
        <el-table-column label="聘用形式" prop="formOfEmployment">
          <template slot-scope="scope">{{
            format(scope.row.formOfEmployment)
          }}</template>
        </el-table-column>
        <el-table-column label="部门" prop="departmentName" />
        <el-table-column label="入职时间" prop="timeOfEntry" />
        <el-table-column label="账户状态" />
        <el-table-column label="操作" width="280">
          <template>
            <el-button type="info" round size="mini">查看</el-button>
            <el-button type="primary" round>分配角色</el-button>
            <el-button type="success" round>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <el-pagination layout="prev, pager, next" />
      </el-row>
    </el-card>
  </div>
</template>
<script>
import PageTools from '@/components/PageTools'
import { getEmployeeList } from '@/api/employees'
import { TYPE_MAP } from '@/constant'

export default {
  components: {
    PageTools
  },
  data() {
    return {
      employee: [],
      total: ''
    }
  },
  created() {
    this.loadEmployee()
  },
  methods: {
    async loadEmployee() {
      const { data: res } = await getEmployeeList({ page: 1, size: 10 })
      console.log(res)
      this.total = res.total
      this.employee = res.rows
    },
    format(val) {
      return TYPE_MAP[val] || '未知'
    }
  }
}
</script>
