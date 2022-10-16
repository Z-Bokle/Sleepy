<template>
    <el-icon :size="25" v-if="route.fullPath === '/moviedb'" @click="drawerVisible = true" class="icon"><Filter /></el-icon>  
    <el-drawer v-model="drawerVisible" direction="ttb" size="50%" title="电影筛选" @open="init()">
        <el-form label-width="100px" label-position="left">
            <el-form-item label="国家/地区">
                <el-select
                    v-model="form.countries"
                    multiple
                    placeholder="请选择国家/地区"
                >
                    <el-option 
                        v-for="country in countries" 
                        :key="country.value"
                        :label="country.label"
                        :value="country.value"
                        />
                </el-select>
            </el-form-item>
            <el-form-item label="类型">
                <el-select
                    v-model="form.genres"
                    multiple
                    placeholder="请选择类型"
                >
                    <el-option 
                        v-for="genre in genres" 
                        :key="genre.value"
                        :label="genre.label"
                        :value="genre.value"
                        />
                </el-select>
            </el-form-item>
            <el-form-item label="年份">
                <el-slider v-model="form.movieYear" range show-stops :min="1900" :max="(new Date()).getFullYear()" :marks="marks" />
            </el-form-item>
        </el-form>

        <template #footer>
            <el-button @click="reset()">重置</el-button>
            <el-button type="primary" @click="confirm()">确认</el-button>
        </template>
    </el-drawer>
</template>

<script lang="ts" setup>
import { Filter } from '@icon-park/vue-next';
import axios from 'axios';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute()
const router = useRouter()

const store = useStore()

const drawerVisible = ref(false)

const marks = ref<Record<number, string>>({
    1900: '1900',
    1910: '1910',
    1920: '1920',
    1930: '1930',
    1940: '1940',
    1950: '1950',
    1960: '1960',
    1970: '1970',
    1980: '1980',
    1990: '1990',
    2000: '2000',
    2010: '2010',
    2020: '2020',
    2030: '2030',
})

const countries = ref([
    {
        value: 1,
        label: '国家1'
    },
    {
        value: 2,
        label: '国家2'
    }
])
const genres = ref([
    {
        value: 2,
        label: '类型2'
    },
    {
        value: 3,
        label: '类型3'
    }
])

// 从接口获取所有键值对
axios({
    method: 'get',
    url: '/movie/countries'
})
.then((res) => {
    return res.data.countries;
})
.then((array) => {
    array.forEach((element: { id: any, name: any }) => {
        countries.value.push({
            value: element.id,
            label: element.name
        })
    });
})

axios({
    method: 'get',
    url: '/movie/genres'
})
.then((res) => {
    return res.data.genres;
})
.then((array) => {
    array.forEach((element: { id: any, name: any }) => {
        genres.value.push({
            value: element.id,
            label: element.name
        })
    });
})

// 从vuex获取现有表单信息
const form = ref<{
    countries: number[], 
    genres: number[],
    movieYear: [number, number]
}>({
    countries: store.state.movieFilter.countries,
    genres: store.state.movieFilter.genres,
    movieYear: store.state.movieFilter.movieYear
})

const init = () => {
    form.value.countries = store.state.movieFilter.countries
    form.value.genres = store.state.movieFilter.genres,
    form.value.movieYear = store.state.movieFilter.movieYear
}

const reset = () => {
    store.commit('resetMovieFilter')
    drawerVisible.value = false
    // 重新加载MovieItem的数据
}

const confirm = () => {
    store.commit('setMovieFilter', form.value)
    drawerVisible.value = false
    // 重新加载MovieItem的数据
}

</script>

<style scoped>
.icon{
    margin-right: 16px;
}
</style>