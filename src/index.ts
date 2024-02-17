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
  constructor(description: string, completed: boolean) {
    this.taskId = Task.id;
    Task.id++;
    this.description = description;
    this.completed = completed;
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
const task1 = new Task("one ", false);
const task2 = new Task("two ", false);
const task3 = new Task("three ", false);
const task4 = new Task("three ", false);
const taskManager = new TaskManager();
taskManager.add(task1.taskData());
taskManager.add(task2.taskData());
taskManager.add(task3.taskData());
taskManager.add(task4.taskData());
taskManager.removeTask(3);
console.log(taskManager.getTasks());
