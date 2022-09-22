import * as VueRouter from 'vue-router';
import MovieDB from '../components/MainViewComp/MovieDB/MovieDB.vue'

const routes = [
    {path: '/', redirect: '/moviedb'},
    {path: '/moviedb', component: MovieDB},
    {path: '/moviedb/details', redirect: '/moviedb'},
    {path: '/moviedb/details/:movieid'}
]

const router = VueRouter.createRouter({
    history:VueRouter.createWebHashHistory(),
    routes:routes
})

export default router;