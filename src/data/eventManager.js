//where we're serving our json file
const remoteURL = "http://localhost:8088"

export const getTaskById = (id) => {
  //fetch call to grab tasks by their Id. 
  return fetch(`${remoteURL}/tasks/${id}?_expand=`)
  .then(res => res.json())
}

export const getAllTasks = () => {
    //fetch call that displays all of the tasks. 
  return fetch(`${remoteURL}/tasks/?_expand=`)
  .then(result => result.json())
}

export const addTask = (newTask) => {
  return fetch(`${remoteURL}/tasks`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
  }).then(response => response.json())
}




/*
export const updateEmployee = (editedEmployee) =>{
  return fetch(`${remoteURL}/employees/${editedEmployee.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editedEmployee)
  }).then(data => data.json());
}

export const deleteEmployee = (id) => {
  return fetch(`${remoteURL}/employees/${id}`, {
    method: "DELETE"
  }).then(result => result.json())
}
*/