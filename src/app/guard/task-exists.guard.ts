import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskService } from '../services/task.service';

@Injectable({
  providedIn: 'root'
})
export class TaskExistsGuard implements CanActivate {
  constructor(private taskService: TaskService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const taskId = +route.paramMap.get('id')!;
    const taskExists = this.taskService.getTasks().some(task => task.id === taskId);
    console.log('TaskExistsGuard activated.');
    if (taskExists) {
      return true;
    } else {
      console.log('Task does not exist. Navigation prevented.');
      this.router.navigate(['/tasks']);
      return false;
    }
  }
}
