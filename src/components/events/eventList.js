//Authored by Salma Crank
//the component that will display all of the cards on the events page.

import React, { useState, useEffect } from "react";
import { EventCard } from "./events";
import { deleteEvent, getAllEvents } from "../../data/eventManager";
import { useHistory } from "react-router-dom";


export const EventList = () => {
  const [events, setEvents] = useState([]);

  const history = useHistory();

  const getEvents = () => {
    return getAllEvents().then((eventsFromAPI) => {
//here is where we declare a variable which stores the current date in the same format as the date data in our json file. 
      const currentDate = new Date().toISOString().split("T")[0];
//this filters the events by date so they are shown chronologically. 
     const filteredEvents = eventsFromAPI
        .filter((event) => event.date >= currentDate)
        .sort((a, b) => {
          if (a.date < b.date) {
            return -1;
          }
          if (a.date > b.date) {
            return 1;
          }
          return 0;
        });

      setEvents(filteredEvents);
    });
  };

  const handleDeleteEvent = (id) => {
    deleteEvent(id).then(() => getAllEvents().then(setEvents));
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <section className="event-section-content">
        <button
          type="button"
          className="btn"
          onClick={() => {
            history.push("/events/create");
          }}
        >
          Add an Event
        </button>
      </section>

      <div className="container-eventCards">
        {events.map((event, index) => (
          <EventCard
            key={event.id}
            event={event}
            handleDeleteEvent={handleDeleteEvent}
            index={index}
          />
        ))}
      </div>
    </>
  );
};
