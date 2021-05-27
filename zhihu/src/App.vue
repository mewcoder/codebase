<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'

import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'

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
    GlobalHeader
  },
  setup () {
    return {
      list: testData,
      currentUser: user
    }
  }
})
</script>

<style></style>
