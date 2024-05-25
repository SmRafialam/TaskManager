import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  // title: string = '';
  taskArray = [{title:'Task1', isCompleted:false}]
  // taskArray:any = [];
  taskForm!: FormGroup;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      isCompleted: new FormControl(false)

   });
  }

  get f() { 
    return this.taskForm.controls; 
  }


  onSubmitTask() {
    console.log(this.taskForm.value);

    if (this.taskForm.valid) {
      this.taskService.addTask(this.taskForm.value.title);
      this.taskForm.reset();
    }
  }
}
