import {type ChangeEvent, type KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from '@mui/icons-material/AddBox'

type Props = {
    onGetTitle: (title: string) => void
};

export const CreateItemForm = ({onGetTitle}: Props) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }

    const onClickHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            onGetTitle(taskTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickHandler()
        }

    }

    return (
        <div>
            <TextField label={'Enter a title'}
                       variant={'outlined'}
                       className={error ? 'error' : ''}
                       value={taskTitle}
                       size={'small'}
                       error={!!error}
                       helperText={error}
                       onChange={changeTitleHandler}
                       onKeyDown={onKeyDownHandler}/>

            <IconButton onClick={onClickHandler} color={'primary'}>
                <AddBoxIcon/>
            </IconButton>
        </div>
    );
};