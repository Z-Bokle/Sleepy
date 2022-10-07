import * as VueRouter from 'vue-router';
import HomePage from '../components/MainViewComp/HomePage.vue'
import MovieDB from '../components/MainViewComp/MovieDB/MovieDB.vue'
import MovieDetail from '../components/MainViewComp/MovieDetail/MovieDetail.vue'
import Collections from '@/components/MainViewComp/Collections/Collections.vue'
const routes = [
    {path: '/', component: HomePage},
    {path: '/moviedb', component: MovieDB},
    {path: '/moviedb/details', redirect: '/moviedb'},
    {path: '/moviedb/details/:movieid(\\d+)', component: MovieDetail},
    {path: '/collections', component: Collections}
]

const router = VueRouter.createRouter({
    history:VueRouter.createWebHashHistory(),
    routes:routes
})

export default router;