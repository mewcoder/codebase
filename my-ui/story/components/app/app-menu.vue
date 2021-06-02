<template>
  <div class="app-menu-list">
    <div
      class="app-menu-group"
      v-for="menuGroup in menus"
      :key="menuGroup.name"
    >
      <div class="app-menu-group-name">
        <span>{{ menuGroup.name }}</span>
      </div>

      <div
        v-for="menu in menuGroup.children"
        :key="menu.title"
        @click="handleClickMenu(menu)"
      >
        <div
          class="app-menu-name"
          :class="{ 'app-menu-active': currentMenu === menu.page }"
        >
          <span>{{ menu.name }}</span>
          <span>{{ menu.title }}</span>
        </div>
      </div>
      <div class="menu-line" />
    </div>
  </div>
</template>

<script lang="ts">
import { injectAppNavigator } from "../navigator/app-navigator";
import { AppMenu, MENUS } from "./menu";
import { ref } from "vue";

export default {
  name: "app-menu",
  props: {
    currentPath: { type: String },
  },
  setup(props: any) {
    const menus = MENUS;
    const navigator = injectAppNavigator();
    const currentMenu = ref("");
    function handleClickMenu(menu: AppMenu) {
      navigator.methods.go(menu.page);
      currentMenu.value = menu.page;
    }
    return {
      menus,
      currentMenu,
      handleClickMenu,
    };
  },
};
</script>

<style lang="scss">
.menu-line {
  margin: 10px;
  background-color: #e0e0e0;
  height: 0.5px;
}
.app-menu-list {
  height: 100%;
  overflow: auto;
  .app-menu-group {
    .app-menu-name {
      font-size: 14px;
      padding: 10px 24px 12px 32px;
      white-space: nowrap;
      color: #161616;
      cursor: pointer;

      &:hover {
        background-color: #e5e5e5;
      }
    }

    .app-menu-name {
      position: relative;

      & > span {
        &:nth-child(2) {
          font-size: 12px;
          margin-left: 0.5em;
          color: #ccc;
        }
      }

      .pl-icon {
        position: absolute;
        right: 16px;
        line-height: 40px;
      }
    }

    .app-menu-group-name {
      font-size: 15px;
      letter-spacing: 1px;
      font-weight: 550;
      white-space: nowrap;
      padding: 10px 24px 12px 24px;
      color: #525252;
      &:hover {
        background-color: #e5e5e5;
      }
    }
  }

  .app-menu-active {
    background-color: #e5e5e5;
    &:before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 5px;
      background-color: #0f62fe;
      content: "";
    }
  }
}
</style>
