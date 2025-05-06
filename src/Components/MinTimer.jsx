import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getTimeLeft, isTimerDone, startTimer, togglePause } from './timer';
import './MinTimer.css';

export default function MinTimer() {
  const navigate = useNavigate();
  const state = useLocation();
  const [secondsLeft, setSecondsLeft] = useState(getTimeLeft());
  const [isPaused, setIsPaused] = useState(JSON.parse(localStorage.getItem('isPaused')));


  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      const time = getTimeLeft();
      setSecondsLeft(time);

      if (isTimerDone()) {
        clearInterval(interval);

        // Transition to next phase
        const currentPhase = localStorage.getItem('currentPhase');
        if (currentPhase === 'work') {
          const breakMinutes = JSON.parse(localStorage.getItem('timerSettings')).breakMinutes;
          startTimer(breakMinutes * 60, 'break');
          navigate('/BreakTimer');
        } else {
          navigate('/');
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const togglePauseResume = () => {
    togglePause(); // Update the paused state in localStorage
    setIsPaused((prev) => !prev); // Toggle state for local UI
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  return (
    <div className="webview-container">
      <div className="corner-timer">
      {formatTime(secondsLeft)}
        <div className="timer-controls mt-2">
          <button onClick={togglePause}>
            {isPaused ? '▶' : '⏸'}
          </button>
          <button onClick={() => navigate('/WorkTimer', { state })}>
            +
          </button>
        </div>
      </div>

      <iframe
        src="https://en.wikipedia.org/wiki/Main_Page"
        title="Study Browser"
        className="study-browser"
      ></iframe>
    </div>
  );
}
