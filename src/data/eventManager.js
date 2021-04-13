//where we're serving our json file
const remoteURL = "http://localhost:8088"

export const getEventById = (id) => {
  //fetch call to grab tasks by their Id. 
  return fetch(`${remoteURL}/events/${id}?_expand=`)
  .then(res => res.json())
}

export const getAllEvents = () => {
    //fetch call that displays all of the tasks. 
  return fetch(`${remoteURL}/events/?_expand=`)
  .then(result => result.json())
}

export const addEvent = (newEvent) => {
  return fetch(`${remoteURL}/events`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(newEvent)
  }).then(response => response.json())
}


export const updateEvent = (editedEvent) =>{
  return fetch(`${remoteURL}/event/${editedEvent.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editedEvent)
  }).then(data => data.json());
}

export const deleteEvent = (id) => {
  return fetch(`${remoteURL}/event/${id}`, {
    method: "DELETE"
  }).then(result => result.json())
}
