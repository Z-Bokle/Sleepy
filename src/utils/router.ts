import * as VueRouter from 'vue-router';
import HomePage from '../components/MainViewComp/HomePage.vue'
import MovieDB from '../components/MainViewComp/MovieDB/MovieDB.vue'
import MovieDetail from '../components/MainViewComp/MovieDetail/MovieDetail.vue'
import Collections from '@/components/MainViewComp/Collections/Collections.vue'
import PersonDB from '@/components/MainViewComp/PersonDB/PersonDB.vue';
import PersonDetail from '../components/MainViewComp/PersonDetail/PersonDetail.vue';

const routes = [
    {path: '/', component: HomePage, meta:{title: '主页'}},
    {path: '/moviedb', component: MovieDB, meta:{title: '电影筛选'}},
    {path: '/moviedb/details', redirect: '/moviedb'},
    {path: '/moviedb/details/:movieid(\\d+)', component: MovieDetail, meta:{title: '电影数据库'}},
    {path: '/collections', component: Collections, meta:{title: '收藏夹'}},
    {path: '/persondb', component: PersonDB, meta:{title: '影人筛选'}},
    {path: '/persondb/details', redirect: '/persondb'},
    {path: '/persondb/details/:personid(\\d+)', component: PersonDetail, meta:{title: '影人数据库'}}
]

const router = VueRouter.createRouter({
    history:VueRouter.createWebHashHistory(),
    routes:routes
})

export default router;