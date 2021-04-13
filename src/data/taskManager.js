const remoteURL = "http://localhost:8088"

export const getTaskById = (id) => {
    return fetch (`${remoteURL}/tasks/${id}?_expand=user`)
    .then(res => res.json())
}

export const getAllTasks = () => {
    return fetch (`${remoteURL}/tasks/`)
    .then(res => res.json)
}

export const addTasks = (newTasks) => {
    return fetch(`${remoteURL}/tasks/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTasks)
    }).then(response => response.json())
}

export const updateTask = (editedTask) =>{
    return fetch(`${remoteURL}/employees/${editedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedTask)
    }).then(data => data.json())
}

export const deleteTask = (id) => {
    return fetch(`${remoteURL}/tasks/${id}`, {
        method: "DELETE"
    }).then(result => result.json())
}
