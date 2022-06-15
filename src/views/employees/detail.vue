<template>
  <div class="employees-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <login-setting />
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <user-info />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <job-info />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import LoginSetting from '@/views/employees/components/login-setting'
import UserInfo from '@/views/employees/components/user-info'
import JobInfo from '@/views/employees/components/job-info'

export default {
  components: { JobInfo, UserInfo, LoginSetting }
}
</script>
