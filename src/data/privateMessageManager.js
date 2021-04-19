// Created by Sidney Crandall 
// Manager used to call the private messages and display them

const remoteURL = "http://localhost:8088";

// fecthing all the private messages
export const getAllPrivateMessages = () => {
    return fetch(`${remoteURL}/privateMessages/?_expand=user`)
        .then(res=>res.json())
};

// fetching the messages by id
export const getPrivateMessageById = (id) => {
    return fetch(`${remoteURL}/privateMessages/${id}/?_expand=user`)
        .then(res=>res.json())
};

// fetch call to add a private message
export const addPrivateMessage = (newPrivateMessage) => {
    return fetch(`${remoteURL}/privateMessages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPrivateMessage)
    })
        .then(res=>res.json())
}
