import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filterOption: string = 'all'; // Default filter option

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // this.taskService.tasks$.subscribe(tasks => this.tasks = tasks);
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      this.filterTasks(); // Apply filtering when tasks change
    });
  }

  setFilterOption(option: string): void {
    // alert('ok');
    this.filterOption = option;
    this.filterTasks(); // Apply filtering when the filter option changes
  }

  filterTasks(): void {
    if (this.filterOption === 'all') {
      this.filteredTasks = this.tasks;
    } else if (this.filterOption === 'completed') {
      this.filteredTasks = this.tasks.filter(task => task.isCompleted);
    } else if (this.filterOption === 'incomplete') {
      this.filteredTasks = this.tasks.filter(task => !task.isCompleted);
    }
  }
  

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }

  toggleTask(id: number): void {
    this.taskService.completeTask(id);
  }

}
