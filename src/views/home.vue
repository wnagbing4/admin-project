<script lang="ts" setup>
import { test, test_err } from '@/api/test'
// let flag = ref(false)
// false 发送请求 true 不发送请求
const handleClick = async () => {
  try {
    // if (flag.value) return
    // flag.value = true
    await test()

    // flag.value = false
  } catch (error) {
    console.log(error)
  }
}

const handleRequest = async () => {
  try {
    await test_err()
  } catch (error) {
    console.log(error)
  }
}

const str = ref('<p>hello</p> alert(123)')
</script>
<template>
  <div>
    <el-button @click="handleClick">click</el-button>

    <el-button @click="handleRequest">request</el-button>

    <div v-html="str"></div>
  </div>
</template>

<style scoped lang="scss"></style>
