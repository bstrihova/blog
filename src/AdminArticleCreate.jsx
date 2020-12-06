import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import MEDitor from '@uiw/react-md-editor';
import ImageUpload from "./ImageUpload";

function AdminArticleCreate() {

    const history = useHistory();

    // redirect if you are not authenticated
    if (!localStorage.getItem("access_token")) {
        history.push("/login");
    }

    const [{title, perex}, setValues] = useState({
        title: "",
        // imageId: "",
        perex: ""
    })

    const [content, setContent] = useState(`**Hello world!!!**`);
    const [imageId, setImageId] = useState("");
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        let request_data = {title, imageId, perex, content};
        
        const response = await fetch('https://fullstack.exercise.applifting.cz/articles', {
            method: 'POST',
            body: JSON.stringify(request_data),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                "Authorization": localStorage.getItem('access_token'),
                "X-API-KEY": process.env.REACT_APP_X_API_KEY
            }
        });

        const data = await response.json();
    
        // post is created
        if (response.status === 200) {
            history.push(`/articles/${data.articleId}`)
        }
        
    }

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
 
    return (
        <form onSubmit={handleSubmit}>

            <div className="d-flex justify-content-start align-items-center mb-3">
                <p className="h1 mr-4 mb-0">Create new article </p>
                <button type="submit" className="btn btn-primary" >Publish Article</button>
            </div>

            <div className="form-group">
                <label htmlFor="title">Article Title</label>
                <input type="text" className="form-control" placeholder="A creative title of your article" name="title" value={title} onChange={handleChange}/>
            </div>

            <ImageUpload setImageId={setImageId}/>

            <div className="form-group">
                <label htmlFor="perex">Perex</label>
                <input type="text" className="form-control" placeholder="Summarize content of your article" name="perex" value={perex} onChange={handleChange}/>
            </div>

            <div className="form-group">
                <label htmlFor="content">Content</label>
                {/* <textarea className="form-control" rows="10" name="content" placeholder="Supports markdown. Yay!" value={content} onChange={handleChange}></textarea> */}
                <MEDitor height={200} value={content} name="content" onChange={setContent} />
            </div>
            <a href="https://commonmark.org/help/" target="_blank" rel="noreferrer">Learn Markdown here</a>
        </form>
    )
}

export default AdminArticleCreate
