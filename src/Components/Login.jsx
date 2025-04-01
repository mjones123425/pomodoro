import React from 'react'
import Signup from './Signup'
import {React, useState} from "react";
import axios from 'axios'

// input fields
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

// front-end API end-point
const handleLogin = (event, username, password) => {
    axios.get('http://localhost:3000/getUser', { params: {username, password}})
        .then((res) => {
            if (res.data) {
                alert('Login Successful!')
            }
            else {
                alert('Incorrect Credentials')
            }
        })
        .catch((err) => alert('Error in Login'))
}
// main
const Login = () => {
    return (
        <div className = 'allDivs'>
            <div className='header'>
                <h1>Login</h1>
            </div>
            <div className='input'>
            <form>
                <label>Username:
                    <input type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br></br>
                <label >Password:
                    <input type="text" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                
                <button type="button" onClick={(event) => {
                    handleLogin(event, username, password)
                }}> Login</button>
                
            </form>
            </div>
        </div>
    )
}

export default Login