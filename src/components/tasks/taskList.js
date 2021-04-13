import React, { useState, useEffect } from 'react';
import { TaskCard } from './tasksCard'
import { deleteTask, getAllTasks } from '../../data/taskManager'
import { useHistory } from 'react-router-dom';

export const TaskList = () => {
    const [Tasks, setTasks] = useState([]);

    const history = useHistory();

    const getTasks = () => {
       return getAllTasks()
            .then(tasksFromAPI => {
                console.log("tasks from API", tasksFromAPI)
                setTasks(tasksFromAPI)
            });
    };

    const handleDeleteTask = (id) => {
        deleteTask(id)
            .then(() => getAllTasks()
                .then(setTasks))
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <>
            <section className="section-content">
                <button type="button"
                    className="btn"
                    onClick={() => { history.push("/tasks/create") }}>
                    Add Task
                </button>
            </section>
            <div className="conatiner-cards">
                {Tasks.map(task =>
                    <TaskCard key={task.id} task={task} handleDeleteTask={handleDeleteTask} />)}
            </div>
        </>
    )
};