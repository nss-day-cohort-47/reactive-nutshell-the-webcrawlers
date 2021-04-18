// Authored by: Sidney Crandall
// This manager is used for fetching messages from the JSON database.

const remoteURL = "http://localhost:8088"

// fetch calls used to grab data (read)
export const getAllMessages = () => {
    return fetch(`${remoteURL}/messages`)
    .then(result => result.json())
}

export const getMessageById = (id) => {
    return fetch(`${remoteURL}/messages/${id}`)
        .then(res => res.json())
}
// The above Calls grab the array of messages from db and await further instructions

// Fetch calls to create, update and delete 
export const deleteMessage = (id) => {
    return fetch(`${remoteURL}/messages/${id}`, {
        method: "DELETE"
    }).then(result => result.json())
}

export const addMessage = (newMessage) => {
    return fetch(`${remoteURL}/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMessage)
    }).then(response => response.json())
}

export const updateMessage  = (editedMessage) => {
    return fetch(`${remoteURL}/messages/${editedMessage.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedMessage)
    }).then(data => data.json());
}
// The above calls will used in the process of modifyung state. 

// The following calls aid in the users need to private message.
export const getMessageByUser = (userId) => {
    return fetch(`${remoteURL}/messages/?userId=${userId}&_expand=user`)
        .then(res => res.json())
}

// Call used to display the messages that al friends have sent.
export const getPublicMessages = () => {
    return fetch(`${remoteURL}/messages/?recipientId=0&_expand=user`)
        .then(res => res.json())
}

// Call used to display private messages.
export const getMessagesByRecipientId = (recipientId) => {
    return fetch(`${remoteURL}/messages/?recipientId=${recipientId}&_expand=user`)
        .then(res => res.json())
}