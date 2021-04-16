//Authored by Salma Crank
//Manages all of our data to be used in the Events module. 

//where we're serving our json file
const remoteURL = "http://localhost:8088"

export const getEventById = (id) => {
  //fetch call to grab tasks by their Id. 
  return fetch(`${remoteURL}/events/${id}?_expand=`)
  .then(res => res.json())
}

export const getEventByDate = (date) => {
  //fetch call to grab tasks by their Id. 
  return fetch(`${remoteURL}/events/${date}?_expand=`)
  .then(res => res.json())
}


export const getAllEvents = () => {
  //fetch call that displays all of the tasks. 
  return fetch(`${remoteURL}/events/?_expand=`)
  .then(result => result.json())
}

export const addEvent = (newEvent) => {
  //fetch call which will render new events to the json file
  return fetch(`${remoteURL}/events`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(newEvent)
  }).then(getAllEvents())
  .catch(err => console.error("An error occurred posting new event", err))
}

export const updateEvent = (editedEvent) =>{
//fetch call which will update the data in the json. 
  return fetch(`${remoteURL}/events/${editedEvent.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editedEvent)
  }).then(data => data.json());
}

export const deleteEvent = (id) => {
//fetch call which will delete events from json file. 
  return fetch(`${remoteURL}/events/${id}`, {
    method: "DELETE"
  }).then(result => result.json())
}

// let eventDate = [];

// export const getEventDates = (date) => {
//   return fetch (`${remoteURL}/events/${date}`)
//   .then(response => response.json())
//   .then((parsedResponse) => {
//     eventDate = parsedResponse.data
//       return parsedResponse.data;
//   });
// };

// export const useEventDates = () => {
//   return [...eventDate]
// }

// console.log(getEventDates)