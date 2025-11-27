import {Button} from "./Button.tsx";
import {type ChangeEvent, type KeyboardEvent, useState} from "react";

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
            <input
                className={error ? 'error' : ''}
                value={taskTitle}
                onChange={changeTitleHandler}
                onKeyDown={onKeyDownHandler}
            />
            <Button title={'+'} onClick={onClickHandler}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};