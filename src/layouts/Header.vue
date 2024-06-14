<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
const store = useAuthStore()
const handleCollapse = () => {
  store.setCollapse()
}
</script>
<template>
  <div>
    <el-button @click="handleCollapse">展开/收起</el-button>
  </div>
</template>

<style scoped lang="scss"></style>
