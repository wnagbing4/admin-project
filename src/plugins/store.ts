/*
 * @Author: wangbing56 12267007+wangbing56@user.noreply.gitee.com
 * @Date: 2024-06-11 18:41:17
 * @LastEditors: wangbing56 12267007+wangbing56@user.noreply.gitee.com
 * @LastEditTime: 2024-06-11 18:41:41
 * @FilePath: \admin-project\src\plugins\store.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createPinia } from 'pinia'
import type { App } from 'vue'

const load = (app: App) => {
    app.use(createPinia())
}

export default load