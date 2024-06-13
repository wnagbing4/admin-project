<script lang="ts" setup>
import { test, test_err } from '@/api/test'
// let flag = ref(false)
// false 发送请求 true 不发送请求
const handleClick = async () => {
  try {
    // if (flag.value) return
    // flag.value = true
    const res = await test()
    console.log('Res==>', res)
    // flag.value = false
  } catch (error) {
    console.log(error)
  }
}

const handleRequest = async () => {
  try {
    const res = await test_err()
    console.log('Res==>', res)
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
