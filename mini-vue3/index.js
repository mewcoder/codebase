/*
 * @Description:
 * @Author: zhaodacheng5
 * @Date: 2021-05-26 18:33:12
 * @LastEditors: zhaodacheng5
 * @LastEditTime: 2021-05-26 19:09:51
 */
import { reactive, effectWatch } from "./reactivity_2.js";

const App = {
  render(context) {
    //构建视图
    const div = document.createElement("div");
    div.innerText = context.state.value;
    return div;
  },
  setup() {
    const state = reactive({
      value: 10,
    });
    window.state = state; //为了好改值
    return { state };
  },
};

function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      const context = rootComponent.setup();
      effectWatch(() => {
        rootContainer.innerHTML = "";
        const element = rootComponent.render(context);
        rootContainer.append(element);
      });
    },
  };
}

createApp(App).mount(document.getElementById("app"));
