import React, { useState, useEffect } from 'react';
import { ArticleCard } from './ArticleCard'
import { deleteArticle, getAllArticles } from '../../data/ArticlesManager'
import { useHistory } from 'react-router-dom';

export const ArticleList = () => {
    const [articles, setArticles] = useState([]);

    const history = useHistory();

    const getArticles = () => {
        return getAllArticles()
            .then(articlesFromAPI => {
                setArticles(articlesFromAPI)
            });
    };

    const handleDeleteArticle = (id) => {
        deleteArticle(id)
            .then(() => getAllArticles()
                .then(setArticles))
    };

    useEffect(() => {
        getArticles();
    }, []);

    return (
        <>

            <section className="section-content">
                <button type="button"
                    className="btn"
                    onClick={() => { history.push("/articles/create") }}>
                    Add Article
                </button>
            </section>


            <div className="conatiner-cards">
                {articles.map(article =>
                    <ArticleCard key={article.id} article={article} handleDeleteArticle={handleDeleteArticle} />)}
            </div>
        </>
    )
};