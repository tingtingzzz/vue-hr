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
        username: [{ required: true, message: '请输入名字', target: 'blur' }],
        password: [{ required: true, message: '请输入密码', target: 'blur' }]
      }
    }
  },
  created() {
    // 获取用某个用户的信息
    this.loadUserDetailById()
  },
  methods: {
    async loadUserDetailById() {
      const { data: res } = await getUserDetailById(this.$route.query.id)
      // console.log(res)
      this.userInfo = res
    },
    // 点击更新
    hSubmit() {
      this.$refs.userForm.validate(valid => {
        if (!valid) return this.$message.error('请输入完整数据')
        this.doEdit()
      })
    },
    // 更新方法
    async doEdit() {
      try {
        await saveUserDetailById(this.userInfo)
        this.$message.success('更新成功')
        this.$refs.userForm.resetFields()
        this.$router.push('/employees')
      } catch (e) {
        console.log(e)
        this.$message.error('更新失败')
      }
    }
  }
}
</script>
