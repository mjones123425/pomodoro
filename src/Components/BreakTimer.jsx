// page for the break time window
import Login from './Login'
import axios from 'axios'
import React, {useState} from 'react';
//import Home from './Users/kl/Shin_Pomodoro/pomodoro-main/src/Components/Home'
import { BrowserRouter as Router, Link,useNavigate } from 'react-router-dom';
// page for the break time window
const BreakTime = () => {
    return(
    <div>
       
       
        <h1>Break Time!</h1>
        <Link to="/Home">
                  <button type="button" class='skip'>Back to Home menu</button>
        </Link>
        <h2>↓Suggestions for your break↓</h2>
        <a href="YOUR_NETFLIX_URL" target="https://www.netflix.com/browse">Netflix</a>
    </div>
    );
}
export default BreakTime