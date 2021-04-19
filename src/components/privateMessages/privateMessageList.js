// Created by Sidney Crandall
// Component used to list all private messages a user will receieve

import React, { useState, useEffect } from 'react';
import { getAllPrivateMessages } from '../../data/privateMessageManager';
import { PrivateMessageCard } from './privateMessageCard';
import { PrivateMessageForm } from './privateMessageForm';

export const PrivateMessageList = () => {

    // set the state for the list of private messages
    const [messages, setMessage] = useState([]);

    // setting the current user
    const currentUser = parseInt(sessionStorage.getItem("nutshell_user"));

    //function for message overflow
    const scrollOverflow = () => {
        const messageBox = document.querySelector(".conatiner")
        messageBox.scrollTop = messageBox.scrollHeight
    }

    // function that will use the fetch call to modify state
    const getPrivateMessages = () => {
        getAllPrivateMessages().then(privateMessagesFromAPI => {
            const knownSender = privateMessagesFromAPI.map(current => ({ ...current, selfSent: current.userId === currentUser }))
            return knownSender
        })
            .then(messagesArray => {
                setMessage(messagesArray)
            })
            .then(() => {
                scrollOverflow()
            })
    }

    useEffect(() => {
        getPrivateMessages()
    }, [])

    // conditional statemnet used to render the message list
    if (messages.length > 0) {
        return (
            <>
                <div className="messagesContainer">
                    {messages.map(message => {
                        return <PrivateMessageCard key={message.id} message={message} />
                    })}
                <PrivateMessageForm renderList={getPrivateMessages} />
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="messagesContainer">
                <PrivateMessageForm renderList={getPrivateMessages} />
                </div>
            </>
        )
    }

}