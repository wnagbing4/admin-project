<script lang="ts" setup>
import SideBar from './sidebar.vue'
import Header from './Header.vue'
</script>
<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <SideBar></SideBar>
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <router-view v-slot="{ Component }">
          <component :is="Component"></component>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss"></style>
