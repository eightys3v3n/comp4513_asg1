import React from 'react';
import { useState, useEffect } from 'react';
import  { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import {useContext} from 'react';
import {UserContext} from './UserContextProvider.js';

function Login(props) {
    const userObj = useContext(UserContext);
    // Login form
    // Onsubmit, POST request to the /login api (port 8080) w/ credentials inside POST request
    // We will have a context provider in the main app component for Loged in user (or if there is no one logged in)
    // If the API returns "Successfully logged in", then reroute to "/" or home --> Set context handler save info
    // Else if the API returns "Not successful", redirect back to this page
    let history = useHistory();
    console.log("Is logged in: " + userObj.isLoggedIn());

    useEffect(() => {
        if (userObj.isLoggedIn()) {
            history.push("/");
        }
    });

    // Displays a login page and allows the user to login, handling tokens
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    // Utilizes the API to retrieve a login token
    async function loginUser(creds) {
        return fetch('http://localhost:8082/api/login', {
            method: 'POST',
    		credentials: 'include',
            headers: {
        	    'Content-Type': 'application/json',
            },
            body: JSON.stringify(creds)
        })
            .then(data => data.json())
            .catch(err => {
                console.log("Failed to contact login API: "+err);
            });
    }
        
    const handleSubmit = async event => {
        const res = await loginUser({
          email: username,
          password: password
        });

        console.log(res);

        if (res) {
            userObj.logUserLocally(res);
            alert("Logged is successfully");
        } else {
            alert("Failed to login");
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
