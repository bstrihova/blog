import React, {useState, useEffect} from 'react'
import AdminArticleTableRow from './AdminArticleTableRow'
import { useHistory } from "react-router-dom";

function AdminArticleIndex() {

    const [articles, setArticles] = useState([]);
    const history = useHistory();

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
            <tbody>
                {
                articles.map((article, index)=> 
                    (
                        <AdminArticleTableRow key={index} id={article.articleId}/>
                    )
                )
                }
            </tbody>
        )
    }


    return (
        <>
        <div className="d-flex align-items-center mb-4">
            <p className="h1 mr-5">
                My articles
            </p>
            <button type="button" className="btn btn-primary" onClick={()=> history.push("/admin/create")}>Create new article</button>
        </div>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col"><input type="checkbox"/></th>
                    <th scope="col">Article title </th>
                    <th scope="col">Perex</th>
                    <th scope="col">Author ▲</th>
                    <th scope="col"># of comments</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            {content}
        </table>
        </>
    )
}

export default AdminArticleIndex
