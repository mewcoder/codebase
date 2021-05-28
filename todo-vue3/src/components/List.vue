<!--
 * @Description: 
 * @Author: zhaodacheng5
 * @Date: 2021-05-28 15:52:00
 * @LastEditors: zhaodacheng5
 * @LastEditTime: 2021-05-28 20:31:47
-->
<template>
  <div>
    <div class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox" />
      <label for="toggle-all"></label>
      <ul class="todo-list">
        <li
          v-for="todo in data.filteredList"
          class="todo"
          :key="todo.id"
          :class="{
            completed: todo.completed,
            editing: todo === data.editTodo,
          }"
        >
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed" />
            <label @dblclick="editTodo(todo)">{{ todo.content }}</label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
          <input
            class="edit"
            type="text"
            v-model="todo.content"
            v-todo-focus="todo === data.editTodo"
            @blur="doneEdit(todo)"
            @keyup.enter="doneEdit(todo)"
            @keyup.escape="cancelEdit(todo)"
          />
        </li>
      </ul>
    </div>
    <footer class="footer" v-show="todolist.length">
      <span class="todo-count">
        <strong>{{ data.remainCount }}</strong>
        <span> 个未完成</span>
      </span>
      <ul class="filters">
        <li>
          <button
            :class="{ selected: data.show === 'all' }"
            @click="changeShow('all')"
          >
            全部
          </button>
        </li>
        <li>
          <button
            :class="{ selected: data.show === 'active' }"
            @click="changeShow('active')"
          >
            未完成
          </button>
        </li>
        <li>
          <button
            :class="{ selected: data.show === 'completed' }"
            @click="changeShow('completed')"
          >
            已完成
          </button>
        </li>
      </ul>

      <button
        class="clear-completed"
        @click="removeCompleted"
        v-show="todolist.length > data.remainCount"
      >
        清除已完成
      </button>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, computed } from "vue";

const filters = {
  all(todos) {
    return todos;
  },
  active(todos) {
    return todos.filter((todo) => {
      return !todo.completed;
    });
  },
  completed(todos) {
    return todos.filter(function (todo) {
      return todo.completed;
    });
  },
};

export interface ColumnProps {
  id: number;
  content: string;
  completed: boolean;
}

export default defineComponent({
  name: "List",
  props: {
    todolist: {
      // 把构造函数断言为类型 好处：可以在模板或setup中获取到类型
      type: Array as PropType<ColumnProps[]>,
      required: true,
    },
  },
  emits: ["saveList"],
  setup(props, context) {
    const data = reactive({
      editTodo: null,
      show: "all",
      remainCount: computed(() => {
        return filters.active(props.todolist).length;
      }),
      filteredList: computed(() => {
        const list = props.todolist;
        return filters[data.show](list);
      }),
    });

    let beforeEditCache = "";

    function editTodo(todo) {
      beforeEditCache = todo.content;
      data.editTodo = todo;
      console.log(data.editTodo);
    }

    function doneEdit(todo) {
      if (!data.editTodo) {
        return;
      }
      data.editTodo = null;
      todo.content = todo.content.trim();
      if (todo.content) {
        console.log(props.todolist);
        context.emit("saveList", props.todolist);
      }
    }

    function cancelEdit(todo) {
      data.editTodo = null;
      todo.content = beforeEditCache;
    }

    function removeTodo(todo) {
      const list = props.todolist;
      list.splice(props.todolist.indexOf(todo));
      context.emit("saveList", list);
    }

    function removeCompleted() {
      const list = filters.active(props.todolist);
      context.emit("saveList", list);
    }

    function changeShow(show) {
      console.log(show);
      data.show = show;
    }
    return {
      data,
      editTodo,
      doneEdit,
      cancelEdit,
      removeTodo,
      removeCompleted,
      changeShow,
    };
  },
  directives: {
    "todo-focus": (el, { value }) => {
      if (value) {
        el.focus();
        console.log("focus");
      }
    },
  },
});
</script>

<style scoped></style>
