/*
 * @Description:
 * @Author: zhaodacheng5
 * @Date: 2021-05-26 12:26:11
 * @LastEditors: zhaodacheng5
 * @LastEditTime: 2021-05-26 18:46:45
 */

class Dep {
  constructor() {
    this.effects = new Set();
  }
  // 收集依赖
  depend() {
    if (curEffect) this.effects.add(curEffect);
  }
  //触发依赖
  notice() {
    this.effects.forEach((effect) => {
      effect();
    });
  }
}

let curEffect; // 当前副作用函数

function effectWatch(effect) {
  //收集依赖
  curEffect = effect;
  effect();
  curEffect = null;
}

const targetMap = new Map();

// target - depsMap
// key - dep
function getDep(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }
  return dep;
}

function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      const dep = getDep(target, key);
      //依赖收集
      dep.depend();
      //返回值
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      const dep = getDep(target, key);
      const result = Reflect.set(target, key, value);
      //触发
      dep.notice();
      return result;
    },
  });
}

//test
let a = reactive({ value: 10 });

let b;

effectWatch(() => {
  b = a.value + 10;
  console.log(b);
});

a.value = 20;

export { reactive, effectWatch };
