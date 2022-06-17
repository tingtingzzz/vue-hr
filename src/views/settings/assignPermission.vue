<template>
  <div>
    <el-tree
      ref="tree"
      :data="list"
      :props="{label:'name'}"
      show-checkbox
      check-strictly
      default-expand-all
      node-key="id"
    />
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permisson'
import { arrayToTree } from '@/utils'
import { assignPerm, getRoleDetail } from '@/api/settings'

export default {
  props: {
    curId: {
      require: true,
      type: String
    }
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    // 获取所有权限点
    this.loadPermission()
    // 根据id查询
    this.loadPermissionById()
  },
  methods: {
    async hsave() {
      try {
        const permIds = this.$refs.tree.getCheckedKeys()
        await assignPerm({ id: this.curId, permIds })
        this.$message.success('分配成功')
        this.$emit('qqq')
      } catch (e) {
        // console.log(e)
        this.$message.error('分配失败')
      }
    },
    async loadPermission() {
      const { data: res } = await getPermissionList()
      this.list = arrayToTree(res)
    },
    async loadPermissionById() {
      const { data: res } = await getRoleDetail(this.curId)
      console.log(res)
      this.$refs.tree.setCheckedKeys(res.permIds)
    }
  }
}
</script>

<style scoped>

</style>
