<template>
  <div class="pagination-container" v-if="total">
    <div @click="changePage(currentPage - 1)" :class="{ disabled: currentPage <= 1 }" class="page-item">Prev</div>
    <div
      @click="changePage(item)"
      class="page-item"
      :class="{ active: currentPage === item }"
      v-for="item in pageNums"
      :key="item"
    >
      {{ item }}
    </div>
    <div @click="changePage(currentPage + 1)" :class="{ disabled: currentPage >= maxPage }" class="page-item">Next</div>
  </div>
</template>

<script setup>
  import { watchEffect, ref, computed } from 'vue'
  const props = defineProps({
    // 当前页
    page: {
      default: 1,
      type: Number
    },
    // 当前页容量
    limit: {
      default: 10,
      type: Number
    },
    // 数据总数
    total: {
      default: 0,
      type: Number,
      required: true
    },
    // 显示的页码数
    pageNum: {
      default: 5,
      type: Number
    }
  })
  const emits = defineEmits(['change-page'])
  // 定义当前页码、每页显示数量和总数的响应式变量
  const currentPage = ref(1) // 当前页码
  const currentLimit = ref(10) // 每页显示数量
  const currentTotal = ref(0) // 总数

  // 监听props的变化，更新响应式变量的值
  watchEffect(() => {
    currentPage.value = props.page // 更新当前页码
    currentLimit.value = props.limit // 更新每页显示数量
    currentTotal.value = props.total // 更新总数
  })
  const maxPage = computed(
    () => Math.ceil(currentTotal.value / currentLimit.value) // 计算最大页码
  )

  // 计算页码数组
  const pageNums = computed(() => {
    const minPage = 1 // 最小页码为1
    const arr = [currentPage.value] // 初始化页码数组，将当前页码加入数组
    let flag = 1 // 标志位，用于控制循环次数
    for (let i = 0; i <= props.pageNum - 1; i++) {
      if (currentPage.value - flag >= minPage && arr.length < props.pageNum) {
        arr.push(currentPage.value - flag) // 将当前页码减去标志位的值加入数组
      }
      if (currentPage.value + flag <= maxPage.value && arr.length < props.pageNum) {
        arr.push(currentPage.value + flag) // 将当前页码加上标志位的值加入数组
      }
      flag++ // 标志位自增
    }
    return arr.sort((a, b) => a - b) // 对页码数组进行排序并返回
  })
  function changePage(page) {
    if (page < 1 || page > maxPage.value) {
      return
    }
    emits('change-page', page) // 发送页面改变事件
  }
</script>

<style lang="scss">
  .pagination-container {
    display: flex;
    user-select: none;

    .page-item {
      padding: 3px 7px;
      margin: 5px 7px;
      color: #fff;
      cursor: pointer;
      background: #27a186;
      border-radius: 5px;

      &.disabled {
        cursor: not-allowed;
        background-color: #1b5c4e;
      }

      &.active {
        background-color: #25caa7;
      }
    }
  }
</style>
