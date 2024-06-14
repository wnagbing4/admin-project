<script lang="ts" setup>
import sidebarItem from './sidebarItem.vue'
import { useAuthStore } from '@/stores/auth'
const store = useAuthStore()

// 递归: 自身调用自身, 遇到一定的条件进行停止
// 递归组件: 组件自身调用组件自身, 遇到一定的条件进行停止

const menuList = computed(() => {
  return store.menuList
})

const isCollapse = computed(() => {
  return store.isCollapse
})

console.log('menuList', menuList)
</script>
<template>
  <div class="sidebar-wrapper" :style="{ width: isCollapse ? '60px' : '200px' }">
    <div class="admin-logo" :style="{ justifyContent: isCollapse ? 'center' : 'none' }">
      <img class="logo" src="@/assets/images/eye-logo.png" alt="" />
      <span v-if="!isCollapse">青牛前端</span>
    </div>

    <el-menu
      active-text-color="#ffd04b"
      background-color="#001529"
      :default-active="$route.path"
      text-color="#fff"
      router
      :collapse="isCollapse"
    >
      <el-menu-item index="/dashboard/home">
        <el-icon><setting /></el-icon>
        <span>面板</span>
      </el-menu-item>
      <template v-for="(item, index) in menuList" :key="index">
        <sidebarItem :item="item"> </sidebarItem>
      </template>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.sidebar-wrapper {
  height: 100%;
  background-color: #001529;
  transition: width 0.3s ease-in-out;
  overflow: auto;

  .admin-logo {
    display: flex;
    align-items: center;
    padding: 15px 10px;

    .logo {
      width: 32px;
    }

    span {
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      margin-left: 12px;
      letter-spacing: 2px;
      white-space: nowrap;
    }
  }

  .el-menu {
    border-right: none;
    transition: width 0.3s ease-in-out;
  }
}
</style>
