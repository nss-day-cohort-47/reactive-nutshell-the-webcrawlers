// Created by: Sidney Crandall
// This componenet handles the form to create a priavte message.

import React, {useState, useEffect} from 'react';
import { getAllUsers } from '../../data/usersManager';
import { addPrivateMessage } from '../../data/privateMessageManager';

export const PrivateMessageForm = ({renderList}) => {
    const [ users, setUsers ] = useState([])

    const [ message, setMessage ] = useState({
        userId: 0,
        recipientId: 0,
        message: "",
        timestamp: new Date().toLocaleString()
    })

    let currentUser = parseInt(sessionStorage.getItem("nutshell_user"));

    const getUsers = () => {
        getAllUsers().then(allTheUsers => {
            setUsers(allTheUsers)
        })
    }

    const handleReceivedChange = event => {
        const newPrivateMessage = { ...message }
        let recipientId = parseInt(event.target.value)
        const userId = currentUser
            newPrivateMessage.recipientId = recipientId
            newPrivateMessage.userId = userId
                setMessage(newPrivateMessage)
    }

    const handleControlledInputChange = (event) => {
        const newMessage = { ...message }
        const message = event.target.value;
            newMessage.message = message
                setMessage(newMessage)
    }

    const handleClickSaveMesage = (event) => {
        event.preventDefault()

        if (message.userId === 0 || message.recipientId === 0) {
            alert("Please indicate a user to send it to.")
        } else {
            let messageDate = { ...message }
                messageDate.timestamp = new Date().toLocaleString()
            addPrivateMessage(messageDate)
                .then(() => {
                    renderList()
                }).then(() => {
                    const clearMessage = { ...message }
                    clearMessage.message = ""
                        setMessage(clearMessage)
                })
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className="form-group">
            <textarea id="privateMessage" value={message.message} name="privateMessage" rows="5" cols="50" placeholder="What's Happening" onChange={handleControlledInputChange} />
            <select name="userDropdown" id="userDropdown" onChange={handleReceivedChange} >
                <option value="0" selected disabled >Select a User</option>
                {users.map(user => {
                    if (user.id !== parseInt(currentUser)) {
                        return <option key={user.id} value={user.id}>{user.name}</option>
                    }
                })}
            </select>
            <button id="sendButton" onClick={handleClickSaveMesage} >Send</button>
        </div>
    )

}