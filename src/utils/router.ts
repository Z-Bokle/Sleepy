import * as VueRouter from 'vue-router';
import MovieDB from '../components/MainViewComp/MovieDB/MovieDB.vue'
import MovieDetail from '../components/MainViewComp/MovieDetail/MovieDetail.vue'
import MovieCollections from '../components/MainViewComp/Collections/MovieCollections.vue'
import PersonCollections from '../components/MainViewComp/Collections/PersonCollections.vue'
import PersonDB from '@/components/MainViewComp/PersonDB/PersonDB.vue';
import PersonDetail from '../components/MainViewComp/PersonDetail/PersonDetail.vue';
import Suggest from '@/components/MainViewComp/Suggest/Suggest.vue';
import Persona from '@/components/MainViewComp/Persona/Persona.vue';

const routes = [
    {path: '/', redirect: '/suggest'},
    {path: '/moviedb', component: MovieDB, meta:{title: '电影筛选'}, name: 'MovieDB'},
    {path: '/moviedb/details', redirect: '/moviedb'},
    {path: '/moviedb/details/:movieid(\\d+)', component: MovieDetail, meta:{title: '电影数据库'}, name: 'MovieDetail'},
    {path: '/collections/movie', component: MovieCollections, meta:{title: '电影收藏夹'}, name: 'MovieCollections'},
    {path: '/collections/person', component: PersonCollections, meta:{title: '影人收藏夹'}, name: 'PersonCollections'},
    {path: '/persondb', component: PersonDB, meta:{title: '影人筛选'}, name: 'PersonDB'},
    {path: '/persondb/details', redirect: '/persondb'},
    {path: '/persondb/details/:personid(\\d+)', component: PersonDetail, meta:{title: '影人数据库'}, name: 'PersonDetail'},
    {path: '/suggest', component: Suggest, meta:{title: '猜你喜欢'}, name: 'Suggest'},
    {path: '/persona', component: Persona, meta:{title: '用户画像'}, name: 'Persona'}
]

const router = VueRouter.createRouter({
    history:VueRouter.createWebHashHistory(),
    routes:routes
})

export default router;