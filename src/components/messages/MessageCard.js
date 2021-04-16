// Authored by: Sidney Crandall
// Card used to return Dom representation of messages.

import React from "react";
import { useHistory } from "react-router-dom";

// Export function to show the message
export const MessageCard = ({message, handleDeleteMessage}) => {

    const history = useHistory()

    //variable declared to establish the authentication
    const currentUser = parseInt(sessionStorage.getItem("nutshell_user"));

    return (
        <div className="card">
            <div className="card-content">
                <small className="card-message">Sender: {message.name}</small>
                    <p>{message.message}</p>
                <br></br>
                {/*This is a conditional to deteremine who is viewing the messages*/}
                {message.userId === currentUser ? 
                <>
                    <button type="button" onClick={() => history.push(`/messages/${message.id}/edit`)}> Edit </button>
                    <button type="button" onClick={() => handleDeleteMessage(message.id)}>DELETE</button>
                </>
                : null
                }
            </div>
        </div>
    )
};