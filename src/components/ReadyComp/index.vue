<template>
  <div v-if="showReady" class="ready-container">
    <div
      class="bg"
      :style="{
        'background-image': `url(${gameInfo.icon})`
      }"
    ></div>
    <div class="ready-box">
      <img :key="gameInfo.icon" class="game-img" v-lazys="gameInfo.icon" alt="" />
      <div class="title">
        {{ gameInfo.name }}
      </div>
      <div class="desc" v-html="gameInfo.desc"></div>
      <div class="play-btn" @click="goPlay">
        <svg-icon class="svg-icon" :name="readyIcon" :class="{ rotate: readyIcon === 'loading' }"></svg-icon>
        {{ readyTitle }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getGameInfo } from '@/api/index'
const router = useRouter() // 使用vue-router的useRouter函数
const showReady = ref(true) // 创建一个响应式引用，初始值为true
const gameId = router.currentRoute.value.query?.id // 从当前路由中获取游戏ID
const gameInfo = reactive({
  // 创建一个响应式对象，用于存储游戏信息
  name: '',
  desc: '',
  icon: '',
})
const emits = defineEmits(['toload']) // 定义一个emits函数，用于触发'toload'事件
const readyTitle = ref('Play Game') // 创建一个响应式引用，初始值为'Play Game'
const readyIcon = ref('play') // 创建一个响应式引用，初始值为'play'
function goPlay(){
  // 定义一个函数，用于处理点击游戏按钮的逻辑
  readyTitle.value = 'Loading...' // 将readyTitle的值设置为'Loading...'
  readyIcon.value = 'loading' // 将readyIcon的值设置为'loading'
  setTimeout(() => {
    // 设置一个延时器
    showReady.value = false // 3秒后将showReady的值设置为false
  }, 3000)
  emits('toload') // 触发'toload'事件
}
async function getGameInfoFunc(id){
  // 定义一个异步函数，用于获取游戏信息
  const { data } = await getGameInfo(id) // 调用getGameInfo函数，获取游戏信息
  gameInfo.name = data.name // 将获取到的游戏名称赋值给gameInfo.name
  gameInfo.desc = data.desc.slice(0, 500) + '...' // 将获取到的游戏描述赋值给gameInfo.desc
  gameInfo.icon = data.icon // 将获取到的游戏图标赋值给gameInfo.icon
}
getGameInfoFunc(gameId) // 调用getGameInfoFunc函数，传入游戏ID
</script>

<style scoped lang="scss">
  $boxmargin: 25px;

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .ready-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999999999;
    min-height: 100vh;
    padding: $boxmargin;
    background-color: #fff;
    box-sizing: border-box;

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      filter: blur(10px);
    }

    .ready-box {
      position: relative;
      z-index: 999;
      display: flex;
      min-width: calc(100vw - $boxmargin * 2);
      min-height: calc(100vh - $boxmargin * 2);
      padding: 20px 0;
      background: rgb(255 255 255 / 60%);
      border-radius: 13.33px;
      box-shadow: 0 0 0 0 #fff, 10px 20px 21px rgb(0 0 0 / 40%);
      box-sizing: border-box;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .game-img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        // margin-top: -50px;
      }

      .title {
        margin: 20px 0;
        font-size: 20px;
        color: #000;
        text-align: center;
      }

      .desc {
        // display: -webkit-box;
        padding: 0 26px;
        overflow: hidden;
        font-size: 10px;
        text-align: center;
        // box-orient: vertical;
        // -webkit-line-clamp: 10;
      }

      .play-btn {
        width: 190px;
        height: 67px;
        margin-top: 30px;
        font-size: 20px;
        line-height: 67px;
        color: #fff;
        text-align: center;
        background: #101010;
        border-radius: 39px;

        .svg-icon {
          width: 20px;
          height: 20px;
          vertical-align: middle;

          &.rotate {
            animation: loading;
            animation-duration: 1.5s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
          }
        }
      }
    }
  }
</style>
