//Creayed by: Sidney Crandall. 
//Purpose: Form to add new articles by users. 

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { addArticle } from '../../data/ArticlesManager';
import { getAllUsers } from '../../data/usersManager';
import './ArticleForm.css';

// Timestamp details to give the articles a date for the database

export const ArticleForm = () => {

    //destructure for useState, which sets a variable and empty array to be used.
    const [article, setArticle] = useState({
        title: "",
        synopsis: "",
        url: "",
        timestamp: new Date().toLocaleString(),
        userId: 0
    });

    // isLoading and setIsLoading are used to hold off click events until
    // all data fields are entered. They are set to false initially.  
    const [isLoading, setIsLoading] = useState(false);

    // props used to identify the creator of the article.
    const [users, setUsers] = useState([]);

    // react native to render the previous page after an action.
    const history = useHistory();

    // click event used for the id of the user.
    const handleControlledInputChange = event => {
        const newArticle = { ...article }
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newArticle[event.target.id] = selectedVal
        setArticle(newArticle)
    }

    // click event used to ensure that all 
    // fields are filled in before adding the article to the dashboard
    // userId is invoked in order to pull the data from db 
    const handleClickSaveArticle = event => {
        event.preventDefault()
        const userId = article.userId
        if (userId === 0) {
            window.alert("Please fill out all fields.")
        }
        else {
            addArticle(article)
                .then(() => history.push("/"))
        }
    }

    //gathers the users array for the db and parses thru it for form input
    useEffect(() => {
        getAllUsers()
            .then(usersFromAPI => {
                setUsers(usersFromAPI)
            });
        setIsLoading(false)
    }, []);

    // fieldset form to add new Articles to the dashboard
    return (
        <form className="articleForm">
            <h2 className="articleFrom_title">New(s) Article</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Headline: </label>
                    <input type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="article title" value={article.title} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="synopsis">Synopsis: </label>
                    <input type="text" id="synopsis" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="article synopsis" value={article.synopsis} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="url">Link: </label>
                    <input type="text" id="url" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="article url" value={article.url} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="user">Posted By: </label>
                    <select value={article.userId} name="userId" id="userId" onChange={handleControlledInputChange} className="form-control">
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
                onClick={handleClickSaveArticle} disabled={isLoading}>
                Save Article
            </button>
        </form>
    )
}