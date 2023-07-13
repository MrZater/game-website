<template>
  <div class="personal-dialog">
    <div class="dialog-wrapper">
      <div class="dialog-close-btn" @click="closeDialog">
        <svg-icon class="svg-icon" name="close" color="#000"></svg-icon>
      </div>
      <h3 class="title">Playing Fun Games - Do Not Sell My Personal Information</h3>
      <p>
        When you visit this website, we collect personal information such as IP addresses, cookie identifiers and other
        pseudonymous identifiers. This information may be used to personalize content based on your interests, run and
        optimize advertising campaigns tailored to you, measure the performance of ads and content, and derive insights
        about the audiences who engage with ads and content. This information may also be disclosed by us to third
        parties on the AB's List of Downstream Participants that may further disclose it to other third parties. Using
        personal information as described above is an integral part of how we operate our website, make revenue to
        support our staff, and generate relevant content for our audience. You can learn more about our data collection
        and use practices in our Privacy Policy.
      </p>
      <div class="agree-box">
        <div class="agree-title-box">
          <div class="switch-box" @click="isAggree = !isAggree" :class="{ open: isAggree }">
            <div class="switch-inner"></div>
          </div>
          <div class="agree-title">I want to request you do not sell my personal infomation</div>
        </div>
        <div class="confirm-btn" @click="confirm">CONFIRM</div>
      </div>
    </div>
    <div class="model" @click="closeDialog"></div>
  </div>
</template>

<script setup>
  import { onUnmounted, ref } from 'vue'
  // 定义一个响应式引用isAggree，默认值为false
  const isAggree = ref(false)
  // 定义一个emits函数，用于触发'close-dialog'事件
  const emits = defineEmits(['close-dialog'])
  // 在组件卸载时移除对'wheel'事件的监听
  onUnmounted(() => {
    window.removeEventListener('wheel', preventWheel)
  })
  // 在window对象上添加对'wheel'事件的监听
  window.addEventListener('wheel', preventWheel, { passive: false })
  // 定义一个关闭对话框的函数，触发'close-dialog'事件
  function closeDialog() {
    emits('close-dialog')
  }
  // 定义一个确认函数，如果isAggree的值为false，则直接返回，否则关闭对话框
  function confirm() {
    if (!isAggree.value) {
      return
    }
    closeDialog()
  }
  // 定义一个阻止滚动事件的函数
  function preventWheel(e) {
    e.preventDefault()
  }
</script>

<style lang="scss" scoped>
  .personal-dialog {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;

    .dialog-wrapper {
      position: relative;
      z-index: 1001;
      max-width: 307px;
      padding-bottom: 30px;
      // height: 561.33px;
      background-color: #fff;
      opacity: 1;
      // padding: 20px;

      .dialog-close-btn {
        position: absolute;
        top: 18px;
        right: 22px;

        .svg-icon {
          width: 22px;
          height: 22px;
        }
      }

      h3 {
        padding: 24.33px 22px 0;
        font-size: 12.33px;
        line-height: 17.33px;
        color: #333;
        white-space: .29px;
      }

      p {
        margin-top: 12.67px;
        margin-right: 23.67px;
        margin-left: 23.67px;
        font-size: 11px;
        line-height: 15.33px;
        color: #333;
        white-space: .26px;
      }

      .agree-box {
        width: 255.67px;
        height: 100px;
        margin: 20.33px 0 0 23px;
        border: .33px solid #979797;

        .agree-title-box {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 10px;

          .switch-box {
            position: relative;
            height: 16.67px;
            min-width: 32.67px;
            margin-right: 5px;
            margin-left: 12.33px;
            cursor: pointer;
            background-color: #ccc;
            border: 1px solid #ccc;
            border-radius: 8.33px;
            box-sizing: border-box;
            user-select: none;

            .switch-inner {
              width: 50%;
              height: 100%;
              background-color: #fff;
              border-radius: 50%;
              transition: all .5s;
            }

            &.open {
              background-color: #f7b500;
              border: 1px solid #f7b500;

              .switch-inner {
                transform: translate(100%, 0);
              }
            }
          }

          .agree-title {
            font-size: 12.33px;
            font-weight: 600;
            line-height: 17.33px;
            color: #333;
            white-space: .29px;
          }
        }

        .confirm-btn {
          width: 119px;
          height: 26.67px;
          margin-top: 13.33px;
          margin-left: 13.33px;
          line-height: 26.67px;
          color: #fff;
          text-align: center;
          background: #f7b500;
          border-radius: 2.67px;
        }
      }
    }

    .model {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1000;
      width: 100%;
      height: 100%;
      background-color: #000;
      opacity: .8;
    }
  }
</style>
