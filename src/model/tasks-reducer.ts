import type {TasksState} from '../App'
import {CreateTodolistAt, DeleteTodolistAT} from "./todolists-reducer.ts";
import {v1} from "uuid";

const initialState: TasksState = {}

type deleteTaskAT = ReturnType<typeof deleteTaskAC>
type createTaskAT = ReturnType<typeof createTaskAC>
type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>


export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'create-todolist': {
            return {...state,[action.payload.id]:[]}
        }
        case 'delete_todolist':{
            delete state[action.payload.id]
            return state
        }
        case 'delete-task':{
            return {...state,[action.payload.todolistId]: state[action.payload.todolistId].filter(task=> task.id!==action.payload.taskId)}
        }
        case 'create-task':{
            const newTask = {id:v1(),title:action.payload.title,isDone: false};
            return {...state,[action.payload.todolistId]: [newTask,...state[action.payload.todolistId]]}
        }
        case 'change-task-status':{
            return {...state,[action.payload.todolistId]:state[action.payload.todolistId].map(task=>task.id===action.payload.taskId? {...task,isDone:action.payload.isDone}:task)}
        }
        case 'change-task-title':{
            return {...state,[action.payload.todolistId]:state[action.payload.todolistId].map(task=>task.id===action.payload.taskId? {...task,title:action.payload.title}:task)}
        }
        default:
            return state
    }
}

export const deleteTaskAC =(payload:{ todolistId: string, taskId: string})=>{
    return {
        type: 'delete-task',
        payload:{
            todolistId: payload.todolistId,
            taskId: payload.taskId
        }
    }as const
}

export const createTaskAC =(payload:{todolistId: string, title: string})=>{
    return {
        type:'create-task',
        payload:{
            todolistId: payload.todolistId,
            title: payload.title
        }
    } as const
}

export const changeTaskStatusAC=(payload:{todolistId: string, taskId: string, isDone: boolean })=>{
    return  {
        type:'change-task-status',
        payload:{
            todolistId:payload.todolistId,
            taskId:payload.taskId,
            isDone: payload.isDone,
        }
    } as const
}

export const changeTaskTitleAC=(payload:{todolistId:string,taskId:string,title:string})=>{
    return {
        type:'change-task-title',
        payload:{
            todolistId:payload.todolistId,
            taskId:payload.taskId,
            title:payload.title
        }
    }as const
}

type Actions = CreateTodolistAt | DeleteTodolistAT |deleteTaskAT|createTaskAT |changeTaskStatusAT|changeTaskTitleAT