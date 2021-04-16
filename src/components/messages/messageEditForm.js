// Created by Sidney Crandll
//A page used for the logged in user to edit their own messages

import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getMessageById, updateMessage } from '../../data/MessageManager';


export const MessageEditForm = () => {

    // props set for State to set to edit the message.
    const [ message, setMessage ] = useState({});

    // Variables set in order to hold the info until further notice
    const [ isLoading, setIsLoading ] = useState(false);

    // params set to help grab the message from the db and edit the correct info
    const { messageId } = useParams();

    // variable decalred to use useHistory() to tell where to render after the action is taken
    const history = useHistory();

    // event to control the change of editing the message
    const handleFieldChnage = event => {
        const stateToChange = { ...message };
        let selectedVal = event.target.value
            if (event.target.id.includes("Id")) {
                selectedVal = parseInt(selectedVal)
            }
            // Look into messages copy it, find the id we are wishing to edit.
            stateToChange[event.target.id] = selectedVal
                setMessage(stateToChange);
            };
    
    // 
    const updateExistingMessage = evt => {
        evt.preventDefault()
            setIsLoading(true);

    //argument passed in fetch call called in to edit the db   
    const editedMessage = {
        id: messageId,
        message: message.message,
        userId: message.userId,
        recipientId: message.recipientId,
        timestamp: message.timestamp
    };

    // after the message is updated re-render to the list without refresh
    updateMessage(editedMessage)
        .then(() => history.push("/messages"));
    };

    // The action that is taken after all the above is run.   
    useEffect(() => {
        getMessageById(messageId)
            .then(message => {
                setMessage(message);
                    setIsLoading(false)
            })  
    }, [messageId]);

    return (
        <>
            <form>
                <textarea type="text" 
                required onChange={handleFieldChnage} 
                id="message" 
                value={message.message}/>
            </form>

            <button type="button" disabled={isLoading}
              onClick={updateExistingMessage}
              className="btn btn-primary">
                  Save Message
            </button>
        </>
    )
};

