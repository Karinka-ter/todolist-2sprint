import {type ChangeEvent} from 'react'
import type {FilterValues, Task, Todolist} from './App'
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from "@mui/material/Button";
import {Box, Checkbox, List, ListItem} from "@mui/material";

type Props = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeTodolistFilter: (todolistId: string, filter: FilterValues) => void
    addTask: (todolistId: string, title: string) => void
    toggleTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
    updateTodolistTitle: (id: string, title: string) => void
    updateTaskTitle: (todoId: string, title: string, taskId: string) => void
}

export const TodolistItem = (props: Props) => {
    const {
        todolist: {id, title, filter},
        tasks,
        deleteTask,
        changeTodolistFilter,
        addTask,
        toggleTaskStatus,
        deleteTodolist,
        updateTodolistTitle,
        updateTaskTitle
    } = props


    const taskTitle = (title: string) => {
        addTask(id, title)
    }

    const changeFilterHandler = (filter: FilterValues) => {
        changeTodolistFilter(id, filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    const onEditTitleTodo = (title: string) => {
        updateTodolistTitle(id, title)
    }


    return (
        <div>
            <div className={'container'}>
                <h3>
                    <EditableSpan value={title} onEditTitle={onEditTitleTodo}/>
                </h3>
                <IconButton onClick={deleteTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <CreateItemForm onGetTitle={taskTitle}/>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteTask(id, task.id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            toggleTaskStatus(id, task.id, newStatusValue)
                        }

                        const onEditTitleTask = (title: string) => {
                            updateTaskTitle(id, title, task.id)
                        }

                        return (
                            <ListItem key={task.id} className={task.isDone ? 'is-done' : ''}
                                      sx={{p: 0, justifyContent: 'space-between', opacity: task.isDone ? 0.5 : 1}}>
                                <div>
                                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                    <EditableSpan value={task.title} onEditTitle={onEditTitleTask}/>
                                </div>
                                <IconButton onClick={deleteTaskHandler}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            )}
             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        color={'inherit'}
                        onClick={() => changeFilterHandler('all')}>
                    All
                </Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'}
                        onClick={() => changeFilterHandler('active')}>
                    Active
                </Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={() => changeFilterHandler('completed')}>
                    Completed
                </Button>
            </Box>
        </div>
    )
}
