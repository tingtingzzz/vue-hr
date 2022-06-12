<template>
  <el-form ref="deptForm" label-width="120px" :rules="rules" :model="form">
    <el-form-item label="部门名称" prop="name">
      <el-input v-model="form.name" style="width:80%" placeholder="1-50个字符" />
    </el-form-item>
    <el-form-item label="部门编码" prop="code">
      <el-input v-model="form.code" style="width:80%" placeholder="1-50个字符" />
    </el-form-item>
    <el-form-item label="部门负责人" prop="manager">
      <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
        <el-option v-for="item in list" :key="item.id" :value="item.username" :label="item.username" />
      </el-select>
    </el-form-item>
    <el-form-item label="部门介绍" prop="introduce">
      <el-input v-model="form.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small" @click="hSubmit">确定</el-button>
      <el-button size="small" @click="hCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getEmployeeSimple } from '@/api/employees'
import { addDepartments, getDepartDetail, updateDepartments } from '@/api/departments'

export default {
  name: 'DeptDialog',
  props: {
    pid: {
      required: true,
      type: String
    },
    isEdit: {
      type: Boolean,
      required: true
    },
    originList: {
      required: true,
      type: Array
    }
  },
  data() {
    const validName = (rule, value, callback) => {
      let existNameList = this.originList.filter(item => item.pid === this.pid).map(item => item.name)
      if (this.isEdit) {
        const obj = this.originList.find(item => item.id === this.pid)
        const pid = obj.pid
        existNameList = this.originList.filter(item => item.pid === pid && item.id !== this.pid).map(item => item.name)
      }
      console.log('被占用的名字列表', existNameList)
      if (existNameList.includes(value)) {
        callback(new Error('value' + '被占用了'))
      } else {
        callback()
      }
    }
    const validCode = (rule, value, callback) => {
      let existCodeList = this.originList.map(item => item.code)
      // 如果是编辑状态就把当前编辑的部门排除
      if (this.isEdit) {
        const curDep = this.originList.find(item => item.id === this.pid)
        const curCode = curDep.code
        existCodeList = existCodeList.filter(item => item !== curCode)
      }
      if (existCodeList.includes(value)) {
        callback(new Error('value' + '被占用了'))
      } else {
        callback()
      }
    }

    return {
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名字是1-50', trigger: 'blur' },
          { validator: validName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码是1-50', trigger: 'blur' },
          { validator: validCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门介绍是1-50', trigger: 'blur' }
        ]
      },
      form: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      list: []
    }
  },
  created() {
    this.loadEmployee()
    // this.loadDetail()
  },
  methods: {
    async loadDetail() {
      const { data: res } = await getDepartDetail(this.pid)
      this.form = res
    },
    async loadEmployee() {
      const { data: res } = await getEmployeeSimple()
      this.list = res
      // console.log(res)
    },
    // 发送请求
    async doAdd() {
      const d = { ...this.form, pid: this.pid }
      await addDepartments(d)
      this.$emit('success')
    },
    async doEdit() {
      await updateDepartments(this.form)
      this.$emit('success')
    },
    hSubmit() {
      // 选择调用那个
      this.$refs.deptForm.validate(valid => {
        if (!valid) return this.$message.error('输入正确的信息')
        this.isEdit ? this.doEdit() : this.doAdd()
        this.$message.success('成功')
      })
    },
    hCancel() {
      this.$emit('close')
    },
    resetForm() {
      this.$refs.deptForm.resetFields()
    }
  }
}
</script>

<style scoped>

</style>
