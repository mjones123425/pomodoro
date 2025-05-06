// page for the break time window
import Login from './Login'
import axios from 'axios'
import React, {useState, useEffect, useRef} from 'react';
import BreakTimer from './BreakTimer.css';
import { BrowserRouter as Router, Link,useNavigate, useLocation } from 'react-router-dom';
// page for the break time window
const BreakTime = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [secondsLeft, setSecondsLeft] = useState(state?.breakMinutes * 60 || 300); // Default to 5 minutes if not provided
    const intervalRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        setSecondsLeft(state?.breakMinutes * 60 || 300);
    }, [state?.breakMinutes]);

    useEffect(() => {
        if (!isPaused) {
            intervalRef.current = setInterval(() => {
                setSecondsLeft((prevSeconds) => {
                    if (prevSeconds <= 0) {
                        clearInterval(intervalRef.current);
                        // Transition back to work timer or next cycle
                        if (state?.currentCycle < state?.cycles) {
                            const nextCycle = state.currentCycle + 1;
                            const isLongBreak = nextCycle % 4 === 0 && state?.longBreakMinutes;
                            const nextWorkDuration = state?.workMinutes * 60;
                            navigate('/WorkTimer', {
                                state: {
                                    ...state,
                                    currentCycle: nextCycle,
                                    secondsLeft: nextWorkDuration // Optionally reset work timer duration
                                }
                            });
                        } else {
                            alert("All cycles completed!");
                            navigate('/Home'); // Or a completion page
                        }
                        return 0;
                    }
                    return prevSeconds - 1;
                });
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [navigate, state, isPaused]);

    const formatTime = (s) => {
        const m = Math.floor(s / 60).toString().padStart(2, '0');
        const sec = (s % 60).toString().padStart(2, '0');
        return `${m}:${sec}`;
    };

    const togglePause = () => {
        setIsPaused(!isPaused);
    };

    return(
      <div className="break-box">
          <div className="time-break">
            <h1>Break Time!</h1>
            <h2>{formatTime(secondsLeft)}</h2>
          </div>
          <div className="button-format">
            <button className="pause-resume" onClick={togglePause}>{isPaused ? 'Resume' : 'Pause'}</button>
            <Link to="/Home">
                <button type="button" className='skip'>Back to Home menu</button>
            </Link>
          </div>
          <div className="break-suggestions">
            <h2>↓Suggestions for your break↓</h2>
            <a href="YOUR_NETFLIX_URL" target="https://www.netflix.com/browse">Netflix</a>
          </div>
      </div>
    );
}
export default BreakTime
