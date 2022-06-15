<template>
  <div class="user-info">
    <!-- 个人信息 -->
    <el-form ref="userForm" label-width="220px" :model="userInfo" :rules="rules">
      <!--手机 -->
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="userInfo.mobile" style="width:220px" />
      </el-form-item>
      <!-- 工号 入职时间 -->
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="userInfo.timeOfEntry"
          type="date"
          class="inputW"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <!-- 员工照片 -->
      <el-form-item label="员工头像">
        <!-- 放置上传图片 -->
        <upload-img v-model="userInfo.staffPhoto" />
      </el-form-item>

      <!-- 保存个人信息 -->
      <el-form-item>
        <el-button type="primary" @click="hSubmit">更新</el-button>
        <el-button @click="$router.back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'

export default {
  data() {
    return {
      userInfo: {
        mobile: '',
        timeOfEntry: '',
        staffPhoto: '' // 初始为空
      },
      rules: {
        mobile: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        timeOfEntry: [{ required: true, message: '密码不能kong', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.loadUserDetailById()
  },
  // 获取数据
  methods: {
    async loadUserDetailById() {
      const { data: res } = await getUserDetailById(this.$route.query.id)
      console.log(res)
      this.userInfo = res
    },
    // 点击更新
    hSubmit() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.doEdit()
        }
      })
    },
    async doEdit() {
      try {
        console.log(1)
        await saveUserDetailById(this.userInfo)
        this.$message.success('更新成功')
      } catch (e) {
        console.log(e)
        this.$message.error('gengxinshibai')
      }
    }
  }
}
</script>
<style scoped lang="scss">
.user-info {
  padding-top: 20px;
}
</style>
