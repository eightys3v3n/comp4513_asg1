import React from 'react';
import { useState, useEffect } from 'react';
import  { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import {useContext} from 'react';
import {UserContext} from './UserContextProvider.js';
import {Input} from '@mui/material';
import {InputLabel} from '@mui/material';
import {Box, Typography, TextField} from '@mui/material';

function Login(props) {
    const userObj = useContext(UserContext);
    // Login form
    // Onsubmit, POST request to the /login api (port 8080) w/ credentials inside POST request
    // We will have a context provider in the main app component for Loged in user (or if there is no one logged in)
    // If the API returns "Successfully logged in", then reroute to "/" or home --> Set context handler save info
    // Else if the API returns "Not successful", redirect back to this page
    let history = useHistory();
    console.log("Is logged in: " + userObj.isLoggedIn());

    let src = `${process.env.PUBLIC_URL}/login.jpg`;


    const [inputColor,setInputColor] = useState("primary");

    function changeInputColor(){
        if(inputColor == "primary")
            setInputColor("error");
        else
            setInputColor("primary");
    }

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
        return fetch('http://server.eighty7.ca:8082/api/login', {
            method: 'POST',
    		credentials: 'include',
            headers: {
        	    'Content-Type': 'application/json',
            },
            body: JSON.stringify(creds)
        })
            .then(res => {
                if (res.status == 200) {
                   return res.json();
                }
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
        } else {
            changeInputColor();
            alert("Failed to login");
        }

    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#AAA',
        border: '2px solid #CCC',
        boxShadow: 24,
        p: 4,
        color: "#EEE"
      };

    const flexBox={
        display: 'flex',
        justifyContent: 'center'
    }

    const background = {
        position:"absolute",
        top:"0px",
        left: "0px",
        right:"0px",
        height: "100%",
        backgroundImage: `url(${src})`,
        alt: "homepage image"
    }

    return (
        <Box style={background}>
            <Box sx={style}>
                <Box sx={flexBox}>
                    <Box>
                        <Typography variant="h2" color="black" className="Login">Login</Typography><br/> <br/>
                        <section className="login-body">
                            <InputLabel>Username:</InputLabel>
                            <Input
                                type="text"
                                name="username"
                                color="primary"
                                onChange={e => setUserName(e.target.value)} /><br/>
                            <InputLabel>Password:</InputLabel>
                            <Input
                                type="password"
                                name="password"
                                color="primary"
                                onChange={e => setPassword(e.target.value)} /><br/><br/>
                            <Button variant="contained" onClick={handleSubmit}>Log in</Button>
                        </section>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
