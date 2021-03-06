import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import MEDitor from '@uiw/react-md-editor';
import ImageUpload from "./ImageUpload";

function AdminArticleEdit() {

    let { id } = useParams();

    const history = useHistory();

     // redirect if you are not authenticated
    if (!localStorage.getItem("access_token")) {
        history.push("/login");
    }

    useEffect(() => {
        const loadArticle = async () => {
            const response = await fetch(`https://fullstack.exercise.applifting.cz/articles/${id}`, {
                        headers: {
                            "Authorization": localStorage.getItem('access_token'),
                            "X-API-KEY": process.env.REACT_APP_X_API_KEY
                        }
                    });
            const data = await response.json();
    
            // preloading the form with data from the article
            data && setValues({title: data.title, perex: data.perex});
            data && setContent(data.content);
            data && setImageId(data.imageId);
        };
        loadArticle();
    }, [id]);

    const [{title, perex}, setValues] = useState({
        title: "",
        perex: ""
    })

    const [content, setContent] = React.useState(`**Hello world!!!**`);
    const [imageId, setImageId] = useState("");

    console.log("title:", title, ",imageId:", imageId, ",perex:", perex, ",content:", content)

    const handleChange = (event) => {
        const allowed_names = ["title", "perex"],
            name  = event.target.name,
            value = event.target.value

        if (-1 !== allowed_names.indexOf(name)) {
            setValues(prev_values => {
                return ({...prev_values,
                    [name]: value
                });
            });
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        let request_data = {content, title, imageId, perex};
        
        const response = await fetch(`https://fullstack.exercise.applifting.cz/articles/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(request_data),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                "Authorization": localStorage.getItem('access_token'),
                "X-API-KEY": process.env.REACT_APP_X_API_KEY
            }
        });

        // post is edited
        if (response.status === 200) {
            history.push(`/articles/${id}`)
        }
        
    }

    let pageContent = "";

    if (content || title) {
        pageContent = (
            <form onSubmit={handleSubmit}>

                <div className="d-flex justify-content-start align-items-center mb-3">
                    <p className="h1 mr-4 mb-0">Edit article </p>
                    <button type="submit" className="btn btn-primary" >Save changes</button>
                </div>

                <div className="form-group">
                    <label htmlFor="title">Article Title</label>
                    <input type="text" className="form-control" name="title" value={title || ""} onChange={handleChange}/>
                </div>

                <div className="form-group my-4">
                    <label htmlFor="imageId">Feature image (old picture will remain unless you upload a new one)</label>
                    <br/>
                    <ImageUpload setImageId={setImageId}/>
                </div>

                <div className="form-group">
                    <label htmlFor="perex">Perex</label>
                    <input type="text" className="form-control"  placeholder="Summarize content of your article" name="perex" value={perex} onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <MEDitor height={200} value={content} name="content" onChange={setContent} style={{overflow: "none"}}/>
                </div>
                <a href="https://commonmark.org/help/" target="_blank" rel="noreferrer">Learn Markdown here</a>
            </form>
        )
    }

    return (
        <>
            {pageContent}
        </>
    )
}

export default AdminArticleEdit

