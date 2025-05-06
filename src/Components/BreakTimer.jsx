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

    const [savedBreaks, setSavedBreaks] = useState([]);

  useEffect(() => {
    // Fetch saved breaks from localStorage
    const savedItems = JSON.parse(localStorage.getItem('savedBreaks')) || [];
    setSavedBreaks(savedItems);
  }, []);

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
          <h3>Your Saved Break Time Activities</h3>
            {savedBreaks.length > 0 ? (
              <ul className="saved-list">
                {savedBreaks.map(item => (
                  <li key={item.id} style={{ marginBottom: '1.5rem' }}>
                    <iframe
                      src={item.url}
                      title={`Break Activity ${item.id}`}
                      width="100%"
                      height="400"
                      style={{ border: '1px solid #ccc', borderRadius: '8px' }}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No break activities saved yet. Go pick some!</p>
            )}
            <h2>↓Suggestions for your break↓</h2>
            <li><a href="https://www.netflix.com/browse" target="_blank" rel="noopener noreferrer">Netflix</a></li>
            <li><a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            <li><a href="https://www.ted.com/talks" target="_blank" rel="noopener noreferrer">TED Talks</a></li>
            <li><a href="https://www.nationalgeographic.com/latest-stories" target="_blank" rel="noopener noreferrer">National Geographic Articles</a></li>
            <li><a href="https://www.medium.com" target="_blank" rel="noopener noreferrer">Medium (Various Topics)</a></li>
            <li><a href="https://www.smithsonianmag.com" target="_blank" rel="noopener noreferrer">Smithsonian Magazine</a></li>
          </div>
      </div>
    );
}
export default BreakTime
