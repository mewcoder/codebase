/*
 * @Description:
 * @Author: zhaodacheng5
 * @Date: 2021-05-28 16:06:54
 * @LastEditors: zhaodacheng5
 * @LastEditTime: 2021-05-28 20:09:46
 */
const todoStorage = {
  fetch() {
    console.log("fetch...");
    const todos = JSON.parse(localStorage.getItem("todolist") || "[]");
    todos.forEach((todo, index) => {
      todo.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save(list) {
    console.log("save...");
    localStorage.setItem("todolist", JSON.stringify(list));
  },
};

export default todoStorage;
