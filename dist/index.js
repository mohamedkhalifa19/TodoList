"use strict";
// task Interface
class Task {
    //   Constructor
    constructor(description, completed) {
        this.taskId = Task.id;
        Task.id++;
        this.description = description;
        this.completed = completed;
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
