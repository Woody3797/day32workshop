export interface Todo {
    title: string
    name: string
    tasks: Task[]
}

export interface Task {
    task: string
    priority: string
    due: string
}

export interface TodoList {
    title: string
    name: string
    tasks: Task[]
}