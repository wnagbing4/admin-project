/*
 * @Author: 3396515303@qq.com 12267007+wangbing56@user.noreply.gitee.com
 * @Date: 2024-06-17 17:08:35
 * @LastEditors: 3396515303@qq.com 12267007+wangbing56@user.noreply.gitee.com
 * @LastEditTime: 2024-06-17 17:09:30
 * @FilePath: \admin-project\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


import { createApp } from 'vue'
import { useAllPlugins } from './plugins'

import App from './App.vue'

const app = createApp(App)
useAllPlugins(app)

app.mount('#app')
