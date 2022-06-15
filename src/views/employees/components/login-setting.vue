<template>
  <el-form
    ref="userForm"
    :model="userInfo"
    label-width="120px"
    style="margin-left: 120px; margin-top: 30px"
    :rules="rules"
  >
    <el-form-item label="姓名:" prop="username">
      <el-input v-model="userInfo.username" style="width:300px" />
    </el-form-item>
    <el-form-item label="密码:" prop="password">
      <el-input v-model="userInfo.password" type="password" style="width:300px" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="hSubmit">更新</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'

export default {
  data() {
    return {
      userInfo: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空a', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.loadUserDetailById()
  },
  methods: {
    // 获取数据
    async loadUserDetailById() {
      const { data: res } = await getUserDetailById(this.$route.query.id)
      // console.log(res)
      this.userInfo = res
    },
    //  点击更新方法
    async doEdit() {
      try {
        await saveUserDetailById(this.userInfo)
        this.$message.success('修改成功')
        this.$refs.userForm.resetFields()
        this.$router.push('/employees')
      } catch (e) {
        console.log(e)
      }
    },
    // 点击更新
    hSubmit() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.doEdit()
        }
      })
    }
  }
}
</script>
