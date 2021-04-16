import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { addFriends } from '../../data/friendManager';
import { getAllUsers } from '../../data/usersManager';
import './friendForm.css';

export const FriendForm = () => {
    const [friend, setFriend] = useState({
        name: ""
       
    });

    const [isLoading, setIsLoading] = useState(false);
    const [users,  setUsers] = useState([]);

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newFriend = { ...friend }
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newFriend[event.target.id] = selectedVal
            setFriend(newFriend)
    }

    useEffect(() => {
        getAllUsers()
            .then(usersFromAPI => {
                setUsers(usersFromAPI)
        });
        setIsLoading(false)
}, []);

    const handleClickSavefriend = (event) => {
        event.preventDefault()

        const userId = friend.userId

        if (userId === 0 ) {
            window.alert("Please select an user")
        }
        else {
            addFriends(friend)
                .then(() => history.push("/friends"))
        }
    }

    return (
        <form className="friendForm">
            <h2 className="friendFrom_title">Add New friend</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">friend: </label>
                    <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="friend" value={friend.user.name} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" id="description" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Description" value={friend.description} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="completion">Completion: </label>
                    <input type="text" id="completion" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="01/01/2020" value={friend.completion} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="user">Posted By: </label>
                    <select value={friend.userId} name="userId" id="userId" onChange={handleControlledInputChange} className="form-control">
                        <option value="0">Select User</option>
                        {users.map(u => (
                            <option key={u.id} value={u.id}>
                                {u.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <button className="btn btn-primary"
                onClick={handleClickSavefriend} disabled={isLoading}>
                Save friend
            </button>
        </form>
    )
}