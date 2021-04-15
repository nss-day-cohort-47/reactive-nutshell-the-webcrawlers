const remoteURL = "http://localhost:8088"

export const getFriendByUserId = (userId) => {
    return fetch (`${remoteURL}/friends?userId=${userId}`)
    .then(res => res.json())
}


export const getAllFriends = () => {
    return fetch (`${remoteURL}/friends?_expand=user`)
    .then(res => res.json())
}


export const deleteFriend = (id) => {
    return fetch(`${remoteURL}/friends/${id}`, {
        method: "DELETE"
    }).then(result => result.json())
}


export const addFriends = (newfriends) => {
    return fetch(`${remoteURL}/friends/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newfriends)
    }).then(response => response.json())
}

// export const updateFriend = (editedfriend) =>{
//     return fetch(`${remoteURL}/employees/${editedfriend.id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(editedfriend)
//     }).then(data => data.json())
// }
