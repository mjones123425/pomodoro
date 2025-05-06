// page for the max size timer
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import './WorkTimer.css';

export default function FullScreenPage() {
const { state } = useLocation();
const navigate = useNavigate();

const [secondsLeft, setSecondsLeft] = useState(0);
const [currentCycle, setCurrentCycle] = useState(state?.currentCycle || 1);
const [isPaused, setIsPaused] = useState(false);

const totalTime = useRef(0);
const secondsRef = useRef(0);
const isPausedRef = useRef(false);
const intervalRef = useRef(null);

useEffect(() => {
  const totalSecs =
    state.cycles * state.workMinutes * 60 +
    state.cycles * state.breakMinutes * 60 +
    Math.floor(state.cycles / 4) * state.longBreakMinutes * 60;

  totalTime.current = totalSecs;
  secondsRef.current = state.workMinutes * 60;
  setSecondsLeft(state.secondsLeft !== undefined ? state.secondsLeft : state.workMinutes * 60);

  intervalRef.current = setInterval(() => {
    if (!isPausedRef.current && secondsRef.current > 0) {
      secondsRef.current -= 1;
      setSecondsLeft(secondsRef.current);

      const elapsed = totalTime.current - secondsRef.current;
      const cycleLength =
        state.workMinutes * 60 + state.breakMinutes * 60 +
        (state.longBreakMinutes > 0 && (Math.floor(elapsed / (state.workMinutes * 60 + state.breakMinutes * 60)) + 1) % 4 === 0 ? state.longBreakMinutes * 60 : 0);

      const estimatedCycle = Math.floor(elapsed / cycleLength) + 1;
      if (estimatedCycle !== currentCycle && estimatedCycle <= state.cycles) {
        setCurrentCycle(estimatedCycle);
      }

      if (secondsRef.current === 0) {
        clearInterval(intervalRef.current);
        // Transition to break timer
        const isLongBreak = currentCycle % 4 === 0 && state.longBreakMinutes;
        const breakDuration = isLongBreak ? state.longBreakMinutes * 60 : state.breakMinutes * 60;
        navigate('/BreakTime', { state: { ...state, breakMinutes: state.breakMinutes, currentCycle: currentCycle } });
      }
    }
  }, 1000);

  return () => clearInterval(intervalRef.current);
}, [navigate, state]);

const togglePause = () => {
  setIsPaused((prev) => {
    isPausedRef.current = !prev;
    return !prev;
  });
};

const endTimer = () => {
  clearInterval(intervalRef.current);

  const elapsedSecs = totalTime.current - secondsRef.current;
  const percent = Math.floor((elapsedSecs / totalTime.current) * 100);
  const formattedTime = formatTime(elapsedSecs);

  window.alert(
    ` Timer Ended!\n\nYou studied for ${formattedTime}\n Completed up to Cycle ${currentCycle} of ${state.cycles}\n Progress: ${percent}%\nGood job!`
  );

  navigate('/Home'); // or navigate to a results page if you want
};

const formatTime = (s) => {
  const h = Math.floor(s / 3600).toString().padStart(2, '0');
  const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return `${h}:${m}:${sec}`;
};

return (
  <div className="maximized-view">
    <h1 className="display-1">{formatTime(secondsLeft)}</h1>
    <div className="info-box">
      <p><strong>Current Cycle:</strong> {currentCycle} / {state.cycles}</p>
      <p><strong>Break Duration:</strong> {state.breakMinutes} mins</p>
      {state.cycles >= 4 && (
        <p><strong>Long Break Every 4 Cycles:</strong> {state.longBreakMinutes} mins</p>
      )}
      <p><strong>Work Duration per Cycle:</strong> {state.workMinutes} mins</p>
    </div>
    <div className="mt-4">
      <button className="btn btn-secondary me-2" onClick={togglePause}>
        {isPaused ? 'Resume' : 'Pause'}
      </button>
      <button className="btn btn-light btn-sm" onClick={() => navigate('/MinTimer', { state })}>
            Back
      </button>
      <button className="btn btn-danger" onClick={endTimer}>
        End Timer
      </button>
    </div>
  </div>
);
}
