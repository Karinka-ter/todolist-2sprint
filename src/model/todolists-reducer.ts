import {Todolist} from "../App.tsx";
import {v1} from "uuid";

export type DeleteTodolistAT = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAt = ReturnType<typeof createTodolistAC>
export type changeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>

type ActionType = DeleteTodolistAT | CreateTodolistAt|changeTodolistTitleAT

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