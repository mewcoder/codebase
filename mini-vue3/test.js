/*
 * @Description:
 * @Author: zhaodacheng5
 * @Date: 2021-05-26 12:20:06
 * @LastEditors: zhaodacheng5
 * @LastEditTime: 2021-05-26 12:25:23
 */

const { reactive, effect } = require("@vue/reactivity");

let a = reactive({ value: 10 });

let b;

effect(() => {
  b = a.value + 10;
  console.log(b);
});

a.value = 20;

// 20 会先执行一次
// 30 发生变化之后，执行一次