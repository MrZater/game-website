<template>
  <div class="drawer-container" :class="{ expand: isExpand }">
    <div class="drawer-btn" @click="isExpand = !isExpand">
      <svg-icon name="expand" color="#fff" class="svg-icon"></svg-icon>
    </div>
    <div class="drawer-title">Popular Games</div>
    <div class="drawer-content">
      <div class="btn-box">
        <button class="btn-item" @click="goSearch(item)" v-for="item in btnList" :key="item.id">{{ item.name }}</button>
      </div>
      <div class="game-list">
        <div class="game-item" @click="goDetail(item.id)" v-for="item in recommendGames" :key="item.id">
          <img :src="item.icon" alt="" />
          <p>{{ item.name }}</p>
        </div>
      </div>
      <button class="show-dialog" @click="changeShowDialog(true)">Do not sell my Data</button>
    </div>
  </div>
  <div class="drawer-model" @click="isExpand = !isExpand" v-if="isExpand"></div>
</template>

<script setup>
  import { ref, inject } from 'vue'
  import { getSuggestGames, getHomeBar } from '@/api/index'
  import { useRouter } from 'vue-router'
  // 定义props，包含gameId属性
  const props = defineProps({
    gameId: {
      default: '',
      type: [String, Number]
    }
  })
  // 使用vue-router的useRouter函数
  const router = useRouter()
  // 定义推荐游戏的响应式引用
  const recommendGames = ref([{}, {}, {}, {}, {}])
  // 定义主页栏列表的响应式引用
  const btnList = ref([])
  // 定义是否展开的响应式引用
  const isExpand = ref(false)
  // 定义获取推荐游戏的异步函数
  async function getSuggestGamesFunc() {
    const { data = [] } = await getSuggestGames({
      gameId: props.gameId,
      num: 6
    })
    // 更新推荐游戏的值
    recommendGames.value = data
  }
  // 定义获取主页栏列表的异步函数
  async function getBtnList() {
    const { data = [] } = await getHomeBar()
    // 更新主页栏列表的值
    btnList.value = data
  }
  // 定义跳转搜索结果的函数
  function goSearch(item) {
    router.push({
      name: 'Result',
      query: {
        key: item.id,
        type: 2,
        name: item.name
      }
    })
  }
  // 定义跳转详情页的函数
  function goDetail(id) {
    router.push({
      name: 'Exhibition',
      query: { id }
    })
  }
  // 从父组件注入changeShowDialog函数
  const changeShowDialog = inject('changeShowDialog')
  // 调用获取主页栏列表的函数
  getBtnList()
  // 调用获取推荐游戏的函数
  getSuggestGamesFunc()
</script>

<style lang="scss" scoped>
  .drawer-container {
    position: relative;
    top: 118px;
    right: -100%;
    z-index: 200;
    display: flex;
    width: 264px;
    height: 426px;
    background-color: #fff;
    box-sizing: border-box;
    transition: all .3s;
    flex-direction: column;

    &.expand {
      transform: translate(calc(-100% - 20px), 0);
    }

    .drawer-title {
      height: 48.33px;
      font-size: 12.12px;
      line-height: 48.33px;
      color: #4c4c4c;
      text-align: center;
      white-space: .29px;
      background: #fff;
    }

    .drawer-content {
      display: flex;
      height: 0;
      background-color: #27a186;
      flex-grow: 1;
      flex-direction: column;
      align-items: center;

      .btn-box {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin-bottom: 10px;

        .btn-item {
          width: 242px;
          height: 22.8px;
          max-width: 100%;
          margin-top: 10px;
          color: #ff8e12;
          text-align: center;
          background-color: #fff;
          border: none;
          border-radius: 2px;
        }
      }

      .game-list {
        $mx: 2.5px;

        position: relative;
        display: flex;
        padding: 0 $mx;
        flex-wrap: wrap;

        .game-item {
          position: relative;
          width: calc((100% - 8 * $mx) / 3);
          margin: 3px $mx 3px $mx;
          box-sizing: border-box;

          img {
            width: 100%;
            height: 82.21px;
            border-radius: 2.67px;
          }

          p {
            width: 100%;
            overflow: hidden;
            font-size: 8.48px;
            color: #fff;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }

      .show-dialog {
        width: 210px;
        height: 28px;
        margin-top: 10px;
        color: #fff;
        text-align: center;
        background-color: #f7b500;
        border: none;
        border-radius: 2px;
      }
    }

    .drawer-btn {
      position: absolute;
      left: -23px;
      display: flex;
      width: 21px;
      height: 21px;
      background-color: #7b7d7e;
      border-radius: 6.33px;
      box-sizing: border-box;
      justify-content: center;
      align-items: center;

      .svg-icon {
        width: 18px;
        height: 18px;
      }
    }
  }

  .drawer-model {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100vw;
    height: 100vh;
    background-color: rgb(0 0 0 / 70%);
  }
</style>
