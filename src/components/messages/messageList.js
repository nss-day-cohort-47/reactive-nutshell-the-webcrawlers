// Created by: Sidney Crandall
// Page used to display all the meassges of users

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { deleteMessage, getMessageByUser, getPublicMessages, getMessagesByRecipientId } from '../../data/messageManager';
import { MessageCard } from './messageCard';

export const MessageList = () => {

    //Declare variables for the components and what will be effected.
    const [messages, setMessages] = useState([]);

    const [recipientMessages, setRecipientMessages] = useState([]);
    const [publicChat, setPublicChat] = useState([]);
    const [incomingMessages, setIncomingMessages] = useState([]);

    // variable declared to tell where the dom will re-render after an action is taken. 
    const history = useHistory();

    // Used to declare who is logged in
    const currentUser = parseInt(sessionStorage.getItem("nutshell_user"));

    // Fucntion to combine all the arrays from the calls.
    const filteredAndStatedArray = () => {
    const allTheArrays = [ ...recipientMessages, ...publicChat, ...incomingMessages]
    //Make every object in the array and filter out the duplicates
    let finishedMessage = allTheArrays.filter((message, index, array) => 
        index === array.findIndex((object)=> (
            object.id === message.id
        ))
    )
            setMessages(finishedMessage)
                return messages
    };

    // function used to tell the page to grab all the messages and hold on to them.
    const getMessages = () => {
        return getMessageByUser(currentUser)
            .then(function (response) {
                setRecipientMessages(response)
                    return response;
            }).then((data) => {
                return getPublicMessages()
            }).then((data) => {
                setPublicChat(data)
                    return getMessagesByRecipientId(currentUser)
                        .then((data) => {
                            setIncomingMessages(data)
            })
        })
    };

    // function declared to delete a message by authenticated users. 
    // brings in fetch call from data manaeger
    const handleDeleteMessage = (id) => {
        deleteMessage(id)
            .then(() => getMessages()
                .then(setMessages))
    };

    // This is telling the DOM what to do with the messages that were gathered from above.
    useEffect(() => {
        getMessages()
    }, [])

    useEffect(() => {
        filteredAndStatedArray()
    }, [incomingMessages])

    // return the messages to the DOM. Map through the db and give us the messages
    return (
        <>
            <h1>It's Mail Time!</h1>
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
                <button type='button' onClick={() => history.push(`/messages/create`)}>Create Private Message:</button>
            </section>
        </>
    )
}
