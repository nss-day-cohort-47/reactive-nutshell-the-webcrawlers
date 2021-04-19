import React from "react"

import "./friendCard.css"
import nutshell from "./nutshell.jpg"

// import { getFriendByUserId } from "/data/FriendManager"
// import { Link } from "react-router-dom"

export const FriendCard = ({friend}) => {


    console.log(friend)
    return (
    <section className="friend">
        <div>
            {/* <img src= {require(`./${friend.user.image}`)} alt="person"></img> */}
            {/* <img src={nutshell} alt="person"></img> */}
        <h2>{friend.user.name}</h2>
        <h3>email:</h3>
        <h4>{friend.user.email}</h4>
        <h5>{friend.user.bio}</h5>
        </div>
    </section>
)
    }
