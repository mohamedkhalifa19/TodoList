"use strict";
// task Interface
class Task {
    //   Constructor
    constructor(description) {
        this.taskId = Task.id;
        Task.id++;
        this.description = description;
        this.completed = false;
    }
    //   Methods
    taskData() {
        return {
            id: this.taskId,
            description: this.description,
            completed: this.completed,
        };
    }
}
// fields
Task.id = 0;
class TaskManager {
    constructor() {
        this.tasks = [];
    }
    // Methods
    // add task
    add(task) {
        this.tasks.push(task);
    }
    // mark as completed
    markCompleted(id) {
        const targetTaskIndex = this.tasks.findIndex((task) => task.id === id);
        this.tasks[targetTaskIndex].completed = true;
    }
    //   Remove Task
    removeTask(id) {
        const targetTaskIndex = this.tasks.findIndex((task) => task.id === id);
        this.tasks.splice(targetTaskIndex, 1);
    }
    // get all tasks
    getTasks() {
        return this.tasks;
    }
}
const taskManager = new TaskManager();
const todos = document.querySelector(".todos");
const todoBtn = document.querySelector(".todo-btn");
// functions
function resetTasks(tasks) {
    // Reset Todos
    if (todos)
        todos.innerHTML = "";
    tasks.forEach((task) => {
        todos === null || todos === void 0 ? void 0 : todos.insertAdjacentHTML("beforeend", `<div class="todo ${task.completed ? "active" : ""}">
      <div class="todo-desc">${task.description}</div>
      <div class="todo-btns">
        <button class="todo-btn active" onclick="taskManager.markCompleted(${task.id});resetTasks(taskManager.getTasks());">completed</button>
        <button class="todo-btn delete" onclick="taskManager.removeTask(${task.id}); resetTasks(taskManager.getTasks());">Delete</button>
      </div>
    </div>`);
    });
}
function createTasks(tasks) {
    // Reset Todos
    if (todos)
        todos.innerHTML = "";
    tasks.forEach((task) => {
        todos === null || todos === void 0 ? void 0 : todos.insertAdjacentHTML("beforeend", `<div class="todo ${task.completed ? "active" : ""}">
    <div class="todo-desc">${task.description}</div>
    <div class="todo-btns">
      <button class="todo-btn active" onclick="taskManager.markCompleted(${task.id});resetTasks(taskManager.getTasks());">completed</button>
      <button class="todo-btn delete"  onclick="taskManager.removeTask(${task.id}); resetTasks(taskManager.getTasks());">Delete</button>
    </div>
  </div>`);
    });
}
const addTodoFunc = () => {
    let todoTextInput = document.querySelector(".todo-text");
    const desc = (todoTextInput === null || todoTextInput === void 0 ? void 0 : todoTextInput.value) || "";
    if (desc !== "") {
        const task = new Task(desc);
        taskManager.add(task.taskData());
        if (todoTextInput)
            todoTextInput.value = "";
        createTasks(taskManager.getTasks());
    }
};
todoBtn === null || todoBtn === void 0 ? void 0 : todoBtn.addEventListener("click", addTodoFunc);
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter")
        addTodoFunc();
});
