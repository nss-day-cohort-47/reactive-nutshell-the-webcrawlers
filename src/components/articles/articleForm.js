import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { addArticle } from '../../data/articlesManager';
import { getAllUsers } from '../../data/usersManager';
import './articleForm.css';

export const ArticleForm = () => {
    const [article, setArticle] = useState({
        title: "",
        synopsis: "",
        url: "",
        timestamp: "",
        userId: 0
    });

    const [isLoading, setIsLoading] = useState(false);
    const [users,  setUsers] = useState([]);

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newArticle = { ...article }
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newArticle[event.target.id] = selectedVal
            setArticle(newArticle)
    }

    useEffect(() => {
        getAllUsers()
            .then(usersFromAPI => {
                setUsers(usersFromAPI)
        });
        setIsLoading(false)
}, []);

    const handleClickSaveArticle = (event) => {
        event.preventDefault()

        const userId = article.userId

        if (userId === 0 ) {
            window.alert("Please select an user")
        }
        else {
            addArticle(article)
                .then(() => history.push("/articles"))
        }
    }

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