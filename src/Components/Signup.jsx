import React from 'react'
import Login from './Login'
import axios from 'axios'
import React, {useState} from 'react';

// input fields
const [f_name, setFirstName] = useState('');
const [l_name, setLastName] = useState('');
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

// front-end API end-point
const handleSignUp = (event, f_tName, l_Name, username, password) => {
    axios.post('http://localhost:3000/createUser', { f_tName, l_tName, username, password })
        .catch((err) => alert('Error in Signing Up'))
}

// main 
const Signup = () => {
    return (
        <div className = 'allDivs'>
            <div className='header'>
                <h1>Signup</h1>
            </div>
            <div className='input'>
            <form>
                <label>First Name:
                    <input type="text"
                        value = {f_name}
                        onChange={(e) => setFirstName(e.target.value)}
                     />
                </label><br></br>
                <label>Last Name:
                    <input type="text"
                        value = {l_name}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </label><br></br>
                <label>Username:
                    <input type="text"
                        value = {username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br></br>
                <label >Password:
                    <input type="text"
                        value = {password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label> <br></br>
                <button type="button" onClick={(event) => handleSignUp(event, f_name, l_name, username, password)}>
                     Signup
                </button>
            </form>
            
            </div>
            <p>Already have an account? <b>Login</b> here</p>
        </div>
    )
}

export default Signup