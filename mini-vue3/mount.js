/*
 * @Description:
 * @Author: zhaodacheng5
 * @Date: 2021-05-26 15:21:25
 * @LastEditors: zhaodacheng5
 * @LastEditTime: 2021-05-26 18:32:01
 */


//返回虚拟dom
function h(tag, props, children) {
  return {
    tag,
    props,
    children,
  };
}

// const elementVnode = {
//     tag: 'div'
//   }

const elementVnode = h("div");

// 把 elementVnode 渲染到 id 为 app 的元素下
render(elementVnode, document.getElementById("app"));

function render(vnode, container) {
  mountElement(vnode, container);
}

function mountElement(vnode, container) {
  // 创建元素
  const el = document.createElement(vnode.tag);
  // 将元素添加到容器
  container.appendChild(el);
}
