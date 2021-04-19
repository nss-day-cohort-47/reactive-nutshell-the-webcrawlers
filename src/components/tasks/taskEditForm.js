// Authored by: Jackson Goodman
// Edit Form for users to edit the tasks that have posted.

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { updateTask, getTaskById } from "../../data/taskManager";
import { getAllTasks } from "../../data/taskManager";
import { getAllUsers } from "../../data/usersManager";

export const TaskEditForm = () => {
  const [task, setTask] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { taskId } = useParams();
  const history = useHistory();

  const [users, setUsers] = useState([]);

  const handleFieldChange = evt => {
    const stateToChange = { ...task };
    let selectedVal = evt.target.value
    if (evt.target.id.includes("Id")) {
      selectedVal = parseInt(selectedVal)
    }
    // look in the animal object copy and find the id of the key we are looking for
    stateToChange[evt.target.id] = selectedVal
    setTask(stateToChange);
  };

  const updateExistingTask = evt => {
    evt.preventDefault()
        setIsLoading(true);

    // This is an edit, so we need the id
    debugger
    const editedTask = {
      id: taskId,
      name: task.name,
      description: task.description,
      completion: task.completion,
      userId: task.userId,
      isCompleted: false
    };

    const userId = task.userId

    if (userId === 0 ) {
      window.alert("Please fill out all fields")
    } else {
      updateTask(editedTask)
        .then(() => history.push("/tasks")  //! Something Here
      )
    }
  }

  useEffect(() => {
    getTaskById(taskId)
      .then(task => {
        setTask(task);
            setIsLoading(false);
      });
  }, [taskId]);

  useEffect(() => {
    getAllUsers()
      .then(usersFromAPI => {
        setUsers(usersFromAPI)
      });
  }, []);

  return (
    <>
      <form>
        <fieldset>
          <div className="formgrid">
            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="name"
              value={task.name}
            />
            <label htmlFor="name">Task Name</label>

            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="description"
              value={task.description}
            />
            <label htmlFor="description">Description</label>

            {/* DATE EDITING */}
            <input
              type="date"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="completion"
              value={task.completion}
            />
            <label htmlFor="completion">Completion Goal</label>


            {/* <select
              value={task.userId}
              name="userId"
              id="userId"
              onChange={handleFieldChange}
              className="form-control" >
              <option value="0">Select a user</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
            <label htmlFor="user">Task Posted By: </label> */}

          </div>
          <div className="alignRight">
            <button
              type="button" disabled={isLoading}
              onClick={updateExistingTask}
              className="btn btn-primary"
            >Save</button>
          </div>
        </fieldset>
      </form>
    </>
  );
}