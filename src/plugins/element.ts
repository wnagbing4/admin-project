import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import type { App } from 'vue'
const load=(app:App)=>{
      app.use(ElementPlus)
}
export default  load
