import React, { useEffect, useState } from 'react'
import ArticlePreview from "./ArticlePreview"

function ArticleIndex() {

    const [articles, setArticles] = useState([]);

    const loadArticles = async () => {
        const response = await fetch("https://fullstack.exercise.applifting.cz/articles", {
            headers: {
                "Authorization": localStorage.getItem('access_token'),
                "X-API-KEY": process.env.REACT_APP_X_API_KEY
            }
        });
        const data = await response.json();
        data && data.items && setArticles(data.items);
        
    };

    useEffect(() => {
        loadArticles();
    }, []);


    let content = "";

    if (articles.length) {
        content = (
            articles.map((article, index)=> 
                (
                    <ArticlePreview key={index} id={article.articleId}/>
                )
            ))
    }

    return (
        <>
        <h1>Recent articles</h1>
        {content}
        </>
    )
}

export default ArticleIndex
