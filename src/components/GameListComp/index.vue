<template>
  <div class="game-list" v-if="gameListRef.length">
    <div class="game-item" @click="handleClickGame(game)" v-for="game in gameListRef" :key="game.id">
      <div class="img-box">
        <img v-lazys="game.icon" :alt="game.name" />
      </div>
      <div class="title">
        <span>{{ game.name }}</span>
      </div>
    </div>
  </div>
  <div class="empty" :style="{ background: props.emptyColor }" v-else>
    <div class="title">No matches</div>
    <div class="hint">Sorry, no games found! Try again.</div>
  </div>
</template>

<script setup>
  // 导入vue的相关函数
  import { getCurrentInstance, ref, watch, watchEffect } from 'vue'
  // 导入vuex的useStore函数
  import { userAct } from '@/api/index'
  const props = defineProps({
    // 需要传递的游戏列表
    gameList: {
      type: Array,
      default: () => []
    },
    // 上报需要的page参数
    routeName: {
      default: undefined,
      type: String
    },
    emptyColor: {
      default: '#fff',
      type: String
    }
  })
  const gameListRef = ref([])
  watchEffect(() => {
    gameListRef.value = props.gameList
  })

  // 获取当前实例的代理对象
  const { proxy } = getCurrentInstance()
  // 定义点击游戏的处理函数
  const handleClickGame = (game) => {
    // 游戏图标点击上报
    userAct('click', props.routeName, game.id)
    // 滚动到页面顶部
    scrollTo(0, 0)
    // 使用vue-router进行页面跳转，跳转到展览页面，并传递游戏名称作为查询参数
    proxy.$router.push({
      name: 'Exhibition',
      query: { id: game.id }
    })
  }
</script>

<style lang="scss" scoped>
  $item-radius: 10px;

  .game-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 0 3px;
    box-sizing: border-box;

    .game-item {
      position: relative;
      display: flex;
      width: calc(33.3% - 10px);
      height: 125px;
      margin: 5px;
      overflow: hidden;
      background: #fff;
      border-radius: $item-radius;
      box-sizing: border-box;
      flex-direction: column;

      .img-box {
        position: relative;
        width: 100%;
        height: 92.3px;
        box-sizing: border-box;

        img {
          width: 100%;
          // border:1.6px solid #717392;
          height: 100%;
          border-radius: $item-radius $item-radius 0 0;
          box-sizing: border-box;
        }
      }

      .title {
        position: relative;
        line-height: 32px;
        text-align: center;
        flex-grow: 1;

        span {
          display: inline-block;
          width: 80%;
          overflow: hidden;
          font-size: 11.67px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  .empty {
    .title {
      padding: 0 0 2px 12px;
      font-size: 16px;
      font-weight: 600;
      // margin-top: 10px;
    }

    .hint {
      padding: 3px 0 2px 12px;
      font-size: 12.67px;
    }
  }
</style>
