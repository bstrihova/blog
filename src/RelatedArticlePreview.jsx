import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";

function RelatedArticlePreview({id}) {

    const [article, setArticle] = useState([]);
    const history = useHistory();

    

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

    let content = "";

    if (article.title) {
        content = (
            <li className="my-3">
            <div className="d-flex flex-column">
                <p className="h5 mt-0 mb-1" style={{cursor:"pointer"}} onClick={()=>history.push(`/articles/${id}`)}>{article.title}</p>
                <p>
                    <small>
                        {article.perex}
                    </small>
                </p>
            </div>
        </li>
        )
    }



    return (
        <>
        {content}
        </>
    )
}

export default RelatedArticlePreview
