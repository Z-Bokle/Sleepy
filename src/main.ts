import { createApp } from 'vue'
import App from './App.vue'
import router from './utils/router'
import store from './utils/vuex'
import 'element-plus/theme-chalk/dark/css-vars.css'
import "element-plus/theme-chalk/el-message.css";

import '@icon-park/vue-next/styles/index.css';

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
