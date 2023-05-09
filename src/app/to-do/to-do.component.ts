import { Component, OnInit, Output, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../model';

@Component({
    selector: 'app-to-do',
    templateUrl: './to-do.component.html',
    styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

    todoForm!: FormGroup
    todo!: Todo
    tasksArray!: FormArray

    @Output()
    onNewTask = new Subject<>

    fb: FormBuilder = inject(FormBuilder)

    ngOnInit(): void {
        this.todoForm = this.createForm()
    }


    private createForm(): FormGroup {
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

        this.todoForm = this.createForm()

    } 

    removeATask(i: number) {
        this.tasksArray.removeAt(i)
    }

    addATask() {
        this.tasksArray.push(this.createTasksList())
    }

    private createTasksList(): FormGroup {
        return new FormGroup({
            task: new FormControl<string>('', [Validators.required]),
            priority: new FormControl<string>('low'),
            due: new FormControl<string>('', [Validators.required]),
        })
    }

    validForm() {
        return this.todoForm.valid && this.tasksArray.length > 0
    }
    
}
