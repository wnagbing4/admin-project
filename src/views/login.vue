<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import type { LoginDataType } from '@/api/types/loginType'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
const router = useRouter()

const store = useAuthStore()

const loginForm = reactive<LoginDataType>({
  username: 'admin',
  password: 'abc12345'
})

const rules = reactive<FormRules<LoginDataType>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入用户密码', trigger: 'blur' }]
})

const loginFormRef = ref<FormInstance>()
const loading = ref<boolean>(false)

const handleLogin = () => {
  loginFormRef.value!.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true

      try {
        const res = await store.userLogin(loginForm)
        // TODO : 跳转到主页
        if (res) router.push('/')
      } catch (e) {
        console.log(e)
      } finally {
        loading.value = false
      }
    }
  })
}
</script>
<template>
  <div class="login-wrapper">
    <div class="login-content">
      <div class="info">
        <p class="title">用户登录</p>
        <p class="sub-title">青牛前端后台管理系统</p>
      </div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="输入用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input show-password v-model="loginForm.password" placeholder="输入用户密码" />
        </el-form-item>

        <el-form-item>
          <el-button :loading="loading" class="submit" type="primary" @click="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-wrapper {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  .login-content {
    width: 400px;
    padding: 0 26px 24px 26px;

    .info {
      text-align: center;
      padding: 12px;

      .title {
        font-size: 24px;
        padding: 10px 0;
      }

      .sub-title {
        font-size: 14px;
        color: #999;
      }
    }

    .submit {
      width: 100%;
    }
  }
}
</style>
