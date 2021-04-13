import React from "react"
import "./tasks.css"
// import { Link } from "react-router-dom"

export const TaskCard = ({ task, handleDeleteTask }) => {
    return (
      <div className="card">
        <div className="card-content">
          <h3><span className="card-taskname">
            {task.name}
          </span></h3>
          <h6>Task For: {task.user.name}</h6>
          <p>Task For: {task.description}</p>
          {/* <Link to={`/tasks/${task.id}/edit`}>
            <button type="button">Edit</button>
          </Link> */}
          <button type="button" onClick={() => handleDeleteTask(task.id)}>Delete Task</button>
        </div>
      </div>
    );
}