<template>
  <div class="home-container">
    <div class="home-bar">
      <div
        class="bar-item"
        :class="{ active: item.id === currentHomeBar }"
        v-for="item in homeBarList"
        :key="item.id"
        @click="clickBarItem(item.id)"
      >
        {{ item.name }}
      </div>
    </div>
    <GameListComp class="home-list" :gameList="gameListRef" />
    <Pagination :page="currentPage" :limit="limitRef" :total="totalRef" :pageNum="5" @change-page="changePage" />
  </div>
</template>

<script setup>
  // 导入vue的相关函数
  import { ref } from 'vue' // 导入vue的ref函数
  import { getHomeBar } from '@/api/index' // 导入获取主页栏和游戏列表的api函数
  import { idSearch } from '@/compositions/idSearch'
  import GameListComp from '@/components/GameListComp/index.vue' // 导入游戏列表组件
  import Pagination from '@/components/Pagination/index.vue' // 导入分页组件
  // 使用vuex的store
  const homeBarList = ref([]) // 定义主页栏列表的响应式引用
  const currentHomeBar = ref('') // 定义当前主页栏的响应式引用
  const currentPage = ref(1) // 定义当前页的响应式引用
  const limitRef = ref(15) // 定义每页显示数量的响应式引用
  const totalRef = ref(0) // 定义总数的响应式引用
  const gameListRef = ref([]) // 定义游戏列表的响应式引用
  const { getGameListByIdFunc } = idSearch(currentHomeBar, currentPage, limitRef, totalRef, gameListRef)
  async function getHomeBarList() {
    // 定义获取主页栏列表的异步函数
    const { data = [] } = await getHomeBar() // 调用api函数获取主页栏数据
    homeBarList.value = data // 更新主页栏列表
    data.length > 0 && (currentHomeBar.value = data[0].id) // 如果有数据，设置当前主页栏为第一个
    getGameListByIdFunc() // 调用获取游戏列表的函数
  }
  function clickBarItem(id) {
    // 定义点击主页栏项的函数
    currentPage.value = 1 // 设置当前页为1
    currentHomeBar.value = id // 设置当前主页栏为点击的项
    getGameListByIdFunc() // 调用获取游戏列表的函数
  }
  function changePage(page) {
    // 定义改变页数的函数
    currentPage.value = page // 设置当前页为传入的页数
    getGameListByIdFunc() // 调用获取游戏列表的函数
  }
  getHomeBarList() // 调用获取主页栏列表的函数
</script>

<style lang="scss" scoped>
  .home-container {
    .title {
      text-align: center;
    }

    .home-bar {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .bar-item {
        height: 33px;
        min-width: 76px;
        margin-top: 8px;
        margin-bottom: 5px;
        margin-left: 5px;
        font-size: 15px;
        font-weight: bold;
        line-height: 33px;
        text-align: center;
        cursor: pointer;
        border-radius: 2.67px;

        &.active {
          color: #fff;
          background-color: #f7b500;
        }
      }
    }

    .home-list {
      background-color: #44d7b6;
    }
  }
</style>
