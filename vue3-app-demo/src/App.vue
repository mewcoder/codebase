<!--
 * @Description: 
 * @Author: zhaodacheng5
 * @Date: 2021-05-31 09:43:06
 * @LastEditors: zhaodacheng5
 * @LastEditTime: 2021-05-31 10:29:52
-->
<template>
  <div id="app">
    <h1>开课吧 - Vue3</h1>

    <h2>RateValue: {{data.rateValue}}</h2>

    <Rate v-model="data.rateValue"></Rate>

    <hr />
    <Calendar></Calendar>
  </div>
</template>

<script>
import {reactive} from 'vue'
import Rate from '@/components/Rate'
import Calendar from '@/components/Calendar'


export default {
  name: 'App',
  components: {
    Rate,
    Calendar
  },

  setup() {
    let data = reactive({
      rateValue: 3
    })

    return {
      data
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
