<script lang="ts" setup>
import type { Child } from '@/api/types/loginType'

defineProps<{
  item: Child
}>()
</script>
<template>
  <!-- 有子菜单 -->
  <template v-if="item.children && item.children.length > 0">
    <el-sub-menu :index="item.link">
      <template #title>
        <el-icon> <span :class="item.icon"></span></el-icon>

        <span>{{ item.menuname }}</span>
      </template>

      <sidebarItem
        v-for="(child, childIndex) in item.children"
        :key="childIndex"
        :item="child"
      ></sidebarItem>
    </el-sub-menu>
  </template>
  <!-- 没有子菜单 -->
  <el-menu-item v-else :index="item.link">
    <el-icon> <span :class="item.icon"></span></el-icon>
    <span>{{ item.menuname }}</span>
  </el-menu-item>
</template>

<style scoped lang="scss"></style>
