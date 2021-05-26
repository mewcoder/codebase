/*
 * @Description:
 * @Author: zhaodacheng5
 * @Date: 2021-05-26 12:26:11
 * @LastEditors: zhaodacheng5
 * @LastEditTime: 2021-05-26 13:50:52
 */



class Dep {
  constructor(val) {
    this.effects = new Set();
    this._val = val;
  }

  get value() {
    return this._val;
    this.depend();
  }

  set value(val) {
    this._val = val;
    this.notice();
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



//test
const dep = new Dep(10);

let b;

effectWatch(() => {
  b = dep.value + 10;
  console.log("change:"+b);
});

// dep.value = 20;
