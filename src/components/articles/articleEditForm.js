// Authored by: Sidney Crandall
// Edit Form for users to edit the articles that have posted.

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { updateArticle, getArticleById } from "../../data/articlesManager";
import { getAllUsers } from "../../data/usersManager";

export const ArticleEditForm = () => {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { articleId } = useParams();
  const history = useHistory();

  const [users, setUsers] = useState([]);

  const handleFieldChange = evt => {
    const stateToChange = { ...article };
    let selectedVal = evt.target.value
    if (evt.target.id.includes("Id")) {
      selectedVal = parseInt(selectedVal)
    }
    // look in the animal object copy and find the id of the key we are looking for
    stateToChange[evt.target.id] = selectedVal
    setArticle(stateToChange);
  };

  const updateExistingArticle = evt => {
    evt.preventDefault()
        setIsLoading(true);

    // This is an edit, so we need the id
    const editedArticle = {
      id: articleId,
      title: article.title,
      synopsis: article.synopsis,
      url: article.url,
      timestamp: article.timestamp,
      userId: article.userId
    };

    const userId = article.userId

    if (userId === 0 ) {
      window.alert("Please have all fields filled out")
    } else {
      updateArticle(editedArticle)
        .then(() => history.push("/")
      )
    }
  }

  useEffect(() => {
    getArticleById(articleId)
      .then(article => {
        setArticle(article);
            setIsLoading(false);
      });
  }, [articleId]);

  useEffect(() => {
    getAllUsers()
      .then(usersFromAPI => {
        setUsers(usersFromAPI)
      });
  }, []);

  return (
    <>
      <form>
        <fieldset>
          <div className="formgrid">
            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="title"
              value={article.title}
            />
            <label htmlFor="name">Headline</label>

            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="synopsis"
              value={article.synopsis}
            />
            <label htmlFor="synopsis">Synopsis</label>

            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="url"
              value={article.url}
            />
            <label htmlFor="url">Link</label>


            <select
              value={article.userId}
              name="userId"
              id="userId"
              onChange={handleFieldChange}
              className="form-control" >
              <option value="0">Select a user</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
            <label htmlFor="user">Posted By: </label>

          </div>
          <div className="alignRight">
            <button
              type="button" disabled={isLoading}
              onClick={updateExistingArticle}
              className="btn btn-primary"
            >Submit</button>
          </div>
        </fieldset>
      </form>
    </>
  );
}