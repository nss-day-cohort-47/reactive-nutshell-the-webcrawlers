import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import { getEventByDate } from '../../data/eventManager'
import "./eventSpotlight.css";

export const EventSpotlight = ({eventDate, handleDeleteEvent}) => {
    
    const history = useHistory();
    const [events, setEvents] = useState({});

  useEffect(() => {
    getEventByDate(eventDate).then(date => {
      setEvents(date);
    });
  }, []);

  return (
    <div className="eventSpotlightCard-content">
          <h3><span className="card-eventName">
            {events.name}
          </span></h3>
          <p>Date: {events.date}</p>
          <p>Location: {events.location}</p>
          <button type="button" onClick={() => history.push(`/events/${events.id}/edit`)}> Edit </button>
            <button type="button" onClick={() => handleDeleteEvent(events.id)}>DELETE</button>
        </div>
    );
}