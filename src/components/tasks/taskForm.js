import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { addTask } from '../../data/taskManager';
import { getAllUsers } from '../../data/usersManager';
import './taskForm.css';

export const TaskForm = () => {
    const [task, setTask] = useState({
        name: "",
        description: "",
        completion: "",
        userId: 0
    });

    const [isLoading, setIsLoading] = useState(false);
    const [users,  setUsers] = useState([]);

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newTask = { ...task }
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newTask[event.target.id] = selectedVal
            setTask(newTask)
    }

    useEffect(() => {
        getAllUsers()
            .then(usersFromAPI => {
                setUsers(usersFromAPI)
        });
        setIsLoading(false)
}, []);

    const handleClickSaveTask = (event) => {
        event.preventDefault()

        const userId = task.userId

        if (userId === 0 ) {
            window.alert("Please select an user")
        }
        else {
            addTask(task)
                .then(() => history.push("/tasks"))
        }
    }

    return (
        <form className="taskForm">
            <h2 className="taskFrom_title">Add New Task</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Task: </label>
                    <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Task" value={task.name} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" id="description" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Description" value={task.description} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="completion">Completion: </label>
                    <input type="text" id="completion" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="01/01/2020" value={task.completion} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="user">Posted By: </label>
                    <select value={task.userId} name="userId" id="userId" onChange={handleControlledInputChange} className="form-control">
                        <option value="0">Select User</option>
                        {users.map(u => (
                            <option key={u.id} value={u.id}>
                                {u.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <button className="btn btn-primary"
                onClick={handleClickSaveTask} disabled={isLoading}>
                Save Task
            </button>
        </form>
    )
}