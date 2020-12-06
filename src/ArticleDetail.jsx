import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import Comment from "./Comment"
import RelatedArticlePreview from "./RelatedArticlePreview"
import moment from "moment"
import MDEditor from '@uiw/react-md-editor';
// import axios from "axios";

function Article() {
    let { id } = useParams();

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

    let content = "";

    if (article.comments) {
        content = (
            <div className="container">
            <section>
                <div className="row">
                    <div className="col-md-8 mb-4">
                        <p className="h1 text-break">
                            {article.title}
                        </p>
                        <p className="my-4 text-secondary">
                            barastrihova • {moment(article.createdAt).format("DD.MM.YYYY")}
                        </p>
                        {/* couldn't get the image url, so I am hardcoding cute dog pictures instead :) */}
                        <img src="http://placedog.net/1000" alt="dog" className="w-100" alt={article.title}/>

                        <div className="my-4">
                            <MDEditor.Markdown source={article.content}/>
                        </div>

                        <hr/>

                        <Comment article={article}/>

                    </div>

                    <div className="col-md-4">

                        <div className="card-body border-left m-0 p-0 pl-4">

                        <p className="h3 mb-4">Related articles</p>

                        <ul className="list-unstyled">
                            {/* I wasn't sure how to implement this, so I hardcoded three articles..I would probably need to fetch API of all articles, and filter out {id} and then map through sliced array */}
                            <RelatedArticlePreview id={"dbbdb4cf-48ee-43df-889a-e4844a006a65"}/>
                            <RelatedArticlePreview id={"3a87758a-f737-44be-98fc-b60ddc2325f2"}/>
                            <RelatedArticlePreview id={"9fcccd89-cdf2-4d1a-84d4-7fff3a43fb38"}/>

                        </ul>


                        </div>

                    </div>

                </div>

            </section>

        </div>
        )
    }

    return (
        <>
        {content}
        </>
    )
}

export default Article
