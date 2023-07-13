<template>
  <div class="result-title">Popular Games</div>
  <div class="search-wrapper" v-if="+searchType === 1">
    <div class="title">Search:</div>
    <div class="search-input">
      <svg-icon class="svg-icon" color="#fff" name="search"></svg-icon>
      <input type="text" placeholder="Search for a game" v-model="searchKey" />
    </div>
    <button class="search-btn" @click="handleSearch">Search</button>
  </div>
  <div class="tab-wrapper" v-else>
    {{ searchName }}
  </div>
  <GameListComp class="search-list" :gameList="gameListRef" />
  <Pagination :page="pageRef" :limit="limitRef" :total="totalRef" :pageNum="5" @change-page="changePage" />
</template>

<script setup>
import { useRouter } from 'vue-router'
import { watch, ref } from 'vue'
import { keySearch } from '@/compositions/keySearch'
import { idSearch } from '@/compositions/idSearch'
import GameListComp from '@/components/GameListComp/index.vue' // 导入游戏列表组件
import Pagination from '@/components/Pagination/index.vue' // 导入分页组件
const route = useRouter() // 使用useRouter函数获取路由实例
const searchType = ref('') // 创建一个响应式变量searchType，初始值为空字符串
const searchKey = ref('') // 创建一个响应式变量searchKey，初始值为空字符串
const searchName = ref('') // 创建一个响应式变量searchName，初始值为空字符串
const { gameListRef, getGameListByKeyFunc, totalRef, pageRef, limitRef } = keySearch(searchKey) // 使用keySearch函数获取gameListRef、getGameListByKeyFunc、totalRef、pageRef和limitRef
const { getGameListByIdFunc } = idSearch(searchKey, pageRef, limitRef, totalRef, gameListRef) // 使用idSearch函数获取getGameListByIdFunc
watch(
  () => route,
  async val => {
    // 监听route的变化
    pageRef.value = 1 // 将pageRef的值设置为1
    searchType.value = val.currentRoute.value.query?.type // 将searchType的值设置为当前路由的type参数
    searchKey.value = val.currentRoute.value.query?.key // 将searchKey的值设置为当前路由的key参数
    if (+searchType.value === 2) {
      // 如果searchType的值为2
      searchName.value = val.currentRoute.value.query?.name // 将searchName的值设置为当前路由的name参数
      getGameListByIdFunc() // 调用getGameListByIdFunc函数
    }
    else {
      // 否则
      getGameListByKeyFunc() // 调用getGameListByKeyFunc函数
    }
  },
  {
    immediate: true, // 立即执行
    deep: true, // 深度监听
  },
)
function changePage(page){
  // 定义changePage函数，接收一个参数page
  pageRef.value = page // 将pageRef的值设置为参数page的值
  if (+searchType.value === 1) {
    // 如果searchType的值为1
    getGameListByKeyFunc() // 调用getGameListByKeyFunc函数
  }
  else if (+searchType.value === 2) {
    // 如果searchType的值为2
    getGameListByIdFunc() // 调用getGameListByIdFunc函数
  }
}
function handleSearch(){
  // 定义handleSearch函数
  pageRef.value = 1 // 将pageRef的值设置为1
  changePage(1) // 调用changePage函数，传入参数1
}
</script>

<style lang="scss" scoped>
  .result-title {
    margin: 10px 12px;
    font-size: 18px;
    line-height: 40px;
    text-align: center;
  }

  .search-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      width: 100vw;
      padding-left: 19px;
      margin-top: 8px;
      font-size: 12.67px;
      box-sizing: border-box;
    }

    .search-input {
      position: relative;
      display: flex;
      width: calc(100vw - 12.67px * 2);
      min-height: 33.33px;
      padding: 0 10px;
      margin-top: 8.33px;
      background-color: #fff;
      border: .33px solid #f7b500;
      border-radius: 2.67px;
      box-sizing: border-box;
      justify-content: flex-start;
      align-items: center;

      .svg-icon {
        width: 20px;
        height: 20px;
      }

      input {
        width: 100%;
        height: 28px;
        padding: 0 5px;
        border: none;
        outline: none;

        &::placeholder {
          font-size: 12.67px;
          line-height: 28px;
          color: #cfcfcf;
        }
      }
    }

    .search-btn {
      width: 305px;
      min-height: 32.67px;
      margin: 18.67px 0;
      font-size: 13.33px;
      color: #fff;
      background-color: #f7b500;
      border: none;
      border-radius: 13.33px;
    }
  }

  .tab-wrapper {
    margin: 10px 12px;
    font-size: 18px;
    line-height: 40px;
    border-bottom: .33px solid #b2b4b4;
  }

  .search-list {
    background-color: #44d7b6;
  }
</style>
