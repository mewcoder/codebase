<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm" >
        <div class="card-body text-center">
          <img
            :src="column.avatar"
            :alt="column.title"
            class="rounded-circle border border-light my-3"
            style="width: 100px;"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <a class="btn btn-outline-primary">进入专栏</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

export interface ColumnProps {
  id: number
  title: string
  avatar?: string
  description: string
}
export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      // 把构造函数断言为类型 好处：可以在模板或setup中获取到类型
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columnList = computed(() => {
      return props.list.map(column => {
        if (!column.avatar) column.avatar = require('@/assets/avatar.jpg')
        return column
      })
    })
    return {
      columnList
    }
  }
})
</script>

<style></style>
