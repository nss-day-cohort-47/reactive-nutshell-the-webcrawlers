import React from 'react';
import "./users.css";


const currentUser = JSON.parse(sessionStorage.getItem("nutshell_user"))

export const UserCard = ({user, handleClickEvent}) => {
return (
    <section className="user">
        <div>
            {/* <img src= {require(`./${friend.user.image}`)} alt="person"></img> */}
            {/* <img src={nutshell} alt="person"></img> */}
        <h2>{user.name}</h2>
        <h3>email:</h3>
        <h4>{user.email}</h4>
        {currentUser === user.id 
        ? ""
        : <button type="button" value={user.id} onClick= {handleClickEvent}>Add Friend</button>
        }
        </div>
    </section>
)
}

