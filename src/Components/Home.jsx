import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import './Home.css'

export default function CountdownTimer() {
  const [cycles, setCycles] = useState('');
  const [workMinutes, setWorkMinutes] = useState('');
  const [breakMinutes, setBreakMinutes] = useState('');
  const [longBreakMinutes, setLongBreakMinutes] = useState('');
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [animate, setAnimate] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const numCycles = parseInt(cycles) || 0;
    const wM = parseInt(workMinutes) || 0;
    const bM = parseInt(breakMinutes) || 0;
    const lbM = parseInt(longBreakMinutes) || 0;

    const workTime = numCycles * wM * 60;
    const breakTime = numCycles * bM * 60;

    // Long breaks come into play if number of cycles >= 4
    const longBreakTime =
      numCycles >= 4 ? Math.floor(numCycles / 4) * lbM * 60 : 0;

    const newTotalSeconds = workTime + breakTime + longBreakTime;

    if (newTotalSeconds !== totalSeconds) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
    }

    setTotalSeconds(newTotalSeconds);
  }, [cycles, workMinutes, breakMinutes, longBreakMinutes]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleStart = (e) => {
    e.preventDefault();
  
    navigate('/MinTimer', {
      state: {
        cycles,
        workMinutes,
        breakMinutes,
        longBreakMinutes: parseInt(cycles) >= 4 ? longBreakMinutes : 0,
      },
    });
  };

  return (
    <div className="hero">
      <Link to="/UserSettings">
        <button type="button" id="user-settings"><i className="bi bi-person"></i></button>
      </Link>
      <h1 className="mb-4">Home</h1>
      <h2>How long are you working?</h2>
      <div className="text-center mb-4">
        <div className={`display-1 fw-bold clock ${animate ? 'pulse' : ''}`}>
          {formatTime(totalSeconds)}
        </div>
        <div className="text-muted">Total Countdown Time</div>
      </div>

      <form className="row g-3 justify-content-center">
        <div className="col-md-4">
          <label className="form-label"> Total Cycles</label>
          <input
            type="number"
            className="form-control"
            value={cycles}
            onChange={(e) => setCycles(e.target.value)}
            min="1"
          />
        </div>

        <div className="col-md-4">
          <label className="form-label"> Minutes per Work Cycle</label>
          <input
            type="number"
            className="form-control"
            value={workMinutes}
            onChange={(e) => setWorkMinutes(e.target.value)}
            min="1"
          />
        </div>

        <div className="col-md-4">
          <label className="form-label"> Minutes per Break</label>
          <input
            type="number"
            className="form-control"
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(e.target.value)}
            min="1"
          />
        </div>

        {parseInt(cycles) >= 4 && (
          <div className="col-md-4">
            <label className="form-label"> Minutes per Long Break</label>
            <input
              type="number"
              className="form-control"
              value={longBreakMinutes}
              onChange={(e) => setLongBreakMinutes(e.target.value)}
              min="1"
            />
          </div>
        )}
        <button className="btn btn-success btn-lg" onClick={handleStart}>
          Start
        </button>
      </form>
    </div>
  );
}
