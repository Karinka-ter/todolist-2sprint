import {FilterValues, Todolist} from "../App.tsx";
import {v1} from "uuid";

export type DeleteTodolistAT = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAt = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type changeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>

type ActionType = DeleteTodolistAT | CreateTodolistAt|ChangeTodolistTitleAT|changeTodolistFilterAT

export const todoListsReducer = (todoLists: Todolist[], action: ActionType): Todolist[] => {
    switch (action.type) {
        case "delete_todolist":
            return todoLists.filter(todolist => todolist.id !== action.payload.id)
        case 'create-todolist':
            const todolistId = v1()
            const newTodolist: Todolist = {id: todolistId, title: action.payload.title, filter: 'all'}
            return [newTodolist, ...todoLists]
        case 'change-todolist-title':
            return todoLists.map(todolist => todolist.id===action.payload.id? {...todolist,title:action.payload.title}:todolist)
        case 'change-todolist-filter':
            return todoLists.map(todoList=> todoList.id===action.payload.id? {...todoList,filter:action.payload.filter}:todoList)
        default:
            return todoLists
    }

}

export const deleteTodolistAC = (id: string) => {
    return {
        type: 'delete_todolist',
        payload: {
            id: id,
        }
    } as const
}

export const createTodolistAC = (title:string)=>{
    return {
        type: 'create-todolist',
        payload:{
            title: title
        }
    } as const
}

export const changeTodolistTitleAC = (payload:{id:string,title:string})=>{
    return {
        type:'change-todolist-title',
        payload:{
            id: payload.id,
            title: payload.title
        }
    } as const
}

export const changeTodolistFilterAC = (payload:{id: string, filter: FilterValues})=>{
    return {
        type: 'change-todolist-filter',
        payload:{
            id: payload.id,
            filter: payload.filter
        }
    } as const
}