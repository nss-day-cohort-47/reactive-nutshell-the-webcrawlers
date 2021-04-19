// Created by : Sidney Crandall
// Created to allow users to send messages to their friends and fellow users

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getAllUsers } from '../../data/usersManager';
import { addMessage } from '../../data/messageManager';

//function used to export a form 
export const MessageForm = () => {

    // declaration used to call for the authenticated logged in user.
    const currentUser = parseInt(sessionStorage.getItem("nutshell_user"));

    // variables and props
    const [message, setMessage] = useState({
        userId: currentUser,
        message: "",
        recipientId: 0,
        timestamp: new Date().toLocaleString()
    })

    // More variables to use to help modify state
    const [users, setUsers] = useState([]);

    // used State to set variables for waiting to tell the DOM what to render
    const [isLoading, setIsLoading] = useState(false)

    // history is used to re render the previous page.
    const history = useHistory();

    // function used to control the change of form to get a new message 
    const handleControlledInputChange = (event) => {
        // Creating a new message will modify the array so we need a copy
        const newMessage = { ...message }
        // We will holding onto the value of a selection TBD
        let selectedVal = event.target.value
        // Now the fun begins. "Regular expressions are used to perform pattern-matching and "search-and-replace" functions on text." -W3
        // We need to search for a friend with an @ and have an _. 
        if (selectedVal.startsWith(`@`)) {
        // We now will define a variable to hold onto a sequence of characters we will later use to match our search pattern. 
        // This will represent a search starting after an @. The backslash are used ti escape the special characters.  
        let expressionStatement = /(?<=\@)(.*?)(?=\s)/;
        // A variable is now declared in order to help regular expression pattern match. 
        // We are using the abpve targeted event to help search.
        let searchedForName = selectedVal.match(expressionStatement)
        // The code will only work if the searchedForName is not of null value.
        if ( searchedForName !== null ) {
            // We are now using the .replace of regular expression in order to help the code compile.
            // The "g" after the expression for global search.
            searchedForName = searchedForName[0].replace(/_/g, ' ')
            //  Now we need to call for the users to be searched through in order to find our recipient.
            users.forEach(user => {
                // We are creating a conditionional to determine if the name matches the logged in user
                if ( searchedForName === user.name && user.id !== currentUser ) {
                    newMessage.recipientId = user.id;
                }
            })
        }
    }
        newMessage[event.target.id] = selectedVal
        setMessage(newMessage)
    }

    // save event to capture the changes from above and place them in the db
    const handleClickSaveMesage = (event) => {
        event.preventDefault()
        const recipientId = message.recipientId
        if (recipientId === 0) {
            window.alert("Please choose a Friend")
        } else {
            addMessage(message)
                .then(() => history.push("/messages"))
        }
    }

    // Effect of the above
    useEffect(() => {
        getAllUsers()
            .then(usersFromAPI => {
                setUsers(usersFromAPI)
            })
        setIsLoading(false)
    }, []);

    // the return statement that will render the code above
    return (
        <form className="messageForm">
            <h2 className="messageForm_title">Craft a Message</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="recipientId"> To: </label>
                    <select value={message.recipientId} name="recipient" id="recipientId" onChange={handleControlledInputChange} className="form-control">
                        <option value="0">Select a Friend</option>
                        {users.map(user => (<option key={user.id} value={user.id}>{user.name}</option>))}
                    </select>
                </div>
            </fieldset>
            <fieldset>

                <fieldset>
                    <textarea type="textarea" id="message" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Let's chat..." />
                </fieldset>

            </fieldset>
            <button className="btn btn-primary" onClick={handleClickSaveMesage} disabled={isLoading}>
                Send Message
                </button>
        </form>
    )
}