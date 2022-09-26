import { createStore } from'vuex'

const store = createStore({
    state() {
        return {
            account: {
                // 用户信息
                user: {
                    uid: undefined,
                    name: undefined,
                    email: undefined
                },
                // 是否已登录
                login: false
            }
        }
    },
    getters: {
        getUserDesc: (state) => () => {
            const user = state.account.user
            if(state.account.login === false)
                return `未登录`
            else
                return `uid: ${user.uid} \n用户名: ${user.name} \n邮箱: ${user.email}`
        },
        getUserGreeting: (state) => () => {
            const user = state.account.user
            if(state.account.login === false)
                return '未登录，点我登录'
            else
                return `您好,${user.name}`
        }
    },
    mutations: {
        login: (state, user) => {
            state.account.login = true
            state.account.user = user
        },
        logout: (state) => {
            state.account.login = false
            state.account.user = {
                uid: undefined,
                name: undefined,
                email: undefined
            }
        }
    }
})
export default store;