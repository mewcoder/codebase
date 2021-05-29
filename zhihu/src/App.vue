<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <column-list :list="list"></column-list>
    <va-input
      v-model="inputText"
      :rules="rules"
      placeholder="请输入"
      class="test props"
    ></va-input>
    <va-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <va-input
          :rules="rules"
          v-model="data.email"
          placeholder="请输入邮箱地址"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">昵称</label>
        <va-input
          :rules="rules"
          v-model="data.password"
          placeholder="请输入昵称"
          type="password"
        />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary btn-block btn-large">注册新用户</button>
      </template>
    </va-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'

import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import VaInput, { RulesProp } from './components/VaInput.vue'
import VaForm from './components/VaForm.vue'

// 假数据
const img =
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdiy.qqjay.com%2Fu%2Ffiles%2F2012%2F0817%2F94de8c23ff7c45c92344cb3705d74f8e.jpg&refer=http%3A%2F%2Fdiy.qqjay.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624637005&t=8e0fe028ba553cfcf1a943b5163ee876'
const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test的专栏',
    description:
      '这是一个专栏这是一个专栏这是一个专栏这是一个专栏这是一个专栏这是一个专栏',
    avatar: img
  },
  {
    id: 2,
    title: 'test的专栏',
    description:
      '这是一个专栏这是一个专栏这是一个专栏这是一个专栏这是一个专栏这是一个专栏'
    // avatar: img
  },
  {
    id: 3,
    title: 'test的专栏',
    description:
      '这是一个专栏这是一个专栏这是一个专栏这是一个专栏这是一个专栏这是一个专栏',
    avatar: img
  },
  {
    id: 4,
    title: 'test的专栏',
    description:
      '这是一个专栏这是一个专栏这是一个专栏这是一个专栏这是一个专栏这是一个专栏',
    avatar: img
  },
  {
    id: 5,
    title: 'test的专栏',
    description:
      '这是一个专栏这是一个专栏这是一个专栏这是一个专栏这是一个专栏这是一个专栏'
    // avatar: img
  }
]

const user: UserProps = {
  isLogin: true,
  name: 'admin',
  id: 1
}

export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader,
    VaInput,
    VaForm
  },
  setup () {
    const inputText = ref('')
    const data = reactive({
      email: '',
      password: ''
    })
    const rules: RulesProp = [
      {
        type: 'required',
        message: '输入不能为空'
      },
      {
        type: 'email',
        message: '邮箱格式错误'
      }
    ]

    const onFormSubmit = (result: boolean) => {
      alert(result)
    }
    return {
      list: testData,
      currentUser: user,
      inputText,
      rules,
      data,
      onFormSubmit
    }
  }
})
</script>

<style></style>
