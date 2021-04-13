import React, { useState, useEffect } from 'react';
//import the components we will need
import { FriendCard } from './FriendCard';
import { getAllFriends, deleteFriend } from '../../modules/friendManager';
// import {handleDeleteFriend} from "./FriendList"

export const FriendList = () => {
  // The initial state is an empty array
  const [friends, setFriends] = useState([]);

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
    //or you could call getFriends() after the => and delete the rest
};

  // got the friends from the API on the component's first render
  useEffect(() => {
    getFriends();
  }, []);

  // Finally we use .map() to "loop over" the friends array to show a list of friend cards
  return (
    <div className="container-cards">
      {friends.map(friend => 
      <FriendCard key={friend.id} friend={friend} handleDeleteFriend={handleDeleteFriend}/>
      )}
    </div>
  );
};