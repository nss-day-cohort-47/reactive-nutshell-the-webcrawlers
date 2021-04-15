//Authored by Salma Crank
//the component that will display all of the cards on the events page. 

import React, { useState, useEffect } from 'react';
import { EventCard } from './events'
import { deleteEvent, getAllEvents } from '../../data/eventManager'
import { useHistory } from 'react-router-dom';

export const EventList = () => {
    const [events, setEvents] = useState([]);

    const history = useHistory();

    const getEvents = () => {
        return getAllEvents()
            .then(eventsFromAPI => {
                setEvents(eventsFromAPI)
            });
    };

    const handleDeleteEvent = (id) => {
        deleteEvent(id)
            .then(() => getAllEvents()
                .then(setEvents))
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <>
            <section className="event-section-content">
                <button type="button"
                    className="btn"
                    onClick={() => { history.push("/events/create") }}>
                    Add an Event
                </button>
            </section>

            <div className="container-eventCards">
                {events.map(event =>
                    <EventCard key={event.id} event={event} handleDeleteEvent={handleDeleteEvent} />)}
            </div>
        </>
    )
};