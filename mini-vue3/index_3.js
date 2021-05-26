/*
 * @Description:
 * @Author: zhaodacheng5
 * @Date: 2021-05-26 18:33:12
 * @LastEditors: zhaodacheng5
 * @LastEditTime: 2021-05-26 20:36:59
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
function mountElement(vnode, container) {
  const { tag, props, children } = vnode;
  //tag
  const el = (vnode.el = document.createElement(tag));
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
  } else {
    children.forEach((child) => {
      mountElement(child, el);
    });
  }

  container.append(el);
}

//patch
function patch(n1, n2) {
  console.log("patch");
  // 1.tag
  if (n1.tag !== n2.tag) {
    n1.el.replaceWith(document.createElement(n2.tag));
  } else {
    //细节!!!
    const el = (n2.el = n1.el);
    // 2.props
    const oldProps = n1.props || {};
    const newProps = n2.props || {};
    if (oldProps && newProps) {
      Object.keys(newProps).forEach((key) => {
        const newVal = newProps[key];
        const oldVal = oldProps[key];
        if (newVal !== oldVal) {
          el.setAttribute(key, newVal);
        }
      });
    }
    if (oldProps) {
      Object.keys(oldProps).forEach((key) => {
        if (!newProps[key]) {
          el.removeAttribute(key);
        }
      });
    }

    // 3.children  数组或字符串
    const oldChildren = n1.children;
    const newChildren = n2.children;
    if (typeof newChildren === "string") {
      if (typeof oldChildren === "string") {
        if (newChildren !== oldChildren) {
          el.textContent = newChildren;
        }
      } else {
        el.textContent = newChildren;
      }
    } else {
      if (typeof oldChildren === "string") {
        el.innerHTML = "";
        newChildren.forEach((child) => {
          mountElement(child, el);
        });
      } else {
        //处理公共的部分
        const length = Math.min(oldChildren.length, newChildren.length);
        for (let i = 0; i < length; i++) {
          patch(oldChildren[i], newChildren[i]);
        }
        //新的长
        if (newChildren.length > length) {
          newChildren.slice(oldChildren.length).forEach((child) => {
            mountElement(child, el);
          });

          //老的长
        } else if (oldChildren.length > length) {
          for (let i = length; i < oldChildren.length; i++) {
            oldChildren.slice(newChildren.length).forEach((child) => {
              el.removeChild(child.el);
            });
          }
        }
      }
    }
  }
}

function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      const context = rootComponent.setup();
      let isMounted = false;
      let preSubTree;

      effectWatch(() => {
        if (!isMounted) {
          rootContainer.innerHTML = "";
          isMounted = true;
          const subTree = rootComponent.render(context);
          mountElement(subTree, rootContainer);
          preSubTree = subTree;
        } else {
          //update
          const subTree = rootComponent.render(context);
          patch(preSubTree, subTree);
          preSubTree = subTree;
        }
      });
    },
  };
}

const App = {
  render(context) {
    return h("div", { id: "main", style: "color:red" }, [
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

//完整测试
createApp(App).mount(document.getElementById("app"));



//patch test
const vdom = h("div", { class: "red" }, [h("span", null, "hello")]);
mountElement(vdom, document.getElementById("app"));

const vdom2 = h("div", { class: "green" }, [h("span", null, "changed!")]);
setTimeout(() => {
  patch(vdom, vdom2);
},3000);
