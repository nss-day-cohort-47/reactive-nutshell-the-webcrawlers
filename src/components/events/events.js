//Authored by Salma Crank
//

import React from "react"
import "./events.css"
import { useHistory } from "react-router-dom"

//import { Link } from "react-router-dom"

export const EventCard = ({ event, handleDeleteEvent, index }) => {
    const history = useHistory();
//if statement which will prominently display the recent upcoming event. 
if (index === 0){
  return (
    <div className="upcomingEvent_Card">
      <div className="upcomingEvent_CardContent">
        <h3><span className="upcomingEvent_CardName">
          {event.name}
        </span></h3>
        <p>Date: {event.date}</p>
        <p>Location: {event.location}</p>
        {/* <p>Posted By: {event.userId}</p> */}
        <div className="eventButtons">
        <button className="editButton" type="button" onClick={() => history.push(`/events/${event.id}/edit`)}> Edit </button>
          <button className="deleteButton" type="button" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
          </div>
      </div>
    </div>
  );
}
else {
    return (
      <div className="eventCard">
        <div className="eventCard-content">
          <h3><span className="card-eventName">
            {event.name}
          </span></h3>
          <p>Date: {event.date}</p>
          <p>Location: {event.location}</p>
          {/* <p>Posted By: {event.userId}</p> */}
          <div className="eventButtons">
          <button className="editButton" type="button" onClick={() => history.push(`/events/${event.id}/edit`)}> Edit </button>
            <button className="deleteButton" type="button" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
            </div>
        </div>
      </div>
    );
  }
}
