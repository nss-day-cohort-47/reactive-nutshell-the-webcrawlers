import React from "react";
import "./tasks.css"
import { useHistory } from "react-router-dom";

export const TaskCard = ({ task, handleDeleteTask, handleCompleteTask }) => { 

    const currentUser = JSON.parse(sessionStorage.getItem("nutshell_user"))

    const history = useHistory();

    return (
    <div className="card">
        <div className="card-content">
            {task.isCompleted === true
            ? <h3 className="complete">COMPLETED</h3>
            : <h2 className="incomplete">Incomplete Task</h2>
            }
            <h3><span className="card-taskName">{task.name}</span></h3>
            <h6><em>{task.user.location}</em></h6>
            <p>Task Description: {task.description}</p>
            <p>Posted By: {task.user.name}</p>
            {task.isCompleted === true
             ? ""
             :<p>Completion Goal: {task.completion}</p>
            }
            {task.isCompleted === true
             ? ""
             : <button type="button" onClick={() => history.push(`/tasks/${task.id}/edit`)}> Edit </button>
            }
            {task.isCompleted === true
             ? ""
             : <button type="button" onClick={() => handleDeleteTask(task.id)}>Delete</button>
            }
            {task.isCompleted === true 
             ? ""
             : <button type="button" onClick={() => handleCompleteTask(task)}>Complete</button>
            }
        </div>
    </div>
    )
}