<template>
  <div :key="key" class="detail-container">
    <!-- head -->
    <div class="detail-head" :class="{ exhibition: !isDetail }">
      <div class="game-icon">
        <img :key="gameInfo.name" v-lazys="gameInfo.icon" :alt="gameInfo.name" />
      </div>
      <span>{{ gameInfo.name }}</span>
      <div v-if="!isDetail" @click="goDetail" class="exhibition-btn">play now</div>
      <div v-if="isDetail" class="detail-head-bc"></div>
    </div>
    <!-- detail页 描述 -->
    <div v-if="isDetail" class="detail-content">
      <h3>Game Introduction</h3>
      <span v-html="gameInfo.desc"></span>
    </div>
    <!-- detail页跳转 -->
    <div v-if="isDetail" @click="goPlay" class="detail-btn">
      <span>play now<span class="go-run">>>></span></span>
    </div>
    <!-- 推荐 -->
    <div class="recommend-games">
      <div class="recommend-title">You can try these games below</div>
      <GameListComp :gameList="recommendGames" :routeName="isDetail ? 'detail2' : 'detail1'" />
    </div>
    <!-- back -->
    <div @click="goBack" class="fixed-back">BACK</div>
  </div>
</template>

<script setup>
  import { watch, ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { userAct, getGameInfo, getSuggestGames } from '@/api/index'
  import GameListComp from '@/components/GameListComp/index.vue'
  const recommendGames = ref([{}, {}, {}, {}, {}]) // 推荐游戏列表
  const route = useRouter() // 路由
  const isDetail = ref(route.currentRoute.value.name === 'Detail') // 判断是否为详情页
  let gameInfo = reactive({}) // 当前游戏详情
  const key = ref('') // 游戏详情的key
  watch(
    () => route,
    async (val) => {
      // 监听路由变化
      isDetail.value = route.currentRoute.value.name === 'Detail' // 判断是否为详情页
      const gameId = val.currentRoute.value.query?.id // 获取游戏id
      getGameInfoFunc(gameId) // 获取游戏详情
      getSuggestGamesFunc(gameId) // 获取推荐游戏
    },
    {
      immediate: true,
      deep: true
    }
  )
  const goBack = () => {
    // 返回首页
    userAct('back', isDetail.value ? 'detail2' : 'detail1', gameInfo.id) // 用户行为上报
    scrollTo(0, 0) // 滚动到页面顶部
    route.push({ name: 'Home' }) // 跳转到首页
  }
  const goPlay = () => {
    // 点击开始游戏
    // play2点击上报
    userAct('play2', 'detail2', gameInfo.id) // 用户行为上报
    route.push({
      // 跳转到游戏页面
      name: 'Game',
      query: { id: gameInfo.id }
    })
  }
  const goDetail = () => {
    // 跳转到详情页
    // play1点击上报
    userAct('play1', 'detail1', gameInfo.id) // 用户行为上报
    scrollTo(0, 0) // 滚动到页面顶部
    route.push({
      // 跳转到详情页
      name: 'Detail',
      query: { id: gameInfo.id }
    })
  }
  async function getGameInfoFunc(id) {
    // 获取游戏详情
    const { data = {} } = await getGameInfo(id) // 调用API获取游戏详情
    gameInfo = reactive(data) // 将游戏详情设置为响应式对象
    key.value = gameInfo.id // 设置游戏详情的key
  }
  async function getSuggestGamesFunc(id) {
    // 获取推荐游戏
    const { data = [] } = await getSuggestGames({
      // 调用API获取推荐游戏列表
      gameId: +id,
      num: 9
    })
    recommendGames.value = data // 设置推荐游戏列表
  }
</script>

<style lang="scss" scoped>
  $base-width: 333.33px;
  // 基础圆角度
  $base-radius: 33.67px;
  // x方向上的padding
  $paddingx: 13.33px;
  // 按钮border的宽度
  $btn-border-width: 2.27px;
  // 按钮的边框颜色
  $btn-border-color: #fcd481;
  // 按钮的背景色
  $btn-background-color: #feee7d;
  // 按钮的文字颜色
  $btn-font-color: #d66200;
  // margin10px
  $mt: 10px;

  @keyframes gorunning {
    0% {
      transform: translateX(0%);
    }

    100% {
      transform: translateX(40%);
    }
  }

  .detail-container {
    position: relative;
    padding: 16.67px $paddingx;
    background-color: #44d7b6;

    .detail-head {
      position: relative;
      display: flex;
      width: $base-width;
      height: 125px;
      background: #fff;
      border-radius: $base-radius;
      box-sizing: border-box;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &.exhibition {
        padding-left: 34.33px;
        align-items: flex-start;

        .exhibition-btn {
          position: absolute;
          right: 24.33px;
          width: 147.67px;
          height: 48.67px;
          font-size: 17.06px;
          line-height: 48px;
          color: $btn-font-color;
          text-align: center;
          background-color: $btn-background-color;
          border: $btn-border-width solid $btn-border-color;
          border-radius: 25.11px;
        }
      }

      .game-icon {
        position: relative;
        width: 77.33px;
        height: 77.33px;
        overflow: hidden;
        border-radius: 5px;
        box-sizing: border-box;

        img {
          width: 100%;
          height: 100%;
        }
      }

      span {
        margin-top: 5px;
        font-size: 11.67px;
        line-height: 20px;
        color: #333;
      }

      .detail-head-bc {
        position: absolute;
        right: $paddingx;
        width: 112px;
        height: 125px;
        background-image: url('../../assets/images/detail-b1.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 0 $base-radius $base-radius 0;
      }
    }

    .detail-content {
      position: relative;
      display: flex;
      width: $base-width;
      margin-top: $mt;
      // height: 148.67px;
      background-color: #269789;
      border-radius: $base-radius;
      flex-direction: column;

      h3 {
        height: 32px;
        padding-left: 16px;
        margin: 0 12px;
        font-size: 11.67px;
        line-height: 32px;
        color: #f1f1f1;
        border-bottom: 1px solid #44d7b6;
      }

      span {
        padding: 8px 16px 12px;
        font-size: 10px;
        line-height: 14px;
        color: #e6e6e6;
      }
    }

    .detail-btn {
      $btn-height: 48.67px;

      position: relative;
      width: $base-width;
      height: $btn-height;
      margin-top: $mt;
      text-align: center;
      background-color: $btn-background-color;
      border: $btn-border-width solid $btn-border-color;
      border-radius: $base-radius;
      box-sizing: border-box;

      span {
        font-size: 17.06px;
        font-weight: 600;
        line-height: calc($btn-height - 2 * $btn-border-width);
        color: $btn-font-color;

        .go-run {
          position: absolute;
          animation-duration: 1s;
          animation-iteration-count: infinite;
          animation-name: gorunning;
          animation-timing-function: linear;
        }
      }
    }

    .recommend-games {
      position: relative;
      display: flex;
      width: $base-width;
      margin-top: $mt;
      box-sizing: border-box;
      flex-wrap: wrap;

      .recommend-title {
        width: 100%;
        padding: 0 10px;
        font-size: 13.33px;
        font-weight: 600;
        color: #333;
      }
    }
  }

  .fixed-back {
    position: fixed;
    top: 24%;
    left: 0;
    width: 55px;
    height: 28px;
    font-size: 13.5px;
    line-height: 28px;
    color: #e6e6e6;
    text-align: center;
    background-color: #000;
    border-radius: 0 15px 15px 0;
    opacity: .7;
  }

  // 基础宽度 相对于设计稿
</style>

<style lang="scss">
  .detail-content {
    h2 {
      line-height: 20px;
    }
  }
</style>
