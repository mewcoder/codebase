<template>
  <div id="app">
    <h1>开课吧 - Vue3</h1>

    <h2>RateValue: {{data.rateValue}}</h2>

    <Rate :value="data.rateValue" @change="changeRateValue"></Rate>
  </div>
</template>

<script>
import {reactive} from 'vue'
import Rate from '@/components/Rate'


export default {
  name: 'App',
  components: {
    Rate
  },

  setup() {
    let data = reactive({
      rateValue: 3
    })

    const changeRateValue = val => {
      // console.log(val);
      data.rateValue = val;
    }

    return {
      data,

      changeRateValue
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
