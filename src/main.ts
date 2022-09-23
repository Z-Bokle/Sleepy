import { createApp } from 'vue'
import { createStore } from'vuex'
import App from './App.vue'
import router from './utils/router'
import 'element-plus/theme-chalk/dark/css-vars.css'

const store = createStore({

})

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
