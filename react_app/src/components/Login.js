import React from 'react';
import { useState } from 'react';

function Login(props) {
    // Login form
    // Onsubmit, POST request to the /login api (port 8080) w/ credentials inside POST request
    // We will have a context provider in the main app component for Loged in user (or if there is no one logged in)
    // If the API returns "Successfully logged in", then reroute to "/" or home --> Set context handler save info
    // Else if the API returns "Not successful", redirect back to this page


    // Displays a login page and allows the user to login, handling tokens
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    // Utilizes the API to retrieve a login token
    async function loginUser(creds) {
    console.warn("Currenty not validating login tokens on the server. Any non-null token is accepted");
    return fetch('https://localhost:8082/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    })
        .then(data => data.json());
    }
    
    
    const handleSubmit = async event => {
        event.preventDefault();
    
        const res = await loginUser({
            username,
            password
        });
    
        if (res.success) {
            alert("Logged in successfully");
        } else {
            alert("Failed to login: "+res.status);
        }
    }

    return (
    <div class="body">
        <header className="Login">
        <h2>Login</h2>
        </header>
        <section className="login-body">
        <form onSubmit={handleSubmit}>
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
            <input type="submit" value="Submit" />
        </form>
        </section>
    </div> 
    );
};

export default Login;