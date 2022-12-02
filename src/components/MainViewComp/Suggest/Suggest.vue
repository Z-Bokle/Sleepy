<template>
    <div class="header">
        <span v-if="store.state.account.login">根据您的喜好，为您推荐以下电影:</span>
        <span v-else>您暂未登录，无法为您推荐!</span>
    </div>
    <div class="cards" v-if="store.state.account.login">
        <suggest-card :movie="movie" v-for="movie in movies" class="card-item"></suggest-card>
    </div>
    
</template>

<script lang="ts" setup>
import axios from "axios";
import { ref } from "vue";
import { useStore } from "vuex";
import SuggestCard from "./SuggestCard.vue";

const store = useStore()

interface Movie {
    id: number,
    name: string,
    img: string,
    year: number,
    rating: number,
    tags: string[],
    desc: string,
    genre: {id: number, name: string}[],
    country: {id: number, name: string}[]
}

const movies = ref<Movie[]>()


axios({
    method: 'get',
    url: '/suggest',
})
.then((res) => {
    movies.value = res.data.data
    console.log(res.data.data)
})

</script>

<style scoped>
@font-face {
    font-family: 'MiSans';
    src: url('../../../assets/fonts/MiSans-Normal.ttf');
}
@font-face {
    font-family: 'MiSans-SemiBold';
    src: url('../../../assets/fonts/MiSans-SemiBold.ttf');
}
.header {
    font-size: xx-large;
    font-family: MiSans;
}
.cards {
    max-height: 73vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
}
</style>