<template>
<div class="display-block">
    <ul v-infinite-scroll="likeLoad" :infinite-scroll-disabled="like.loading || like.noMore" class="list">
        <li v-for="(item, index) in likeList" class="list-item">
            <el-card class="card">
                <el-row>
                    <el-col :span="22"><span class="title">{{ `${item.name}(${item.year})` }}</span></el-col>
                    <el-col :span="2">
                        <el-popconfirm
                          confirm-button-text="确定"
                          cancel-button-text="取消"
                          confirm-button-type="danger"
                          title="是否从收藏夹中删除这部电影?"
                          @confirm="confirm(item.id, index)"
                        >
                            <template #reference>
                                <Delete />
                            </template>
                        </el-popconfirm>
                    </el-col>
                </el-row>
                
                <el-image :src="item.img" />
            </el-card>
        </li>
    </ul>  
    <p v-if="like.loading" class="tips">加载中...</p>
    <p v-if="like.noMore" class="tips">已经到底了</p>      
</div>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Delete } from '@icon-park/vue-next';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import { useStore } from 'vuex';

const store = useStore()

// 每一个展示列表的属性
interface DisplayStruct {
    loading: boolean, // 加载中
    noMore: boolean, // 是否没有更多
    nextPage: number // 下一页页码
}

interface Movie {
    id: number,
    name: string,
    year: number,
    rating: number,
    img: string,
    desc: string
}

const likeList = ref<Movie[]>([])

// 喜欢列表
const like = ref<DisplayStruct>({
    loading: false,
    noMore: false,
    nextPage: 1
})

// 获取更多喜欢的项目
const likeLoad = () => {
    if(!store.state.account.login) {
        ElMessage("您未登录,请先登录")
        return
    }
    like.value.loading = true
    /*
    1. 设置loading
    2. axios获取数据
    3. 回调中将获取到的信息合并到原列表，一次6个
    4. 回调中loading修改为false
    5. 接收到未登录的错误/其他错误则弹出ElMessage
    */
    axios({
        method: 'get',
        url: '/movie/like/list',
        params: {
            like: 1,
            size: 6,
            page: like.value.nextPage
        }
    })
    .then((res) => {
        if(res.data.status === 0) {
            let array = res.data.data.list
            array.forEach((movie: { id: any; name: any; year: any; rating: any; img: any; desc: any; }) => {
                likeList.value.push({
                    id: movie.id,
                    name: movie.name,
                    year: movie.year,
                    rating: movie.rating,
                    img: movie.img,
                    desc: movie.desc
                })
            })
            like.value.nextPage++
            like.value.noMore = res.data.data.nomore
        } else {
            ElMessage(res.data.msg)
            like.value.noMore = true
        }
    })
    .finally(() => {
        like.value.loading = false
    })
}

const confirm = (movieID: number, index: number) => {
    // axios将该项目喜欢值修改为0
    // 成功则在likeList中移除该项目
    axios({
        method: 'post',
        url: `/movie/${movieID}/like`,
        data: {like: 0},
        headers: {
        'Content-Type': 'application/json'
        },
    })
    .then((res) => {
        if(res.status === 0) {
            likeList.value = likeList.value.splice(index, 1)
            ElMessage("修改成功")
        } else {
            ElMessage("修改失败")
        }
    })
    
}


</script>

<style scoped>
.list {
  height: 70vh;
  list-style: none;
  padding: 0;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.list-item {
  display: flex;
  align-items: center;
  justify-content: center;
}
.card {
    height: 270px;
    width: 190px;
    margin: 20px 30px 20px 30px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tips {
    width: 80%;
    text-align: center;
    position: fixed;
    bottom: 10px;
}
.title {
    overflow: hidden;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
/*
@keyframes shake {
    0% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(-3deg);
    }
    50% {
        transform: rotate(0deg);
    }
    75% {
        transform: rotate(3deg);
    }    
    100% {
        transform: rotate(0deg);
    }
}

.shake {
    animation-name: shake;
    animation-delay: 30ms;
    animation-duration: .25s;
    animation-iteration-count: infinite;
}
*/
</style>