/*
 * @Description:
 * @Author: zhaodacheng5
 * @Date: 2021-05-26 18:33:12
 * @LastEditors: zhaodacheng5
 * @LastEditTime: 2021-05-26 19:40:19
 */
import { reactive, effectWatch } from "./reactivity_2.js";

//retrun vdom
function h(tag, props, children) {
  return {
    tag,
    props,
    children,
  };
}

//vdom => dom
function mountElement(vnode, rootContainer) {
  const { tag, props, children } = vnode;
  //tag
  const el = document.createElement(tag);
  //props
  if (props) {
    for (const key in props) {
      const val = props[key];
      el.setAttribute(key, val);
    }
  }
  //chidren
  //数组or字符串
  if (typeof children === "string") {
    const textNode = document.createTextNode(children);
    el.append(textNode);
  } else if (Array.isArray(children)) {
    children.forEach((child) => {
      mountElement(child, el);
    });
  }

  rootContainer.append(el);
}

function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      const context = rootComponent.setup();
      effectWatch(() => {
        rootContainer.innerHTML = "";
        const subTree = rootComponent.render(context);
        mountElement(subTree, rootContainer);
      });
    },
  };
}

const App = {
  render(context) {
    return h("div", { id: "123", style: "color:red" }, [
      h("p", null, String(context.state.value)),
      h("div", { style: "color:blue" }, String(context.state.value * 2)),
    ]);
  },
  setup() {
    const state = reactive({
      value: 10,
    });
    window.state = state; //为了好改值
    return { state };
  },
};

createApp(App).mount(document.getElementById("app"));
