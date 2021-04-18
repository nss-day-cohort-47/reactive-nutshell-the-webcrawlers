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

let searchName= ""
  const handleControlledInputChange = event => {
    searchName = event.target.value
    console.log(searchName)
  getAllFriends()
  .then (result => {
    let searchedUser = result.filter(friendObj => friendObj.user.name.includes(searchName) )
    setFriends(searchedUser)
  })
}
  const handleDeleteFriend = id => {
    deleteFriend(id)
    .then(() => getAllFriends().then(setFriends));
};

//------------------------------------------------------------------------------
//-----Jackson working on this function----------------
  // const filterUserId = (searchName) => {
  //   const nameFilter = getAllUsers().filter(user => {
  //     if(user.name === searchName){
  //       return user
  //     }
  //   })
  //   showUser(nameFilter)
  // }

//------------------------------------------

// const handleControlledInputChange = event => {
//   //creates an empty array to hold string of user input
//   let searchName = []
//   //should create an array of letters that the user enters
//   let searchNameTool = searchName.push(event.target.value)
// // console.log(searchNameArray)

// let searchNameArray = searchNameTool.concat(searchName)
// console.log(searchNameArray)
//   // takes the array of letters and makes it into a word
//   let theName = searchNameArray.join('')
// console.log(theName)
//   //sets an array of user objects to allUsers
//   let allUsers = getAllUsers()
//   //filters the names of users with the user input
//   let userName = allUsers.filter(userObj =>userObj.name === theName)
//   //returns the user's name that matches
//   return userName
// }




// console.log(getFriends())
// const bobyboy = getAllUsers();
// console.log("here")
// console.log(bobyboy)
  // got the friends from the API on the component's first render
  //changes the state causes stuff to re-render
  useEffect(() => {
    getFriends();
  }, []);

const friendCards = () => {
  // debugger
  const allFriendCards = friends.map(friend => {
   if( parseInt(sessionStorage.getItem("nutshell_user")) === friend.currentUserId ){
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
     <input type="button" onClick={handleControlledInputChange} value="Search" />
    </div>
  );
      
};
