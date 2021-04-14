import React from "react";
import "./article.css"
import { useHistory } from "react-router-dom";


export const ArticleCard = ({ article, handleDeleteArticle }) => { 

    const history = useHistory();

    return (
    <div className="card">
        <div className="card-content">
            <h3>Headline: <span className="card-articleName">{article.title}</span></h3>
            <p>Synopsis: {article.synopsis}</p>
            <p><a href={article.url}>Link: {article.url}</a></p>
            <button type="button" onClick={() => history.push(`/articles/${article.id}/edit`)}> Edit </button>
            <button type="button" onClick={() => handleDeleteArticle(article.id)}>DELETE</button>
        </div>
    </div>
    )
}


/*<Link to={`/articles/${article.id}`}>
<button>Details</button>
<input nam="articleTimestamp" type="hidden" value="{article.timestamp}"></input>
</Link>*/