import { createStore } from'vuex'
const store = createStore({
    state() {
        return {
            // 用于向后端发送请求的url前缀，末尾不带'/'
            urlPrefix:''
        }
    }
})
export default store;