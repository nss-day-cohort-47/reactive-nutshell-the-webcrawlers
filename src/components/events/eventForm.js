//Authored by Salma Crank
//
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { addEvent } from '../../data/eventManager';
import { getAllUsers } from '../../data/usersManager';
import './eventForm.css';
// import  DatePicker  from 'react-datepicker'
// import "react-datepicker/dist/react-datepicker.css";

export const EventForm = () => {
    const [events, setEvent] = useState({
        name: "",
        date: "",
        location: "",
        userId: 0
    });

    // const [startDate, setStartDate] = useState(new Date());

    const [isLoading, setIsLoading] = useState(false);
    const [users,  setUsers] = useState([]);

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newEvent = { ...events }
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newEvent[event.target.id] = selectedVal
            setEvent(newEvent)
    }

    useEffect(() => {
        getAllUsers()
            .then(usersFromAPI => {
                setUsers(usersFromAPI)
        });
        setIsLoading(false)
}, []);

    const handleClickSaveEvent = (event) => {
        event.preventDefault()

        const userId = events.userId

        if (userId === 0 ) {
            window.alert("Please select an user")
        }
        else {
            addEvent(events)
                .then(() => history.push("/events"))
        }
    }


    return (
        <form className="eventForm">
            <h2 className="eventFrom_title">New Events</h2>

            <fieldset>
            <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="event name" value={events.name} />
                </div>
            </fieldset>

            <fieldset>
            <div>
            <label htmlFor="date">Date: </label>
                <input type="date" id="date" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="event date" value={events.date}/>
              </div>
            </fieldset>

            <fieldset>
            <div className="form-group">
                    <label htmlFor="location">Location: </label>
                    <input type="text" id="location" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="event location" value={events.location} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="userId">Posted By: </label>
                    <select value={events.userId} name="userId" id="userId" onChange={handleControlledInputChange} className="form-control">
                        <option value="0">Select User</option>
                        {users.map(u => (
                            <option key={u.id} value={u.id}>
                                {u.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <button className="btn btn-primary"
                onClick={handleClickSaveEvent} disabled={isLoading}>
                Save Event
            </button>
        </form>
    )
}