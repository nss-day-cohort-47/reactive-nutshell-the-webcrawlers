import React, { useState, useEffect } from 'react';
import { UserCard } from './userCard'
import { getAllUsers} from '../../data/usersManager'
import { useHistory } from 'react-router-dom';
import { addFriends } from '../../data/friendManager';

export const UserList = () => {
    const [Users, setUsers] = useState([]);
    const history = useHistory();

    const currentUser = JSON.parse(sessionStorage.getItem("nutshell_user"))

    const handleClickEvent = (user) => {
        console.log(user)
        let stranger = {...user}
        const newFriend = {
            userId:stranger.target.value,
            currentUserId:currentUser
        }
        console.log(newFriend)
        addFriends(newFriend)
        .then(() =>getAllUsers()
        .then (setUsers))
    }

    const getUsers = () => {
        return getAllUsers()
        .then(usersFromAPI=>{
            setUsers(usersFromAPI)
        })
    }

    useEffect(() => {
        getUsers()
    },[])

    return(
        <>
        {Users.map(user =>
          <UserCard key={user.id} user={user} handleClickEvent = {handleClickEvent}/>
            )}
        </>
    )
}


