<template>
  <div class="employees-container">
    <div class="app-container">
      <page-tools title="总数">
        <el-button type="warning" size="small" @click="$router.push('/import')">excel导入</el-button>
        <el-button type="danger" size="small" @click="daochu">excel导出</el-button>
        <el-button type="primary" size="small" @click="showDialog=true">新增员工</el-button>
      </page-tools>
    </div>
    <el-card style="margin-top: 10px">
      <el-table border :data="employee" :default-sort="{prop:'timeOfEntry'}">
        <el-table-column label="序号" type="index" />
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="图片" prop="staffPhoto">
          <template slot-scope="scope">
            <image-holder :src="scope.row.staffPhoto || ''" />
          </template>
        </el-table-column>
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
            <el-button type="info" round size="mini" @click="$router.push('/employees/detail?id='+ scope.row.id)">查看
            </el-button>
            <el-button type="primary" round @click="hAssignRole(scope.row.id)">分配角色</el-button>
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
    <el-dialog :visible.sync="showDialogRole" title="fenpeijuese">
      <assign-role :cur-id="curId" @quxiao="showDialogRole=false" />
    </el-dialog>
  </div>
</template>
<script>
import PageTools from '@/components/PageTools'
import { delEmployee, getEmployeeList } from '@/api/employees'
import { TYPE_MAP } from '@/constant'
import EmpDialog from '@/views/employees/empDialog'
import assignRole from '@/views/employees/assignRole'

export default {
  components: {
    EmpDialog,
    PageTools,
    assignRole
  },
  data() {
    return {
      showDialogRole: false, // 分配权限
      showDialog: false, // yuangong
      employee: [],
      total: 0,
      page: 1, // 当前页码
      size: 5, //  每页几条
      curId: ''
    }
  },
  created() {
    this.loadEmployee()
  },
  methods: {
    // 分配角色
    hAssignRole(id) {
      this.showDialogRole = true
      this.curId = id
    },
    formatData(rows) {
      // const data = rows.map(obj => { return Object.values(obj) })
      // const header = Object.keys(rows[0])
      const enHeader = Object.keys(rows[0])
      const map = {
        'id': '编号',
        'password': '密码',
        'mobile': '手机号',
        'username': '姓名',
        'timeOfEntry': '入职日期',
        'formOfEmployment': '聘用形式',
        'correctionTime': '转正日期',
        'workNumber': '工号',
        'departmentName': '部门',
        'staffPhoto': '头像地址'
      }
      const header = enHeader.map(en => { return map[en] })
      // 内容
      const data = rows.map(obj => {
        const key = obj['formOfEmployment']
        obj['formOfEmployment'] = TYPE_MAP[key]
        return Object.values(obj)
      })
      // 英文表头
      // const header = Object.keys(rows[0])
      return { header, data }
    },
    async daochu() {
      const { data: res } = await getEmployeeList({ page: this.page, size: this.size })
      const { header, data } = this.formatData(res.rows)
      import('@/vendor/Export2Excel').then(excel => {
        // excel表示导入的模块对象
        console.log(excel)
        excel.export_json_to_excel({
          header, // 表头 必填
          data, // 具体数据 必填
          filename: '员工名称', // 文件名称
          autoWidth: true, // 宽度是否自适应
          bookType: 'xlsx' // 生成的文件类型
        })
      })
    },
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
