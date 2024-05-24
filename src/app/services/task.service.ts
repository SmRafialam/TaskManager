import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskSubject = new BehaviorSubject<Task[]>(this.loadTasks())
  tasks$: Observable<Task[]> = this.taskSubject.asObservable()

  constructor() { }

  loadTasks(): Task[] {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }


  saveTasks(tasks: Task[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks(): Task[] {
    return this.taskSubject.value;
  }

  addTask(title: string): void {
    const tasks = this.getTasks();
    const newTask: Task = { id: Date.now(), title, completed: false };
    tasks.push(newTask);
    this.saveTasks(tasks);
    this.taskSubject.next(tasks);
  }

  completeTask(id: number): void {
    const tasks = this.getTasks().map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.saveTasks(tasks);
    this.taskSubject.next(tasks);
  }

  deleteTask(id: number): void {
    const tasks = this.getTasks().filter(task => task.id !== id);
    this.saveTasks(tasks);
    this.taskSubject.next(tasks);
  }
}
