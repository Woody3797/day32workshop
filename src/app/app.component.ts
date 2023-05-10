import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Todo } from './model';
import { TaskComponent } from './task/task.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

    // @ViewChild(TaskComponent)
    @ViewChild('task')
    taskComp!: TaskComponent

    ngOnInit(): void {
        
    }

    todos: Todo[] = []
    todo: Todo | null = null
    
    ngAfterViewInit(): void {
        console.info('>>. onAfterViewInit: ', this.taskComp)
        // Performing manual attribute binding
        this.taskComp.value
    }

    deleteTask() {

    }

}
