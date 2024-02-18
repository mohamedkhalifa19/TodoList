// task Interface

interface ITask {
  id: number;
  description: string;
  completed: boolean;
}

class Task {
  // fields
  private static id: number = 0;
  private description: string;
  private completed: boolean;
  private taskId: number;
  //   Constructor
  constructor(description: string) {
    this.taskId = Task.id;
    Task.id++;
    this.description = description;
    this.completed = false;
  }
  //   Methods
  taskData(): ITask {
    return {
      id: this.taskId,
      description: this.description,
      completed: this.completed,
    };
  }
}
class TaskManager {
  data: string | null = localStorage.getItem("tasks");
  private tasks: ITask[] = this.data ? JSON.parse(this.data) : [];

  // Methods

  // add task
  add(task: ITask): void {
    this.tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
  // mark as completed
  markCompleted(id: number): void {
    const targetTaskIndex: number = this.tasks.findIndex(
      (task) => task.id === id
    );
    this.tasks[targetTaskIndex].completed = true;
  }
  //   Remove Task
  removeTask(id: number): void {
    const targetTaskIndex: number = this.tasks.findIndex(
      (task) => task.id === id
    );
    this.tasks.splice(targetTaskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
  // get all tasks
  getTasks(): ITask[] {
    return this.tasks;
  }
}
const taskManager = new TaskManager();
const todos: HTMLElement | null = document.querySelector(".todos");
const todoBtn: HTMLElement | null = document.querySelector(".todo-btn");
// functions
function resetTasks(tasks: ITask[]): void {
  // Reset Todos
  if (todos) todos.innerHTML = "";
  tasks.forEach((task) => {
    todos?.insertAdjacentHTML(
      "beforeend",
      `<div class="todo ${task.completed ? "active" : ""}">
      <div class="todo-desc">${task.description}</div>
      <div class="todo-btns">
        <button class="todo-btn active" onclick="taskManager.markCompleted(${
          task.id
        });resetTasks(taskManager.getTasks());">completed</button>
        <button class="todo-btn delete" onclick="taskManager.removeTask(${
          task.id
        }); resetTasks(taskManager.getTasks());">Delete</button>
      </div>
    </div>`
    );
  });
}
function createTasks(tasks: ITask[]): void {
  // Reset Todos
  if (todos) todos.innerHTML = "";
  tasks.forEach((task) => {
    todos?.insertAdjacentHTML(
      "beforeend",
      `<div class="todo ${task.completed ? "active" : ""}">
    <div class="todo-desc">${task.description}</div>
    <div class="todo-btns">
      <button class="todo-btn active" onclick="taskManager.markCompleted(${
        task.id
      });resetTasks(taskManager.getTasks());">completed</button>
      <button class="todo-btn delete"  onclick="taskManager.removeTask(${
        task.id
      }); resetTasks(taskManager.getTasks());">Delete</button>
    </div>
  </div>`
    );
  });
}

const addTodoFunc = (): void => {
  let todoTextInput: HTMLInputElement | null =
    document.querySelector(".todo-text");
  const desc: string = todoTextInput?.value || "";
  if (desc !== "") {
    const task = new Task(desc);
    taskManager.add(task.taskData());
    if (todoTextInput) todoTextInput.value = "";
    createTasks(taskManager.getTasks());
  }
};
todoBtn?.addEventListener("click", addTodoFunc);
document.addEventListener("keydown", (e): void => {
  if (e.key === "Enter") addTodoFunc();
});
(function () {
  const data: string | null = localStorage.getItem("tasks");
  if (data) {
    const tasks = JSON.parse(data);
    createTasks(tasks);
  }
})();
