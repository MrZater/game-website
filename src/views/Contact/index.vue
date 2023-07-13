<template>
  <div class="contact-container">
    <div class="contact-us">Contact US</div>
    <form id="form" @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="formquery.name"
type="text"
name="name"
id="name"
placeholder="Name"
required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="formquery.email" type="email" id="email" placeholder="Email" required />
      </div>
      <div class="form-group">
        <label for="title">Title</label>
        <input v-model="formquery.title"
type="text"
name="title"
id="title"
placeholder="Title"
required />
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea v-model="formquery.message" rows="5" id="message" placeholder="Your Message" required></textarea>
      </div>
      <button type="submit">SUBMIT</button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { contactUs } from '@/api/index'
import { useRouter } from 'vue-router'
const router = useRouter() // 使用useRouter()函数获取路由实例
const form = ref(null) // 创建一个ref实例，用于引用表单元素
const formquery = reactive({
  // 使用reactive()函数创建响应式对象formquery
  name: '', // 表单字段name，初始值为空字符串
  email: '', // 表单字段email，初始值为空字符串
  title: '', // 表单字段title，初始值为空字符串
  message: '', // 表单字段message，初始值为空字符串
})
function submitForm(){
  // 定义submitForm()函数，用于提交表单
  contactUs({ ...formquery }) // 调用contactUs()函数，传递formquery对象作为参数
  router.push({ name: 'Home' }) // 跳转到Home页面
}
</script>

<style lang="scss" scoped>
  .contact-container {
    padding: 20px;

    .contact-us {
      padding-bottom: 10px;
      font-size: 12.67px;
      font-weight: 600;
      line-height: 17.67px;
      letter-spacing: .3px;
      color: #333;
      border-bottom: .5px solid #ddd;
    }

    #form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-bottom: .5px solid #ddd;

      .form-group {
        display: flex;
        flex-direction: column;
        width: 100%;

        label {
          padding: 10px 0 12px;
          font-size: 12.67px;
          line-height: 17.67px;
          color: #333;
        }

        input,
        textarea {
          padding: 0 5px;
          border: .33px solid #979797;
          border-radius: 2.67px;

          &::placeholder {
            font-size: 12.67px;
            line-height: 34px;
            color: #cfcfcf;
          }
        }

        input {
          height: 34px;
        }

        .textarea {
          height: 102.33px;
        }
      }

      button {
        position: relative;
        width: 299px;
        height: 38.33px;
        margin: 17px;
        font-size: 15px;
        color: #fff;
        background-color: #f7b500;
        border: none;
        border-radius: 2.67px;
      }
    }
  }
</style>
