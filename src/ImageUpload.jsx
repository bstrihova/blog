import React, {useState} from 'react'
import axios from "axios";

function ImageUpload({setImageId}) {

    const [file, setFile] = useState(null);

    const fileChangedHandler = event => {
        setFile(event.target.files[0]);
        console.log(event.target.files[0]);
    }

    const uploadHandler = () => {
        console.log(file);
        const formData = new FormData()
        formData.append(
            'image',
            file,
            file.name
        )
        axios.post('https://fullstack.exercise.applifting.cz/images', formData, {
            headers: {
                "Authorization": localStorage.getItem('access_token'),
                "X-API-KEY": process.env.REACT_APP_X_API_KEY
            }})
            .then(res => {
                console.log(res);
                res.data[0].imageId && setImageId(res.data[0].imageId)
            })
    }


    return (
        <>
            <input type="file" onChange={fileChangedHandler}/>
            <button type="button" className="btn btn-secondary" onClick={uploadHandler}>
                Upload
            </button>
        </>
    )
}

export default ImageUpload
