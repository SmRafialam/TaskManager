import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks$ = this.taskService.tasks$;
  // tasks$: Observable<Task[]>;
  
  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$;
   }

  ngOnInit(): void { }
}
