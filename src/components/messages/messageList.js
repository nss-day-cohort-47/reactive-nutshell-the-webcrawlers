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

    // Used to declare who is logged in
    const userId = parseInt(sessionStorage.getItem("nutshell_user"));

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

    // Function used to determine if a user is the logged in user or not. 
    const isLoggedInUser = (message) => {
        const istheUser = userId === message.userID ? true : false;
            return istheUser
    }

    // This is telling the DOM what to do with the messages that were gathered from above.
    useEffect(() => {
        getMessages()
    }, [])

    // return the messages to the DOM. Map through the db and give us the messages
    return (
        <>
            <h1>It's Mail Time!</h1>
            <div className="conatiner-cards">
              {messages.map(message =>
                <MessageCard key={message.id} message={message} handleDeleteMessage={handleDeleteMessage} isLoggedInUser={isLoggedInUser(message)} />)}
            </div>

            <section className="section-content">
                <button type="button"
                    className="btn"
                    onClick={() => { history.push("/messages/create") }}>
                    Add a New message
                </button>
                <button type='button' onClick={() => history.push(`/messages/private`)}>Create Private Message:</button>
            </section>
        </>
    )
}
