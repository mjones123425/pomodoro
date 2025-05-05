//* NOTE FOR TEAM:
//*install "npm install react-router-dom" and "npm install axios" before you run the code. 

import {React, useState} from "react";
import axios from 'axios'
import { BrowserRouter as Router, Link,useNavigate } from 'react-router-dom';
import './Home.jsx';
import './Signup.jsx'
import './Login.css'
import logo from './logo.png';

const LoginContent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  const handleLogin = (event, username, password) => {
    axios.get('http://localhost:9000/getUser', { params: { username, password}})
        .then((res) => {
            if (res.data) {
                navigate('/Home');
            }
            else {
                alert('Wrong Credentials')
            }
        })
        .catch((err) => alert('Error in Login'))
  }

  //Communicates with the server to check if the user exists in the database.
  //+Button that takes you to signup page
  return (
    <div className="login-container">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Signika:wght@600&display=swap');
        </style>
        <div className="login-box">
            <h1>Welcome to Pomodoro!</h1>
            <img src={logo} alt="Logo" class="logo"/>
            <form>
            <h2 className="login-title">Login</h2>
                <label>User Name</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />      

                <br></br>
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <br></br>
                <button class = "b1" type="button" onClick={(event) => {
                  handleLogin(event, username, password)
                }}>Submit</button>   

                <br></br>
                <Link to="/signup">
                  <button type="button">Don't have an account?</button>
                </Link>
                <Link to="/Home">
                  <button type="button" class='skip'>Skip Login</button>
                </Link>
                </form>
                <div className='info-box'>
                    <h4>What's Pomodoro?</h4>
                    <p>The Pomodoro Technique is a time management method that uses a timer to break work into intervals,
                        traditionally 25 minutes in length, separated by short breaks. 
                        There are many benefits such as:</p>
                    <ul>
                        <li>improving focus and productivity</li>
                        <li>reducing burnout</li>
                        <li>promoting better time management skills</li>
                        <li>and more!</li>
                    </ul>
                    <p>Our goal is to make a seamless browser extention for you to practice these skills! </p>
                </div>
            </div>
    </div>
  );
}

export default LoginContent;
