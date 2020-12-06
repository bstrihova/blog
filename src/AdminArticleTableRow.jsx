import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";

function AdminArticleTableRow({id}) {

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

    const deleteArticle = async (event) => {
        event.preventDefault();

        const response = await fetch(`https://fullstack.exercise.applifting.cz/articles/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": localStorage.getItem('access_token'),
                "X-API-KEY": process.env.REACT_APP_X_API_KEY
            }
        });

        if (response.status === 204) {
            console.log("article no longer exists");
            window.location.reload();
        }
    }

    if (article && article.comments) {
        content = (
            <tr>
                <td><input type="checkbox"/></td>
                <td>{article.title}</td>
                <td>{article.perex}</td>
                <td>{localStorage.getItem("user")}</td>
                <td>{article.comments.length}</td>
                <td>
                    <div className="d-flex">
                        <button type="button" className="btn btn-secondary mr-1" onClick={()=>(history.push(`/admin/${id}`))}>Edit</button>
                        <button type="button" className="btn btn-secondary" onClick={deleteArticle}>Delete</button>
                    </div>
                </td>
            </tr>
        )
    }

    return (
        <>
            {content}
        </>
    )
}

export default AdminArticleTableRow
