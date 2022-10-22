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
            },
            movieFilter: {
                // 电影列表筛选表单
                movieYear: [1900, (new Date()).getFullYear()],
                genres: [],
                countries: [],
                sortby: 'default'
            }
        }
    },
    getters: {
        // 获取用户简介
        getUserDesc: (state) => () => {
            const user = state.account.user
            if(state.account.login === false)
                return `未登录`
            else
                return `uid: ${user.uid} \n用户名: ${user.name} \n邮箱: ${user.email}`
        },
        // 获取用户的问候语
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
        },
        resetMovieFilter: (state) => {
            state.movieFilter.countries = []
            state.movieFilter.genres = []
            state.movieFilter.movieYear = [1900, (new Date()).getFullYear()]
            state.movieFilter.sortby = 'default'
        },
        setMovieFilter: (state, filter) => {
            // 浅拷贝，为了防止watch的deep直接监听到filter而非state.movieFilter
            state.movieFilter.countries = filter.countries
            state.movieFilter.genres = filter.genres
            state.movieFilter.movieYear = filter.movieYear
            state.movieFilter.sortby = filter.sortby
        }
    }
})
export default store;