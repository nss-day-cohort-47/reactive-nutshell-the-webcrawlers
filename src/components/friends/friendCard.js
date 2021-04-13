import React from "react"
import "./FriendCard.css"
import { Link } from "react-router-dom"

export const FriendCard = ({friend, handleDeleteFriend}) => (
    <section className="friend">
        <h3 className="friend__name">{friend.name}</h3>
        {/* <div className="friend__address">Address: {friend.address}</div> */}
        <button type="button" onClick={() => handleDeleteFriend(friend.id)}>Remove</button>
        {/* <Link to={`/friends/${friend.id}`}>
  {/* <button>Details</button> */}
{/* </Link> */}
    </section>
)
