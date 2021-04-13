import React from "react"
import "./friendCard.css"
import { Link } from "react-router-dom"

export const FriendCard = ({friend, handleDeletefriend}) => (
    <section className="friend">
        <h3 className="friend__name">{friend.name}</h3>
        <div className="friend__breed">Address: {friend.address}</div>
        <button type="button" onClick={() => handleDeletefriend(friend.id)}>Unsave</button>
        {/* <Link to={`/friends/${friend.id}`}>
  {/* <button>Details</button> */}
{/* </Link> */}
    </section>
)
