<template>
  <!-- // 分配角色 -->
  <div>
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>

    <div
      style="margin-top: 20px; text-align: right"
    >
      <el-button type="primary" @click="hSave">确定</el-button>
      <el-button @click="closeDialog">取消</el-button>
    </div>
  </div>
</template>
<script>
import { getRoles } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'

export default {
  props: {
    curId: {
      required: true,
      type: String,
      default: ''
    }
  },
  data() {
    return {
      roleIds: [],
      list: []
    }
  },
  created() {
    // 所有信息
    this.loadRoles()
    //  加载当前的用户具备的角色
    this.loadRolesById()
  },
  methods: {
    // 确定
    async hSave() {
      const res = await assignRoles({ id: this.curId, roleIds: this.roleIds })
      console.log(res)
      if (res.code !== 10000) return this.$message.error('分配失败')
      this.$message.success('分配成功')
      this.$emit('quxiao')
    },
    //  加载当前的用户具备的角色
    async loadRolesById() {
      const { data: res } = await getUserDetailById(this.curId)
      console.log(res)
      this.roleIds = res.roleIds
    },
    // 获取所有数据
    async loadRoles() {
      const { data: res } = await getRoles({ page: 1, pagesize: 100 })
      this.list = res.rows
    },
    closeDialog() {
      this.$emit('quxiao')
    }
  }
}
</script>
