import React, { useState, useEffect } from 'react';
import { TaskCard } from './tasksCard'
import { deleteTask, getAllTasks, updateTask } from '../../data/taskManager'
import { useHistory } from 'react-router-dom';

export const TaskList = () => {
    const [Tasks, setTasks] = useState([]);

    const history = useHistory();
    
    const currentUser = JSON.parse(sessionStorage.getItem("nutshell_user"))

    const getTasks = () => {
       return getAllTasks()
            .then(tasksFromAPI => {
                setTasks(tasksFromAPI)
            });
    };

    const handleDeleteTask = (id) => {
        deleteTask(id)
            .then(() => getAllTasks()
                .then(setTasks))
    };

    const handleCompleteTask = (task => {
        //? copy task infoirmation
        let incompleteTask = {...task}
        //? takes information and changes the keys
        const completeTask = {
            id: incompleteTask.id,
            userId: currentUser,
            name: incompleteTask.name,
            description: incompleteTask.description,
            completion: incompleteTask.completion,
            isCompleted: true
        }
        console.log(completeTask)
        //? updates the task
        updateTask(completeTask)
        //? resets the state
        .then(()=> getAllTasks()
            .then(setTasks))
    })

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <>
            <div className="conatiner-cards">
                {Tasks.map(task =>
                    <TaskCard key={task.id} task={task} handleCompleteTask={handleCompleteTask} handleDeleteTask={handleDeleteTask} />)}
            </div>
            <section className="section-content">
                <button type="button"
                    className="btn"
                    onClick={() => { history.push("/tasks/create") }}>
                    Add Task
                </button>
            </section>
        </>
    )
};
