<template>
  <el-image :src="src">
    <template #error>
      <img src="./DM_20220602113150_001.png" alt="">
    </template>
  </el-image>
</template>
<script>
export default {
  props: {
    src: {
      required: true,
      type: String
    }
  }
}
</script>
<style scoped>
/deep/ img {
  width: 100px;
  height: 100px;
  border-radius: 20%;
}
</style>
