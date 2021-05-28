<!--
 * @Description: 
 * @Author: zhaodacheng5
 * @Date: 2021-05-28 15:52:00
 * @LastEditors: zhaodacheng5
 * @LastEditTime: 2021-05-28 18:44:18
-->
<template>
  <div class="todoapp">
    <header class="header">
      <h1>todolist</h1>
      <input
        class="new-todo"
        autofocus
        autocomplete="off"
        placeholder="请输入"
        v-model="data.input"
        @keyup.enter="addTodo"
      />
    </header>
    <list :todolist="data.todoList" @saveList="onSaveList"></list>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watchEffect } from "vue";
import todoStorage from "../storage.js";
import "./List.vue";
import List from "./List.vue";

export default defineComponent({
  components: { List },
  name: "Todo",
  component: "List",
  setup() {
    const data = reactive({
      input: "",
      todoList: todoStorage.fetch(),
      
    });

    function addTodo() {
      const value = data.input && data.input.trim();
      if (!value) return;
      data.todoList.push({
        id: todoStorage.uid++,
        content: value,
        completed: false,
      });
      data.input = "";
    }
    watchEffect(() => {
      todoStorage.save(data.todoList);
    });

    function onSaveList(list) {
      data.todoList = list;
    }
    return { data, addTodo, onSaveList };
  },
});
</script>

<style scoped></style>
