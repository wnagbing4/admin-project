import './assets/main.css'

import { createApp } from 'vue'
import { useAllPlugins } from './plugins/index'
import App from './App.vue'


const app = createApp(App)
useAllPlugins(app)
app.mount('#app')
