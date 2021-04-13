import React from "react";
import "./tasks.css"
import { useHistory } from "react-router-dom";

export const TaskCard = ({ task, handleDeleteTask }) => { 

    const history = useHistory();

    return (
    <div className="card">
        <div className="card-content">
            <h3>Task Name: <span className="card-taskName">{task.name}</span></h3>
            <p>Task Description: {task.description}</p>
            <button type="button" onClick={() => history.push(`/tasks/${task.id}/edit`)}> Edit </button>
            <button type="button" onClick={() => handleDeleteTask(task.id)}>DELETE</button>
        </div>
    </div>
    )
}