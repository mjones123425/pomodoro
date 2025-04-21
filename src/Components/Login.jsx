// temp page for login / startup page
//*Change the import path for App.css before you run the code.
//*install "npm install react-router-dom" before you run the code. 
import '/Users/kl/dev/ICSI418Final/pomodoro/src/App.css';
import {React, useState} from "react";
import axios from 'axios'
import { BrowserRouter as Router, Link,useNavigate } from 'react-router-dom';
import './Home.jsx';

//Button that takes you to Home page
function MyButton() {
    return (
      <Link to="/Home">
        <button class="buttonStyle">Go to Home Page</button>
      </Link>
    );
  }

//Login page


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
    <div>
      <h1>User Name</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />      
      
      <h1>Password</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" onClick={(event) => {
          handleLogin(event, username, password)
        }}>Submit</button>   
      
      <MyButton/>
    </div>
  );
}

export default LoginContent;

