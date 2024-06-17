<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const activeIndex = ref<string>('/dashboard/home')

type TagsListType = {
  name: string
  path: string
}
const tagsList = ref<TagsListType[]>([])

const addTagsList = (name: string, path: string) => {
  const isPath = tagsList.value.findIndex((item) => item.path === path)
  if (isPath != -1) return

  tagsList.value.push({
    name,
    path
  })
}

watch(
  () => route,
  () => {
    addTagsList(route.meta.name as string, route.path)
    activeIndex.value = route.path
  },
  {
    deep: true,
    immediate: true
  }
)

const handleTag = (path: string) => {
  if (path) {
    activeIndex.value = path
    router.push(path)
  }
}

const handleClose = (index: number) => {
  if (tagsList.value.length === 1) {
    tagsList.value.splice(index, 1)
    router.push('/dashboard/home')
    return
  }

  if (tagsList.value[index].path === activeIndex.value && index === tagsList.value.length - 1) {
    tagsList.value.splice(index, 1)
    activeIndex.value = tagsList.value[tagsList.value.length - 1].path
    router.push(tagsList.value[tagsList.value.length - 1].path)
    return
  }

  if (tagsList.value[index].path === activeIndex.value) {
    tagsList.value.splice(index, 1)
    activeIndex.value = tagsList.value[index].path
    router.push(tagsList.value[index].path)
    return
  }

  tagsList.value.splice(index, 1)
}
</script>
<template>
  <div class="tags-wrapper">
    <div
      :class="{ active: item.path === activeIndex ? true : false }"
      @click="handleTag(item.path)"
      class="tags"
      v-for="(item, index) in tagsList"
      :key="index"
    >
      <span>{{ item.name }}</span>
      <el-icon size="12" @click.stop="handleClose(index)"><Close /></el-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tags-wrapper {
  display: flex;
  height: 32px;
  line-height: 32px;
  align-items: center;
  //   background-color: red;
  .tags {
    font-size: 12px;
    border: 1px solid #eee;
    padding: 5px 10px;
    margin-right: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      margin-right: 5px;
    }

    .el-icon {
      width: 20px;
      height: 20px;
      border-radius: 100%;
      justify-content: center;
      align-items: center;
      transition: all 0.5s;
    }

    .el-icon:hover {
      background-color: purple;
      color: #fff;
    }
  }

  .active {
    background-color: purple;
    color: #fff;
  }
}
</style>
