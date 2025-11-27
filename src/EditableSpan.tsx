import {ChangeEvent, type KeyboardEvent, useState} from "react";

type Props = {
    value: string
    onEditTitle:(title:string)=>void
};

export const EditableSpan = ({value,onEditTitle}: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [text,setText] = useState(value)

    const onDoubleClickHandler = () => {
        setIsOpen(true)
    }

    const onBlurHandler = () => {
        setIsOpen(false)
        onEditTitle(text)
    }

    const onChangeHandler =(event: ChangeEvent<HTMLInputElement>)=>{
        setText(event.target.value)
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onBlurHandler()
        }

    }


    return (
        <>
            {isOpen ? (
                <input
                    value={text}
                    onBlur={onBlurHandler}
                    autoFocus
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
            ) : (
                <span onDoubleClick={onDoubleClickHandler}>{value}</span>
            )}
        </>


    );
};