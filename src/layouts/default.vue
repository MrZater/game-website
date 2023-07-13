<template>
  <!-- 页头 -->
  <head v-if="isShow" class="header-box">
    <div class="head-left" @click="goHome">
      <svg-icon class="svg-icon" name="home" color="#4C4C4C" style="margin-right: 2px"></svg-icon>
      HOME
    </div>
    <div class="head-right" @click="showSearch">
      <svg-icon class="svg-icon" name="expand" color="#333" style="margin-right: 2px"></svg-icon>
    </div>
  </head>
  <!-- 垫片 -->
  <div v-if="isShow" class="header-space"></div>
  <!-- 搜索块 -->
  <div :class="{ 'search-wrapper': true, hidden: !isShowSearch }">
    <div class="search-input">
      <svg-icon class="svg-icon" color="#fff" name="search"></svg-icon>
      <input type="text" placeholder="Search for a game" v-model="searchword" />
    </div>
    <button class="search-btn" @click="handleSearch(searchword, 1)">Search</button>
    <button v-for="item in searcList" :key="item.id" @click="handleSearch(item.id, 2, item.name)" class="search-item">
      {{ item.name }}
    </button>
  </div>
  <!-- 路由视口 -->
  <Transition name="fade" type="transition" mode="out-in">
    <router-view class="router-view" />
  </Transition>
  <!-- 页脚 -->
  <footer v-if="isShow">
    <div class="link">
      <router-link to="/contact">contact</router-link>
      /
      <router-link to="/privacy">privacy</router-link>
      /
      <span @click="showDialog = !showDialog">Do&nbsp;not&nbsp;sell&nbsp;my&nbsp;data</span>
    </div>
    <div>Aplaying Fun Games20</div>
  </footer>
  <!-- 隐私弹窗 -->
  <PersonalDialog v-if="showDialog" @close-dialog="showDialog = false" />
</template>

<script setup>
import { reactive, ref, watch, provide, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { userAct, getCategoryList } from '@/api/index'
import hasload from '@/utils/hasLoading'
import windowListener from '@/utils/windowListener'
import nameObj from '@/utils/routeNameMaps'
import PersonalDialog from '@/components/PersonalDialog/PersonalDialog.vue'
// 通过session判断是否是第一次加载
if (!hasload()) {
  // 如果没有加载过
  userAct('view') // 调用userAct函数，传入参数'view'
}
// 定义路由名称
const routeName = ref('') // 定义一个ref变量routeName，初始值为空字符串
// 定义路由
const route = reactive(useRouter()) // 定义一个reactive变量route，值为useRouter()的返回值
// 定义是否是游戏
const isShow = ref(false) // 定义一个ref变量isShow，初始值为false
// 搜索模块是否显示
const isShowSearch = ref(false) // 定义一个ref变量isShowSearch，初始值为false
const searchword = ref('') // 定义一个ref变量searchword，初始值为空字符串
const searcList = ref([]) // 定义一个ref变量searcList，初始值为空数组
const showDialog = ref(false) // 定义一个ref变量showDialog，初始值为false
// 监听路由名称变化
watch(
  () => route.currentRoute.name, // 监听route.currentRoute.name的变化
  val => {
    // 当变化时执行回调函数
    scrollTo(0, 0) // 滚动到页面顶部
    isShowSearch.value = false // 将isShowSearch的值设为false
    // 如果路由名称是'Game'，则isShow为true
    isShow.value = !['Game', 'Ready'].includes(val) // 如果val不是'Game'或'Ready'，则isShow为true
    // 如果路由名称是'Home'，则routeName为'index'，否则根据路由名称赋值
    routeName.value = nameObj[val] // 根据val的值从nameObj对象中获取对应的值，赋给routeName
  },
  {
    deep: true, // 深度监听
    immediate: true, // 立即执行回调函数
  },
)
windowListener(routeName) // 调用windowListener函数，传入参数routeName
function goHome(){
  // 定义goHome函数
  if (routeName.value === 'index') {
    // 如果routeName的值为'index'
    return // 返回
  }
  userAct('back', routeName.value) // 调用userAct函数，传入参数'back'和routeName的值
  route.push({ name: 'Home' }) // 跳转到name为'Home'的路由
}
function changeShowDialog(val){
  // 定义changeShowDialog函数，接收一个参数val
  showDialog.value = val // 将showDialog的值设为val
}
provide('changeShowDialog', changeShowDialog) // 提供'changeShowDialog'的值为changeShowDialog函数
async function showSearch(){
  // 定义一个异步函数showSearch
  isShowSearch.value = !isShowSearch.value // 将isShowSearch的值取反
  if (!isShowSearch.value) {
    // 如果isShowSearch的值为假
    return // 则返回
  }
  await nextTick() // 等待下一个tick
  const searchWrapper = document.getElementsByClassName('search-wrapper')[0] // 获取类名为'search-wrapper'的第一个元素
  scrollTo(0, 0) // 将页面滚动到顶部
  searchWrapper.scrollTo(0, 0) // 将搜索框滚动到顶部
}
function handleSearch(key, type, name){
  // 定义handleSearch函数，接收三个参数key、type和name
  if (!key) {
    // 如果key不存在
    return // 返回
  }
  searchword.value = '' // 将searchword的值设为空字符串
  showSearch() // 调用showSearch函数
  route.push({
    // 跳转到指定路由
    name: 'Result', // 路由名称为'Result'
    query: {
      // 路由参数
      key,
      type,
      name, // key、type和name分别为传入的参数值
    },
  })
}
async function getCategoryListFunc(){
  // 定义getCategoryListFunc函数
  const { data } = await getCategoryList() // 调用getCategoryList函数，并将返回值的data属性解构赋值给data变量
  searcList.value = data // 将searcList的值设为data
}
getCategoryListFunc() // 调用getCategoryListFunc函数
</script>

<style scoped lang="scss">
  .header-space {
    height: 60px;
  }

  .search-wrapper {
    display: flex;
    height: calc(100vh - 60px);
    padding: 0 20px;
    overflow: scroll;
    background-color: #27a186;
    transition: all .3s;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    &.hidden {
      height: 0;
    }

    .search-input {
      position: relative;
      display: flex;
      width: calc(100% - 20px);
      min-height: 33.33px;
      padding: 0 10px;
      margin-top: 20px;
      background-color: #fff;
      border-radius: 2.67px;
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
      }
    }

    .search-btn {
      width: 289px;
      min-height: 32.67px;
      margin: 18.67px 0;
      font-size: 13.33px;
      color: #fff;
      background-color: #f7b500;
      border: none;
      border-radius: 13.33px;
    }

    .search-item {
      width: 310.33px;
      min-height: 31.33px;
      margin-bottom: 10px;
      font-size: 13.33px;
      color: #f7b500;
      background-color: #fff;
      border: none;
      border-radius: 2.67px;
    }
  }

  .header-box {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    display: block;
    display: flex;
    width: 100%;
    height: 60px;
    background: #fff;
    box-shadow: 0 0 0 0 #fff, 0 3px 3px rgb(200 200 200 / 10%);
    justify-content: space-between;
    align-items: center;

    .head-left {
      display: flex;
      width: 86.67px;
      height: 29.33px;
      margin-left: 12px;
      font-size: 15px;
      background: #f2f2f2;
      border-radius: 21.96px;
      justify-content: center;
      align-items: center;

      .svg-icon {
        width: 15px;
        height: 15px;
      }
    }

    .head-right {
      display: flex;
      width: 22px;
      height: 20px;
      padding: 2px;
      margin-right: 21.67px;
      background-color: #f2f2f2;
      border-radius: 3px;
      justify-content: center;
      align-items: center;

      .svg-icon {
        width: 18px;
        height: 18px;
      }
    }
  }

  footer {
    margin: 20px 0;
    font-size: 11.67px;
    text-align: center;

    .link {
      color: #1d9e81;

      a {
        color: inherit;
        text-decoration: none;
      }
    }
  }

  input::placeholder {
    font-size: 12.67px;
    line-height: 17.67px;
    color: #cfcfcf;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
