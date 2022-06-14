<template>
  <!-- 表单 -->
  <div>
    <el-form ref="addForm" label-width="120px" :rules="rules" :model="formData">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" placeholder="请选择">
          <el-option v-for="item in employType" :key="item.id" :value="item.id" :label="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" @focus="hFocus" />
        <div v-if="isload">
          <el-tree :data="treeData" :props="{ label: 'name' }" @node-click="hNodeClick" />
        </div>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
      </el-form-item>
      <el-form-item>
        <el-button @click="quxiao">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addEmployee, getDepartments } from '@/api/departments'
import { TYPE_MAP } from '@/constant'
import { arrayToTree } from '@/utils'

export default {
  data() {
    return {
      isload: false,
      treeData: [],
      employType: Object.keys(TYPE_MAP).map(item => { return { id: item, label: TYPE_MAP[item] } }),
      formData: {
        username: '', // 用户名
        mobile: '', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 清除数据
    resetForm() {
      this.formData = {
        username: '', // 用户名
        mobile: '', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      }
      this.$refs.addForm.resetFields()
    },
    quxiao() {
      this.$emit('quxiao')
    },
    // 点击了确定
    onSubmit() {
      this.$refs.addForm.validate(valid => {
        if (!valid) return this.$message.error('填写完整数据')
        this.doAdd()
      })
    },
    async doAdd() {
      try {
        await addEmployee(this.formData)
        this.$message.success('添加成功')
        this.$emit('success')
      } catch (e) {
        console.log(e)
        this.$message.error('添加失败')
      }
    },
    //  获取焦点
    hFocus() {
      this.loadDepartments()
    },
    async loadDepartments() {
      this.isload = true
      const { data: res } = await getDepartments()
      res.depts.shift()
      this.treeData = arrayToTree(res.depts)
    },
    // 点击部门
    hNodeClick(data) {
      // console.log(data)
      if (data.children.length) {
        return
      }
      this.formData.departmentName = data.name
      this.isload = false
    }
  }
}
</script>
