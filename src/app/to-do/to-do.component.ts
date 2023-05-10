import { Component, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Task, Todo } from '../model';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-to-do',
    templateUrl: './to-do.component.html',
    styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit, OnChanges {

    ngOnChanges(changes: SimpleChanges): void {
        console.info('changes:', changes)
        const c = changes['todo']
        if (c.firstChange) {
            return
        }
        const td: Todo = c.currentValue as Todo
        this.todoForm = this.createForm(c.currentValue as Todo)
    }

    todoForm!: FormGroup
    todo!: Todo
    tasksArray!: FormArray

    @Output()
    onNewTask = new Subject<Todo>

    fb: FormBuilder = inject(FormBuilder)

    ngOnInit(): void {
        this.todoForm = this.createForm(this.todo)
    }


    private createForm(todo: Todo | null): FormGroup {
        this.tasksArray = this.fb.array([])
        return new FormGroup({
            title: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
            name: new FormControl<string>('', [Validators.required]),
            tasks: this.tasksArray
        })
    }

    processTodo() {
        const todo: Todo = this.todoForm.value
        console.info(todo)
        localStorage.setItem("todo", JSON.stringify(todo))

        this.todoForm = this.createForm(null)

    } 

    removeATask(i: number) {
        this.tasksArray.removeAt(i)
    }

    addATask() {
        this.tasksArray.push(this.createTask(null))
    }

    private createTask(task: Task | null): FormGroup {
        return new FormGroup({
            task: new FormControl<string>('', [Validators.required]),
            priority: new FormControl<string>('low'),
            due: new FormControl<string>('', [Validators.required]),
        })
    }

    private createTasks(tasks: Task[]): FormArray {
        return this.fb.array(tasks.map(t => this.createTask(t)))
    }

    validForm() {
        return this.todoForm.valid && this.tasksArray.length > 0
    }
    
}
