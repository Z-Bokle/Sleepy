<template>
    <el-icon :size="25" v-if="route.fullPath === '/moviedb'" @click="drawerVisible = true" class="icon"><Filter /></el-icon>  
    <el-drawer v-model="drawerVisible" direction="ttb" size="65%" title="电影筛选" @open="init()">
        <el-form label-width="100px" label-position="left">
            <el-form-item label="国家/地区">
                <el-select
                    v-model="form.countries"
                    multiple
                    filterable 
                    :multiple-limit="3"
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
                    filterable 
                    :multiple-limit="3"
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

            <el-form-item label="排序方式">
                <el-radio-group v-model="form.sortby">
                    <el-radio-button label="default">默认</el-radio-button>
                    <el-radio-button label="rate">评分最高</el-radio-button>
                    <el-radio-button label="yeardnc">年份最早</el-radio-button>
                    <el-radio-button label="yeariec">年份最晚</el-radio-button>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="年份区间">
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

const countries = ref<{
    value: number;
    label: string;
}[]>([])

const genres = ref<{
    value: number;
    label: string;
}[]>([])

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
    movieYear: [number, number],
    sortby: string
}>({
    countries: store.state.movieFilter.countries,
    genres: store.state.movieFilter.genres,
    movieYear: store.state.movieFilter.movieYear,
    sortby: store.state.movieFilter.sortby
})

const init = () => {
    form.value.countries = store.state.movieFilter.countries
    form.value.genres = store.state.movieFilter.genres,
    form.value.movieYear = store.state.movieFilter.movieYear
    form.value.sortby = store.state.movieFilter.sortby
}

const reset = () => {
    drawerVisible.value = false
    store.commit('resetMovieFilter') // 重置vuex中的表单信息
}

const confirm = () => {
    drawerVisible.value = false
    store.commit('setMovieFilter', form.value) // 设置vuex中的表单信息
}

</script>

<style scoped>
.icon{
    margin-right: 16px;
}
</style>