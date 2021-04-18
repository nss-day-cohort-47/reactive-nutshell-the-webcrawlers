// Created by: Sidney Crandall
// Page used to display all the meassges of users

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { deleteMessage, getAllMessages } from '../../data/messageManager';
import { MessageCard } from './messageCard';

export const MessageList = () => {

    //Declare variables for the components and what will be effected.
    const [messages, setMessages] = useState([]);

    // variable declared to tell where the dom will re-render after an action is taken. 
    const history = useHistory();

    // function used to tell the page to grab all the messages and hold on to them.
    const getMessages = () => {
        return getAllMessages()
            .then(messagesFromAPI => {
                setMessages(messagesFromAPI)
            })
    };

    // function declared to delete a message by authenticated users. 
    // brings in fetch call from data manaeger
    const handleDeleteMessage = (id) => {
        deleteMessage(id)
            .then(() => getAllMessages()
                .then(setMessages))
    };

    // This is telling the DOM what to do with the messages that were gathered from above.
    useEffect(() => {
        getMessages()
    }, [])

    // return the messages to the DOM. Map through the db and give us the messages
    return (
        <>
            <div className="conatiner-cards">
                {messages.map(message =>
                    <MessageCard key={message.id} message={message} handleDeleteMessage={handleDeleteMessage} />)}
            </div>

            <section className="section-content">
                <button type="button"
                    className="btn"
                    onClick={() => { history.push("/messages/create") }}>
                    Add a New message
                </button>
            </section>
        </>
    )
}
