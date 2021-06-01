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
        :class="{ 'app-menu-active': currentPath === menu.page }"
      >
        <div class="app-menu-name">
          <span>{{ menu.name }}</span>
          <span>{{ menu.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { injectAppNavigator } from "../navigator/app-navigator";
import { AppMenu, MENUS } from "./menu";

export default {
  name: "app-menu",
  props: {
    currentPath: { type: String },
  },
  setup() {
    const navigator = injectAppNavigator();

    return {
      menus: MENUS,
      handleClickMenu(menu: AppMenu) {
        navigator.methods.go(menu.page);
      },
    };
  },
};
</script>

<style lang="scss">
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
        &:before {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 4px;
          background-color: #0f62fe;
          content: "";
        }
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
      letter-spacing: 2px;
      font-weight: 600;
      white-space: nowrap;
      padding: 10px 24px 12px 24px;
      cursor: pointer;
      &:hover {
        background-color: #e5e5e5;
      }
    }
  }

  &:after {
    position: absolute;
    top: 0;
    bottom: 0;
    right: -30px;
    width: 30px;
    content: "";
    box-shadow: inset 10px 0 8px -8px #f0f1f2;
  }
}
</style>
