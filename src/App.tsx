import './App.css'
import {useState} from 'react'
import {v1} from 'uuid'
import {TodolistItem} from './TodolistItem'
import {CreateItemForm} from "./CreateItemForm.tsx";
import {AppBar, Container, Grid, Paper, Toolbar} from '@mui/material';
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from '@mui/icons-material/Menu'

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export type TasksState = Record<string, Task[]>

export const App = () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    const changeTodolistFilter = (todolistId: string, filter: FilterValues) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const toggleTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, isDone} : task)})
    }

    const addTodolist = (title: string) => {
        const todoId = v1()
        const newTodo: Todolist = {id: todoId, title, filter: 'all'}
        setTodolists([newTodo, ...todolists])
        setTasks({...tasks, [todoId]: []})
    }

    const updateTodolistTitle = (id: string, title: string) => {
        setTodolists(todolists.map(el => el.id === id ? {...el, title} : el))
    }

    const updateTaskTitle = (todoId: string, title: string, taskId: string) => {
        setTasks({...tasks, [todoId]: tasks[todoId].map(el => el.id === taskId ? {...el, title} : el)})
    }

    return (
        <div className="app">
            <AppBar position="static" sx={{ mb: '30px' }}>
                <Toolbar>
                    <Container maxWidth={'lg'}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                            <Button color="inherit">Sign in</Button>
                    </Container>
                </Toolbar>
            </AppBar>
            <Container maxWidth={'lg'}>
                <Grid container sx={{ mb: '30px' }}>
            <CreateItemForm onGetTitle={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
            {todolists.map(todolist => {
                const todolistTasks = tasks[todolist.id]
                let filteredTasks = todolistTasks
                if (todolist.filter === 'active') {
                    filteredTasks = todolistTasks.filter(task => !task.isDone)
                }
                if (todolist.filter === 'completed') {
                    filteredTasks = todolistTasks.filter(task => task.isDone)
                }

                return (
                    <Grid key={todolist.id}>
                        <Paper sx={{ p: '0 20px 20px 20px' }}>
                    <TodolistItem key={todolist.id}
                                  todolist={todolist}
                                  tasks={filteredTasks}
                                  deleteTask={deleteTask}
                                  changeTodolistFilter={changeTodolistFilter}
                                  addTask={addTask}
                                  toggleTaskStatus={toggleTaskStatus}
                                  deleteTodolist={deleteTodolist}
                                  updateTodolistTitle={updateTodolistTitle}
                                  updateTaskTitle={updateTaskTitle}
                    />
                            </Paper>
                    </Grid>
                )
            })}
                </Grid>
            </Container>
        </div>
    )
}
