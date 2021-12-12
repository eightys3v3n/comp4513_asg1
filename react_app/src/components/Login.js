import React from 'react';
import { useState } from 'react';
import  { Redirect, Link, useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';

function Login(props) {
    // Login form
    // Onsubmit, POST request to the /login api (port 8080) w/ credentials inside POST request
    // We will have a context provider in the main app component for Loged in user (or if there is no one logged in)
    // If the API returns "Successfully logged in", then reroute to "/" or home --> Set context handler save info
    // Else if the API returns "Not successful", redirect back to this page

    let history = useHistory();
    // Displays a login page and allows the user to login, handling tokens
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    // Utilizes the API to retrieve a login token
    async function loginUser(creds) {

    return fetch('http://server.eighty7.ca:8082/login', {
        method: 'POST',
        headers: {
    	    'Content-Type': 'application/json',
			credentials: 'include',	
        },
        body: JSON.stringify(creds)
    })
        .then(data => data.json());
    }
    
    
    const handleSubmit = async event => {
    
        const res = await loginUser({
          email: username,
          password: password
        });

        if (res) {
            alert("Logged is successfully");
            props.setUserObject(res);
            history.push("/");
        } else {
            alert("Failed to login: "+res.status);
        }

    }

    return (
    <div className="body">
        <header className="Login">
        <h2>Login</h2>
        </header>
        <section className="login-body">
        <label>
            Username:
        </label>
        <input
            type="text"
            name="username"
            onChange={e => setUserName(e.target.value)} />
        <label>
            Password:
        </label>
        <input
            type="password"
            name="password"
            onChange={e => setPassword(e.target.value)} />
            <Button onClick={handleSubmit}>Log in</Button>
        </section>
    </div> 
    );
};

export default Login;
