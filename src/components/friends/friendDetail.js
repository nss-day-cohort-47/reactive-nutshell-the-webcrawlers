import React, { useState, useEffect } from 'react';
import { getFriendById } from '../../modules/FriendManager';
import './FriendDetail.css';
import { useHistory, useParams } from "react-router-dom"
import { deleteFriend } from "../../modules/FriendManager"

export const FriendDetail = () => {
  const [friend, setFriend] = useState({ name: "", breed: "" });
  const [isLoading, setIsLoading] = useState(true);

  const {friendId} = useParams();
  const history = useHistory();

  useEffect(() => {
    //getFriendById(id) from friendManager and hang on to the data; put it into state
    console.log("useEffect", friendId)
    getFriendById(friendId)
      .then(friend => {
        setFriend({
          name: friend.name,
          friend: friend.friend,
          hours: friend.hours
        });
        setIsLoading(false);
      });
  }, [friendId]);

  const handleDelete = () => {
    //invoke the delete function in friendManger and re-direct to the friend list.
    setIsLoading(true);
    deleteFriend(friendId).then(() =>
      history.push("/friends")
    );
  };

  return (
    <section className="friend">
      <h3 className="friend__name">{friend.name}</h3>
      {/* What's up with the question mark???? See below.*/}
      {/* <div className="friend__friend">Hours: {friend.hours}</div> */}
      <button type="button" disabled={isLoading} onClick={handleDelete}>
          Delete
        </button>
    </section>
  );

}