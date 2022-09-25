import { createApp } from 'vue'
import App from './App.vue'
import router from './utils/router'
import store from './utils/vuex'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
