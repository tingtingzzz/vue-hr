<template>
  <el-form ref="deptForm" label-width="120px">
    <el-form-item label="部门名称">
      <el-input v-model="form.name" style="width:80%" placeholder="1-50个字符" />
    </el-form-item>
    <el-form-item label="部门编码">
      <el-input v-model="form.code" style="width:80%" placeholder="1-50个字符" />
    </el-form-item>
    <el-form-item label="部门负责人">
      <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
        <el-option v-for="item in list" :key="item.id" :value="item.username" :label="item.username" />
      </el-select>
    </el-form-item>
    <el-form-item label="部门介绍">
      <el-input v-model="form.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small" @click="hSubmit">确定</el-button>
      <el-button size="small">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getEmployeeSimple } from '@/api/employees'
import { addDepartments } from '@/api/departments'

export default {
  name: 'DeptDialog',
  props: {
    pid: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      list: []
    }
  },
  created() {
    this.loadDetail()
  },
  methods: {
    async loadDetail() {
      const { data: res } = await getEmployeeSimple()
      this.list = res
      console.log(res)
    },
    // 发送请求
    async doAdd() {
      const d = { ...this.form, pid: this.pid }
      await addDepartments(d)
      this.$emit('success')
    },
    hSubmit() {
      this.doAdd()
    }
  }
}
</script>

<style scoped>

</style>
