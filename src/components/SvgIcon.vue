<template>
  <svg aria-hidden="true" class="svg-icon" :style="{ color: color }">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script>
  import { defineComponent, computed } from 'vue'
  export default defineComponent({
    name: 'SvgIcon', // 组件名称：'SvgIcon'
    props: {
      // 使用的svg图标名称，也就是svg文件名
      name: {
        type: String, // 类型：字符串
        required: true // 必需的
      },
      // 类名后缀
      prefix: {
        type: String, // 类型：字符串
        default: 'icon' // 默认值：'icon'
      },
      color: {
        type: String, // 类型：字符串
        default: '#fff' // 默认值：'#fff'
      }
    },
    setup(props) {
      // 设置函数
      const symbolId = computed(() => `#${props.prefix}-${props.name}`) // 计算属性：symbolId
      return { symbolId } // 返回对象：{ symbolId }
    }
  })
</script>

<style scope>
  .svg-icon {
    fill: currentColor;
  }
</style>
