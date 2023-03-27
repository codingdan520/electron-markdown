<script setup lang="ts">

</script>

<template>
  <el-row class="container">
    <el-col :span="6" class="aside">
      左侧
    </el-col>
    <el-col :span="18">
      右侧
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.container {
  height: 100vh;
  .aside {
    background-color: #91BC74;
  }
}
</style>
