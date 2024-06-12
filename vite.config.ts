import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      vueJsx(),
      // 自动加载vue的api
      AutoImport({
        imports: ['vue', 'vue-router']
      }),
      // 自动加载组件 默认自动注册src/components下的组件，可使用dts指定自动注册组件路径
      Components({
        dts: ['src/components']
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), '')
        },
        // '/api':{
        //   target:'http://serverqn.9yuecloud.com',
        //   changeOrigin:true,
        //   ws:true,
        //   rewrite:(path) => path.replace(/^\/api/, '')
        // }
      }
    }
  }
})
