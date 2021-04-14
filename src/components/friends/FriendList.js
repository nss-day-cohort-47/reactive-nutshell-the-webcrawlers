import React, { useState, useEffect } from 'react';
//import the components we will need
import { FriendCard } from './FriendCard';
import { getAllFriends, deleteFriend} from '../../data/FriendManager';
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
     
      // console.log(friendsFromAPI)
    //   console.log(setFriends(friendsFromAPI))
    });
  };

// console.log(getFriends())

  const handleDeleteFriend = id => {
    deleteFriend(id)
    .then(() => getAllFriends().then(setFriends));
    //or you could call getFriends() after the => and delete the rest
};

// console.log(getFriends())

  // got the friends from the API on the component's first render
  //changes the state causes stuff to re-render
  useEffect(() => {
    getFriends();
  }, []);

// console.log(useEffect())


 

  // Finally we use .map() to "loop over" the friends array to show a list of friend cards
return (
 
    <div className="container-cards">
      {
      friends.map(friend => 
      
      <FriendCard key={friend.id} handleDeleteFriend={handleDeleteFriend} friend={friend}  />
      )}
    </div>
  );
      
};


// loggedInUser1={sessionStorage.getItem("nutshell_user")}
// handleDeleteFriend={handleDeleteFriend}