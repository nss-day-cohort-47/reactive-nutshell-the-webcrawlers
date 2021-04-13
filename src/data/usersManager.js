const remoteURL = "http://localhost:8088"

export const getAllUsers = () => {
    return fetch (`${remoteURL}/users`)
        .then(res => res.json())
}

export const getUsersById = (id) => {
    return fetch (`${remoteURL}/users/${id}`)
}