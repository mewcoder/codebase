const { createApp, reactive, computed, watchEffect, onMounted, onUnmounted } =
  Vue;

const todoStorage = {
  fetch() {
    console.log("fetch list...");
    const todolist = JSON.parse(localStorage.getItem("todolist") || "[]");
    // todolist.forEach((todo, index) => {
    //     todo.id = 1000 + index;
    // });
    todoStorage.uid = todolist.length;
    return todolist;
  },
  save(todos) {
    localStorage.setItem("todolist", JSON.stringify(todos));
  },
};

createApp({
  setup() {
    const data = reactive({
      input: "",
      todoList: todoStorage.fetch(),
    });

    function addTodo() {
      console.log("addtodo");
      const value = newTodo && newTodo.trim();
      if (!value) return;
      data.todoList.push({
        id: todoStorage.uid++,
        content: value,
        completed: false,
      });
      data.input = "";
    }

    return { data, addTodo };
  },
}).mount("#app");
