import * as VueRouter from 'vue-router';
import HomePage from '../components/MainViewComp/HomePage.vue'
import MovieDB from '../components/MainViewComp/MovieDB/MovieDB.vue'
import MovieDetail from '../components/MainViewComp/MovieDetail/MovieDetail.vue'
const routes = [
    {path: '/', component: HomePage},
    {path: '/moviedb', component: MovieDB},
    {path: '/moviedb/details', redirect: '/moviedb'},
    {path: '/moviedb/details/:movieid', component: MovieDetail}
]

const router = VueRouter.createRouter({
    history:VueRouter.createWebHashHistory(),
    routes:routes
})

export default router;