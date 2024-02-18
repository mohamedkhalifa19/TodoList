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
  private tasks: ITask[] = [];

  // Methods

  // add task
  add(task: ITask): void {
    this.tasks.push(task);
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
todoBtn?.addEventListener("click", (): void => {
  let todoTextInput: HTMLInputElement | null =
    document.querySelector(".todo-text");
  const desc: string = todoTextInput?.value || "";
  const task = new Task(desc);
  taskManager.add(task.taskData());
  if (todoTextInput) todoTextInput.value = "";
  createTasks(taskManager.getTasks());
});
