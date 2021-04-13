import React from "react"
import "./events.css"
//import { Link } from "react-router-dom"

export const eventCard = ({ event }) => {
    return (
      <div className="eventCard">
        <div className="eventCard-content">
          <h3><span className="card-eventName">
            {event.name}
          </span></h3>
          <p>Location: {event.location.name}</p>
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
