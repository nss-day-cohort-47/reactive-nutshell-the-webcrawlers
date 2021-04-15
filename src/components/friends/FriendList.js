import React, { useState, useEffect } from 'react';
//import the components we will need
import { FriendCard } from './friendCard';
import { getAllFriends, deleteFriend} from '../../data/friendManager';
// import {handleDeleteFriend} from "./FriendList"

export const FriendList = () => {
    // The initial state is an empty array
    const [friends, setFriends] = useState([]);
    
    //returns all friend objects and stores in updated state
  const getFriends = () => {
    // After the data comes back from the API, we
    //  use the setFriends function to update state
    return getAllFriends()
    .then(friendsFromAPI => {
      setFriends(friendsFromAPI)
    });
  };

  const handleDeleteFriend = id => {
    deleteFriend(id)
    .then(() => getAllFriends().then(setFriends));
};

// console.log(getFriends())

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
     
    </div>
  );
      
};
