import { Component, Input, OnInit, Output } from '@angular/core';
import { Todo, TodoList } from '../model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{

    @Input()
    todoList!: Todo[]

    @Output()
    

    ngOnInit(): void {
        const data = localStorage.getItem('todo')
        if (!!data) {
            this.todoList = JSON.parse(data)
        }
    }

    
}
