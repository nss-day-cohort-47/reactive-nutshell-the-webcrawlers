// Created by : Sidney Crandall
// Created to allow users to send messages to their friends and fellow users

import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { getAllUsers } from '../../data/usersManager';
import { addMessage } from '../../data/MessageManager';

//function used to export a form 

export const MessageForm = () => {

    // variables and props
    const [ message, setMessage ] = useState({
        userId:parseInt(sessionStorage.getItem("nutshell_user")),
        message: "",
        recipientId: 0,
        timestamp: new Date().toLocaleString()
    })

    // More variables to use 
    const [ users, setUsers ] = useState([]);

    // used State to set variables for waiting to tell the DOM what to render
    const [ isLoading, setIsLoading ] = useState(false)

    // history is used to re render the previous page.
    const history = useHistory();

    // function used to control the change of form to get a new message 
    const handleControlledInputChange = (event) => {
        const newMessage = { ...message }
        let selectedVal = event.target.value
            if(event.target.id.includes('Id')) {
                selectedVal = parseInt(selectedVal)
            }
            newMessage[ event.target.id ] = selectedVal
                setMessage(newMessage)
    }

    // Effect of the above
    useEffect(() => {
        getAllUsers()
            .then(usersFromAPI =>{
                setUsers(usersFromAPI)
            })
    }, []);

    // save event to capture the changes from above and place them in the db
    const handleClickSaveMesage = (event) => {
        event.preventDefault()
            const receiverId = message.receiverId
                if ( receiverId === 0 ) {
                    window.alert("Please choose a Friend")
                } else {
                    addMessage(message)
                        .then(() => history.push("/messages"))
                }
        } 

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
                    
                </fieldset>
                <button className="btn btn-primary" onClick={handleClickSaveMesage} disabled={isLoading}>
                    Send Message
                </button>
            </form>
        )

    
    
 
}