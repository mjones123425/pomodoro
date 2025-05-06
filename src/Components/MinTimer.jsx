// page for the little timer in the corner of your screen (both break & work cycle)
import { useLocation , useNavigate} from 'react-router-dom';
import { useEffect, useState , useRef} from 'react';
import './MinTimer.css';

export default function WebViewWithTimer() {
    const { state } = useLocation();
  const navigate = useNavigate();

  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const secondsRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    setSecondsLeft(state.workMinutes * 60);
    secondsRef.current = state.workMinutes * 60;
  }, [state]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPausedRef.current && secondsRef.current > 0) {
        secondsRef.current -= 1;
        setSecondsLeft(secondsRef.current);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const togglePause = () => {
    setIsPaused((prev) => {
      isPausedRef.current = !prev;
      return !prev;
    });
  };

  const goToFullScreen = () => {
    navigate('/fullscreen', { state });
  };

  const formatTime = (s) => {
    const h = Math.floor(s / 3600).toString().padStart(2, '0');
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };

  return (
    <div className="webview-container">
      <div className="corner-timer">
        {formatTime(secondsLeft)}
        <div className="timer-controls mt-2">
          <button className="btn btn-light btn-sm me-2" onClick={togglePause}>
            {isPaused ? '▶' : '⏸'}
          </button>
          <button className="btn btn-light btn-sm" onClick={() => navigate('/WorkTimer', { state })}>
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
