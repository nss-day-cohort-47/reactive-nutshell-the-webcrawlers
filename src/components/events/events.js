import React from "react"
import "./events.css"
import { useHistory } from "react-router-dom"
//import { Link } from "react-router-dom"

export const EventCard = ({ event, handleDeleteEvent }) => {

    const history = useHistory();
    return (
      <div className="eventCard">
        <div className="eventCard-content">
          <h3><span className="card-eventName">
            {event.name}
          </span></h3>
          <p>Date: {event.date}</p>
          <p>Location: {event.location}</p>
          <button type="button" onClick={() => history.push(`/events/${event.id}/edit`)}> Edit </button>
            <button type="button" onClick={() => handleDeleteEvent(event.id)}>DELETE</button>
        </div>
      </div>
    );
}


/*
<Link to={`/employees/${employee.id}/edit`}>
            <button type="button">Edit</button>
          </Link>
          <button type="button" onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
*/
