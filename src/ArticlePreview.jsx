import React, {useEffect, useState} from 'react';
import moment from "moment";

function ArticlePreview({id}) {

    const [article, setArticle] = useState([]);

    useEffect(() => {
        const loadArticle = async () => {
            const response = await fetch(`https://fullstack.exercise.applifting.cz/articles/${id}`, {
                        headers: {
                            "Authorization": localStorage.getItem('access_token'),
                            "X-API-KEY": process.env.REACT_APP_X_API_KEY
                        }
                    });
            const data = await response.json();
            data && setArticle(data);
        };
        loadArticle();
    }, [id]);

    const url = `/articles/${id}`

    let content = "";


    if (article.content && article.comments) {
        content = (
            <div className="articlePreview my-4">
                <img src="http://placedog.net/1000" style={{objectFit: "cover"}} alt="cat" className="articlePreview__img"/>
                <div className="articlePreview__detail">
                    <h2>{article.title}</h2>
                    <p className="articlePreview__detail__rowInfo">
                        <span>barastrihova • {moment(article.createdAt).format("DD.MM.YYYY")}</span>
                    </p>
                    <p>
                        {article.perex}
                    </p>
                    <p className="articlePreview__detail__rowInfo">
                        <a href={url}>Read whole article</a> {article.comments.length} comments
                    </p>
                </div>
            </div>
        )
    }

    return (
        <>
            {content}
        </>
    )
}

export default ArticlePreview
