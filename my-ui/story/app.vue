<template>
  <!-- 路由 -->
  <app-navigator defaultPath="normal/button">
    <div class="app-home">
      <!-- 顶栏 -->
      <div class="app-header" :style="{ height: size.headSize + 'px' }">
        <h2>my-ui</h2>
        <span>else</span>
      </div>
      <!-- 侧边栏 -->
      <div
        class="app-menu"
        :style="{
          width: size.menuSize + 'px',
          top: size.headSize + 'px',
        }"
      >
        <app-menu />
      </div>
      <div
        class="app-content"
        :style="{
          top: size.headSize + 'px',
          left: size.menuSize + 'px',
        }"
      >
        <!-- 路由 -->
        <app-navigator-page />
      </div>
    </div>
  </app-navigator>
</template>

<script>
import { AppNavigator } from "./components/navigator/app-navigator";
import { AppNavigatorPage } from "./components/navigator/app-navigator-page";
import AppMenu from "./components/app/app-menu";

export default {
  components: {
    AppMenu,
    AppNavigator,
    AppNavigatorPage,
  },
  name: "app",
  data() {
    return {
      size: {
        headSize: 60,
        menuSize: 300,
      },
    };
  },
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

.app-home {
  .app-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    // border-bottom: solid 1px rgba(0, 0, 0, 0.1);
    // background-color: white;
    border-bottom: 1px solid #393939;
    background-color: #161616;
    color: #fff;
  }

  .app-menu {
    position: fixed;
    left: 0;
    bottom: 0;
    border-right: solid 2px rgba(0, 0, 0, 0.1);
    // background-color: white;
  }

  .app-content {
    position: fixed;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    // background-color: red;
    // min-height: 100vh;
    margin: 16px;
    box-sizing: border-box;
  }
}
</style>
