import {Todolist} from "../App.tsx";

export type DeleteTodolistActionType = {
    type: 'delete_todolist'
    payload:{
        todolistId: string
    }
}

export const todolistsReducer =(todolists:Todolist[],action:DeleteTodolistActionType):Todolist[]=>{
    switch (action.type) {
        case "delete_todolist":
            return todolists.filter(todolist => todolist.id !== action.payload.todolistId)
        default:
            return todolists
    }

}