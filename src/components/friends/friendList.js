import React, { useState, useEffect } from 'react';
//import the components we will need
import { FriendCard } from './friendCard';
import { getAllFriends, deleteFriend} from '../../data/friendManager';
// import {handleDeleteFriend} from "./FriendList"
import { getAllUsers} from "../../data/usersManager"

export const FriendList = () => {
    // The initial state is an empty array
    const [friends, setFriends] = useState([]);
    const [users, setUsers] = useState([]);
    //returns all friend objects and stores in updated state
  const getFriends = () => {
    // After the data comes back from the API, we
    //  use the setFriends function to update state
    return getAllFriends()
    .then(friendsFromAPI => {
      setFriends(friendsFromAPI)
    });
  };
  
  const getUsers = () => {
    // After the data comes back from the API, we
    //  use the setFriends function to update state
    return getAllUsers()
    .then(usersFromAPI => {
      setUsers(usersFromAPI)
    });
  };

  //global variable declared
let searchName= ""

//Handles searchbar input
  const handleControlledInputChange = event => {
    //collects user input
    searchName = event.target.value
    console.log(searchName)
  getAllFriends()
  .then (result => {
    let searchedFriend = result.filter(friendObj => friendObj.user.name.includes(searchName) )
    //THIS NEXT CONSOLE LOG DISPLAYS THE RESULTS I WANT... BUT I dont know how to update the state correctly
    console.log(searchedFriend)
    setFriends(searchedFriend)
  })
}
  const handleDeleteFriend = id => {
    deleteFriend(id)
    .then(() => getAllFriends().then(setFriends));
};

  // got the friends from the API on the component's first render
  //changes the state causes stuff to re-render
  useEffect(() => {
    getFriends();
  }, []);

//Displays friendCards of logged in user
const friendCards = () => {
  const allFriendCards = friends.map(friend => {
    //if the logged in user's id matches the id of a currentUserId in the friends dataset
   if( parseInt(sessionStorage.getItem("nutshell_user")) === friend.currentUserId ){
     //return the friends that match the friendship
    return <FriendCard key={friend.user.id} handleDeleteFriend={handleDeleteFriend} friend={friend}  />
   }
   else{
    return  null 
   }
 } )
 return allFriendCards
}

  // Finally we use .map() to "loop over" the friends array to show a list of friend cards
return (
 
    <div className="container-cards">
      {friendCards()}
     <input type="text" onChange={handleControlledInputChange}  />
     {/* <input type="button" onClick={handleClickEvent} value="Add" /> */}
    </div>
  );
      
};
