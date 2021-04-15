// Created by: Sidney Crandall
// Page used to display all the meassges of users

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { deleteMessage, getAllMessages } from '../../data/MessageManager';
import { MessageCard } from './MessageCard';

export const MessageList = () => {

    //Declare variables for the components and what will be effected.
    const [messages, setMessages] = useState([]);

    // variable declared to tell where the dom will re-render after an action is taken. 
    const history = useHistory();

    // this varible grabs the logged in users info in order to display the messages.
    // currentUserId is defined from render function in Nutshell.js which tells the site to render if user is authenticated
    //const currentUser= JSON.parse(sessionStorage.getItem('nutshell_user'))

    // function used to tell the page to grab all the messages and hold on to them.
    const getMessages = () => {
        return getAllMessages()
            .then(message => {
                setMessages(message)
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
    }, [messages])

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
                    onClick={() => { history.push("/friends/create") }}>
                    Add a New message
                </button>
            </section>
        </>
    )
}
