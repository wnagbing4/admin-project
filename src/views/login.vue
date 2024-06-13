<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login_box">
    <div class="login_box_all">
      <div class="title">
        <p class="title_first">用户登录</p>
        <p class="title_second">青牛前端后台管理系统</p>
      </div>
      <div class="form_box">
        <el-form ref="loginFormRef" :model="loginForm" :rules="rules">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input show-password v-model="loginForm.password" />
          </el-form-item>
          <el-form-item>
            <el-button :loading='loading' class="submit" type="primary" @click="submitForm">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type {  FormInstance, FormRules } from 'element-plus'
// @ts-ignore
import {login} from '@/api/login'
interface loginRuleForm {
  username: string;
   password:string;
  
}
const loginFormRef = ref<FormInstance>()
const loginForm = reactive<loginRuleForm>({
  username: 'admin',
  password:''
})

const loading=ref<boolean>(false)
const rules = reactive<FormRules<loginRuleForm>>({
  username: [
    { required: true, message: '输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '输入用户密码', trigger: 'blur' },
  ],
})

const submitForm = () => {
  loginFormRef.value!.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true

      try {
        const res = await login(loginForm)
        console.log('Res=>', res)

        // TODO : 存储token
        // TODO : 获取用户信息 , 路由守卫
        // TODO : 跳转到主页
      } catch (e) {
        console.log(e)
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.login_box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  //  background: red;
  .login_box_all {
    width: 400px;
    //  height: ;
    .title {
      width: 100%;
      text-align: center;
      //  padding: 0 10px;
      .title_first {
        font-size: 26px;
      }
      .title_second {
        margin-top: 10px;
        font-size: 14px;
        color: #909399;
      }
    }
    .form_box{
        width:100%;
        margin-top:20px;
        .submit{
            width: 100%;
        }
    }
  }
}
</style>

