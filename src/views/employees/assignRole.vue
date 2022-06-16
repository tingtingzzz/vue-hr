<template>
  <!-- // 分配角色 -->
  <div>
    <el-checkbox-group v-model="roleIds">
      <el-checkbox />
    </el-checkbox-group>

    <div
      style="margin-top: 20px; text-align: right"
    >
      <el-button type="primary">确定</el-button>
      <el-button @click="closeDialog">取消</el-button>
    </div>
  </div>
</template>
<script>
import { getRoles } from '@/api/setting'

export default {
  props: {
    curId: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      roleIds: [],
      list: []
    }
  },
  created() {
    this.loadRoles()
  },
  methods: {
    // 获取所有数据
    async loadRoles() {
      const { data: res } = await getRoles(this.curId)
      this.list = res.rows
    },
    closeDialog() {
      this.$emit('quxiao')
    }
  }
}
</script>
