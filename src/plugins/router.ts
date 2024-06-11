import type { App } from "vue"
import router from "@/router"
const load = (app: App) => {
    app.use(router)
}
export default load