import React, {useState} from "react";
import { useHistory } from "react-router-dom";

function Login() {

    const [{username, password}, setValues] = useState({
        username: '',
        password: ''
    })

    const history = useHistory();
    // console.log(process.env.REACT_APP_WEATHER_API_KEY)

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        let request_data = {username, password};
        const response = await fetch('https://fullstack.exercise.applifting.cz/login', {
            method: 'POST',
            body: JSON.stringify(request_data),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                "X-API-KEY": process.env.REACT_APP_X_API_KEY
            }
        });
        const data = await response.json();
        console.log(data);
         // save user info in local storage
         // I am not entirely sure about the security of this solution...if I could make my own API then I would store this info there and just fetch the data whenever needed with context....
        data && data.access_token && localStorage.setItem("access_token", data.access_token);
        data && data.access_token && localStorage.setItem("user", username);
    
        // user is authenticated
        if (response.status === 200) {
            console.log("authenticated")
            
            //  redirect home
            history.push("/");
            window.location.reload();
        }
    }

    


    const handleChange = (event) => {
        const allowed_names = ['username', 'password'],
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
        <div className="login">
            <h1>Log In</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input 
                    type="text" 
                    className="form-control"  
                    name="username" 
                    placeholder="me@example.com" 
                    value={username} 
                    onChange={handleChange}/> 
                </div>
                <div className="form-group">
                    <label htmlFor="name">Password</label>
                    <input type="password" className="form-control"  name="password" placeholder="**********" value={password} onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Log In</button>
            </form>
        </div>
    )
}

export default Login
