const remoteURL = "http://localhost:8088"

// fetch calls used to grab data 
export const getAllMessages = () => {
    return fetch(`${remoteURL}/messages?_expand=user`)
        .then(result => result.json())
}

export const deleteMessage = (id) => {
    return fetch(`${remoteURL}/messages/${id}`, {
        method: "DELETE"
    }).then(result => result.json())
}

export const getMessageById = (id) => {
    return fetch(`${remoteURL}/messages/${id}`)
        .then(res => res.json())
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

export const getMessageByUser = (userId) => {
    return fetch(`${remoteURL}/messages/?userId=${userId}&_expand=user`)
        .then(res => res.json())
}