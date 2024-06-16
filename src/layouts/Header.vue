<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
// @ts-ignore
import { useAuthStore } from '@/stores/auth'
import {Expand,Fold} from '@element-plus/icons-vue'
// @ts-ignore
import Tags from './Tag.vue'
const store = useAuthStore()

const handleCollapse = () => {
  store.setCollapse()
}

const handleCommand = async (command: string) => {
  if (command === 'logout') {
    await store.resetUser()
    // router.push('/login')
    window.location.reload()
  }
}
</script>
<template>
  <div class="header-wrapper">
    <div class="header-left">
      <div class="collapse-icon">
        <span @click="handleCollapse">
          <el-icon size="18" v-if="!store.isCollapse"><Fold /></el-icon>
          <el-icon size="18" v-else><Expand /></el-icon>
        </span>
      </div>

      <div class="bread-crumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index">
            {{ item.meta.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="header-right">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{ store.info?.username }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <tags />
</template>

<style scoped lang="scss">
.header-wrapper {
    height: 20%;
  height: 64px;
  width: 100%;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header-left {
    display: flex;
    align-items: center;

    .collapse-icon {
      margin-right: 10px;
    }

    .bread-crumb {
      position: relative;
      top: -1px;
    }
  }

  .el-dropdown-link {
    outline: none;
  }
}

</style>
