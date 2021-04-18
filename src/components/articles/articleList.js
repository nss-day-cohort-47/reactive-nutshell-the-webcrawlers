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
                articlesFromAPI.sort()
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

            {/*helper functions. We map through the array of articles and return the ArticleCard function.
                the .reverse() will reverse the array order and display the articles with the newest enrty first.*/}
            <div className="conatiner-cards">
                {articles.map(article =>
                    <ArticleCard key={article.id} article={article} handleDeleteArticle={handleDeleteArticle} />).reverse()}
            </div>
        </>
    )
};