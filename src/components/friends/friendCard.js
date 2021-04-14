import React from "react"
import "./FriendCard.css"
// import { getFriendByUserId } from "/data/FriendManager"
// import { Link } from "react-router-dom"

// I am trying to get the user to go into FriendCard...?
// let user = getFriendByUserId(1);




export const FriendCard = ({friend}) => {


    console.log(friend)
    return (
    <section className="friend">
        {/* <h3>{loggedInUser1}</h3> */}
        <h2>{friend.user.name}</h2>
        <h3>email:</h3>
        <h4>{friend.user.email}</h4>
        {/* <h5>{friend.user.bio}</h5> */}
    
  {/* <button>Details</button> */}
{/* </Link> */}
    </section>
)
    }