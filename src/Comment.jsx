import React, {useState} from 'react'
import moment from 'moment-timezone';

function Comment({article}) {

    const [{content, articleId, author}, setValues] = useState({
        content: "",
        articleId: article.articleId,
        author: localStorage.getItem("user"),
    })

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        
        let request_data = {content, articleId, author};
        
        const response = await fetch('https://fullstack.exercise.applifting.cz/comments', {
            method: 'POST',
            body: JSON.stringify(request_data),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                "Authorization": localStorage.getItem('access_token'),
                "X-API-KEY": process.env.REACT_APP_X_API_KEY
            }
        });

        // comment is created
        if (response.status === 200) {
            window.location.reload();
        }
        
    }


    const handleChange = (event) => {
        const allowed_names = ['content',"author","articleId"],
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

    let commentSectionContent = "";

    if (article.comments) {
        commentSectionContent = (
            <div className="card card-comments mt-3 wow fadeIn border-0">
                <div className="card-body p-0">

                    <p className="h3 mb-3">
                        Comments 
                        ({article.comments.length})
                        </p>

                    <form onSubmit={handleCommentSubmit}>
                        <div className="d-flex align-items-center justify-content-between my-4">

                            <div className="col-2">
                                <img className="rounded-circle img-thumbnail border-0" style={{objectFit: "cover"}} src="http://placedog.net/131/131" alt="person who commented"/>
                            </div>      
                            <input type="text" name="content" className="form-control" rows="5" placeholder="Join the discussion" onChange={handleChange} value={content}/>
                        </div>
                    </form>

                    {article.comments.sort((a,b)=> (new Date(b.createdAt) - new Date(a.createdAt))).map((comment, index)=> {

                        // unfortunately I couldn't make it work so that it displays how many seconds/minutes ago the comment was posted...but it shows hours and days and further :)
                        var commentTime = moment.tz(comment.createdAt,"Europe/Prague");

                        return (

                        <div className="d-flex mb-5" key={index}>
                            <div className="col-2">
                                <img className="rounded-circle img-thumbnail border-0" src="http://placedog.net/130/130" alt="pic"/>
                            </div>

                            <div className="d-flex flex-column">
                                <div className="d-flex mb-2">
                                    <strong className="mr-2">{comment.author}</strong>
                                    <span>{commentTime.fromNow()}</span>
                                </div>
                                <p>{comment.content}</p>
                                <div className="d-flex">
                                    <span className="border-right px-2 mr-1">+3</span>
                                    <span className="border-right px-2 mr-1">↑</span>
                                    <span className="border-right px-2">↓</span>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <>
        {commentSectionContent}
        </>
    )
}

export default Comment
