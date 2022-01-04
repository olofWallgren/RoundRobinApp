import React from 'react';
import "./todo.css";


interface Props {
    todo: any,
}

const Todo = ({ todo }: Props) => {

    const alertColor = (c: boolean) => {
        if (c === true) {
            return 'success';
        } else {
            return 'danger';
        }

    }

    const isCompleted = (comp: boolean) => {
        return comp ? (
            <p>done</p>
        ) : (
            <p>NOT FINISHED!!!</p>
        )
    }

    const userIcon = (id: number) => {
        switch (id) {
            case 1:
            return <p>Bajsmannen</p>;

            case 2: 
            return <p>Korvkiosk</p>;

            default:
            return <p>Mongo</p>;

        }
    }

    return (
        <div className={ `todoContainer ${alertColor(todo.completed)}`}>
        <div className="user">  <p>User: </p> {userIcon(todo.userId)} </div>
          {todo.title} - {isCompleted(todo.completed)}
        </div>
    )
}

export default Todo;