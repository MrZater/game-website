<template>
  <div class="game-container">
    <iframe v-if="gameUrlRef && showFrame" :src="gameUrlRef" frameborder="0"></iframe>
    <GameDrawer :game-id="gameId" />
  </div>
  <ReadyComp @toload="toload" />
</template>

<script setup>
  // 导入vue的reactive, ref, onMounted, onUnmounted
  import { reactive, ref, onUnmounted } from 'vue'
  // 导入vue-router的useRoute
  import { useRoute } from 'vue-router'
  // 导入api中的userAct
  import { userAct } from '@/api/index'
  import { getGameInfo } from '@/api/index'
  import GameDrawer from '@/components/GameDrawer/GameDrawer.vue'
  import ReadyComp from '@/components/ReadyComp/index.vue'
  // 使用reactive包装useRoute
  const route = reactive(useRoute())
  // 获取游戏URL
  const gameUrlRef = ref('')
  // 获取游戏ID
  const gameId = route.query.id
  // 初始化计数器
  let count = 0
  // 设置预设时间
  const preTime = 60 * 1000
  // 设置定时器，每隔预设时间执行一次reported函数
  const timeId = setInterval(reported, preTime)
  const showFrame = ref(false)
  // 定义reported函数
  function reported() {
    // 计数器加一
    count++
    // 调用userAct函数，发送'playing'，'play'，gameId，preTime * count
    userAct('playing', 'play', gameId, preTime * count)
  }
  // 当组件卸载时，清除定时器
  onUnmounted(() => {
    clearInterval(timeId)
  })
  // 获取游戏信息
  async function getGameInfoFunc(id) {
    const { data } = await getGameInfo(id)
    gameUrlRef.value = data.url
  }
  // 接收通知，页面加载iframe
  function toload() {
    showFrame.value = true
  }
  getGameInfoFunc(gameId)
</script>

<style lang="scss" scoped>
  .game-container {
    z-index: -10000;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  iframe {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
  }
</style>
