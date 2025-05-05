import Login from './Login'
import Home from './Home'
import axios from 'axios'
import React, {useState} from 'react';
import { Link } from 'react-router-dom';



// front-end API end-point
const handleSignUp = (event, username, f_tName, l_tName, password, email) => {
    axios.post('http://localhost:3000/createUser', {username, f_tName, l_tName, password, email })
        .catch((err) => alert('Error in Signing Up'))
}

// main 
const Signup = () => {
    // input fields
    const [f_name, setFirstName] = useState('');
    const [l_name, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
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
                </label> 
                <br></br>
                <label>Email:
                    <input type="text"
                        value = {email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br></br>

                <Link to="/Home">
                <button type="button" onClick={(event) => handleSignUp(event, username, f_name, l_name, password, email)}>
                     Signup
                </button>
                </Link>
            </form>
            
            </div>
            <Link to="/Login">
            <button type="button">Already have an account?</button>
            </Link>
        </div>
    )
}

export default Signup
