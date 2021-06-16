<template>
  <div class="el-rate">
    <span
      v-for="(item, key) in max"
      :key="key"
      class="el-rate__item"
      style="cursor:pointer"
      @mousemove="setCurrentValue(item)"
      @mouseleave="resetCurrentValue"
      @click="selectValue(item)"
    >
      <i
        class="el-rate__icon"
        :class="'el-icon-star-' + (currentValue >= item ? 'on' : 'off')"
        style="color: #F7BA2A"
      ></i>
    </span>
  </div>
</template>

<script>
/***
 * options API
 *  template中的数据：data、props、computed、methods……
 * composition API
 *
 *
 * 1、显示评论列表
 *      1、总分数
 *      2、当前分数
 * 2、添加用户交互
 *      1、鼠标移入
 */
import { ref } from "vue";

export default {
  name: "Rate",

  props: {
    value: {
      type: Number,
      default: 0,
    },
  },

  setup(props, context) {
    // console.log(props.value);
    console.log(context);

    // console.log('setup');
    let currentValue = ref(props.value);
    // console.log(currentValue);

    const setCurrentValue = (val) => {
      // 原始值的响应式数据不能直接去赋值
      currentValue.value = val;
      // console.log(currentValue);
    };

    const resetCurrentValue = () => {
      currentValue.value = props.value;
    };

    const selectValue = (val) => {
      context.emit("change", val);
    };

    return {
      max: 5,
      currentValue,

      setCurrentValue,
      resetCurrentValue,
      selectValue,
    };
  },
};
</script>
