// Authored by: Salma Crank
// Edit Form for users to edit the articles that have posted.

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { updateEvent, getEventById } from "../../data/eventManager";
import { getAllUsers } from "../../data/usersManager";

export const EventEditForm = () => {
  const [events, setEvent] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { eventId } = useParams();
  const history = useHistory();

  const [users, setUsers] = useState([]);

  const handleFieldChange = evt => {
    const stateToChange = { ...events };
    let selectedVal = evt.target.value
    if (evt.target.id.includes("Id")) {
      selectedVal = parseInt(selectedVal)
    }
    // look in the animal object copy and find the id of the key we are looking for
    stateToChange[evt.target.id] = selectedVal
    setEvent(stateToChange);
  };

  const updateExistingEvent = evt => {
    evt.preventDefault()
        setIsLoading(true);

    // This is an edit, so we need the id
    const editedEvent = {
      id: eventId,
      name: events.name,
      date: events.date,
      location: events.location,
      userId: events.userId
    };

    const userId = events.userId

    if (userId === 0 ) {
      window.alert("Please have all fields filled out")
    } else {
      updateEvent(editedEvent)
        .then(() => history.push("/events")
      )
    }
  }

  useEffect(() => {
    getEventById(eventId)
      .then(events => {
        setEvent(events);
            setIsLoading(false);
      });
  }, [eventId]);

  useEffect(() => {
    getAllUsers()
      .then(usersFromAPI => {
        setUsers(usersFromAPI)
      });
  }, []);

  return (
    <>
      <form>
        <fieldset>
          <div className="formgrid">
            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="name"
              value={events.name}
            />
            <label htmlFor="name">Name</label>

            <label htmlFor="date">Date: </label>
                <input type="date" id="date" onChange={handleFieldChange} required autoFocus className="form-control" placeholder="event date" value={events.date}/>

            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="location"
              value={events.location}
            />
            <label htmlFor="location">Location</label>


            <select
              value={events.userId}
              name="userId"
              id="userId"
              onChange={handleFieldChange}
              className="form-control" >
              <option value="0">Select a user</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
            <label htmlFor="user">Posted By: </label>

          </div>
          <div className="alignRight">
            <button
              type="button" disabled={isLoading}
              onClick={updateExistingEvent}
              className="btn btn-primary"
            >Submit</button>
          </div>
        </fieldset>
      </form>
    </>
  );
}