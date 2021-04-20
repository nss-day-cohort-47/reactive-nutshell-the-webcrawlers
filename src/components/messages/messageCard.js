// Authored by: Sidney Crandall
// Card used to return Dom representation of messages.

import React from "react";
import { useHistory } from "react-router-dom";
import "./message.css"
// Export function to show the message
export const MessageCard = ({message, handleDeleteMessage}) => {

    const history = useHistory()
    let messageDate = message.timestamp
    let messageTime = messageDate.split(" ");
    let messageSun = messageTime.pop()
    let messageHour = messageTime.slice(1).reverse().pop().split(":").slice(0,2).join(":")
    console.log(messageHour)
    console.log(messageSun)
    //variable declared to establish the authentication
    const currentUser = parseInt(sessionStorage.getItem("nutshell_user"));

    return (
        <div className="card">
            <div className="card-content">
            <div className="nameplate">
            <img src= {require(`../images/${message.user.image}`).default} alt="person"></img>
                {message.user.id != currentUser
                    ?<><h2 className="card-name">{message.user.name}</h2><h2 className="timestamp">@{messageHour}{messageSun}:</h2><space></space><h1 className="message">{message.message}</h1></>
                    :<><h2 className="card-username">{message.user.name}</h2><h2 className="timestamp">@{messageHour}{messageSun}:</h2><space></space><h1 className="userMessage">{message.message}</h1></>
                }
                </div>
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