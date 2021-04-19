// Created by Sidney Crandall
// Component used to have private messaging available to users

import React, { useState, useEffect } from 'react';
import { getAllUsers } from "../../data/usersManager";

export const PrivateMessageCard = ({message}) => {

    //variable declared to establish the authentication
    const currentUser = parseInt(sessionStorage.getItem("nutshell_user"));

    //
    const [ recipient, setRecipient ] = useState({ name: "" })

    // function used to find the name of the user and match it to a user in the array
    const getRecipientName = () => {
        getAllUsers().then(allOfTheUsers => {
            const recipient = allOfTheUsers.find( user => user.id === message.recipientId )
                setRecipient(recipient)
        })
    }

    // 
    useEffect(() => {
        getRecipientName()
    }, [recipient]);

    // conditional used to determine who sent the message
    if (currentUser === message.userId) {
        return (
            <div className="sentMessages">
                <h4 className="sendersName">{message.user?.name} {"->"} {recipient.name}: </h4>
                <p>{`${message.message}`}</p>
            </div>
        )
    } else if (message.recipientId === currentUser) {
        return (
            <div className="incomingMessage">
                <h4 className="sendersName">{message.user?.name}: </h4>
            </div>
        )
    } else {
        return null
    }
}