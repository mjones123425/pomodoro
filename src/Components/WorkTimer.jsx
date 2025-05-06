import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getTimeLeft, isTimerDone, startTimer, togglePause } from './timer';
import './WorkTimer.css';

export default function FullScreenPage() {
const { state } = useLocation();
const navigate = useNavigate();
const [secondsLeft, setSecondsLeft] = useState(getTimeLeft());
const [isPaused, setIsPaused] = useState(JSON.parse(localStorage.getItem('isPaused')));
const [tasks, setTasks] = useState([]);
const [newTask, setNewTask] = useState('');

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

  // Load tasks from localStorage 
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage 
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    const task = { id: Date.now(), text: newTask, completed: false };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };



return (
  <div className="maximized-view">
    <h1 className="display-1">{formatTime(secondsLeft)}</h1>
    <div className="info-box">
    </div>
    <div >
      <button onClick={togglePause}>
        {isPaused ? 'Resume' : 'Pause'}
      </button>
      <button onClick={() => navigate('/MinTimer', { state })}>
            Back
      </button>
    </div>

    <div className="todo-container">
      <h1 className="todo-title">To-Do List</h1>
      <div className="todo-input-container">
        <input
          className="todo-input"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <button className="todo-button" onClick={handleAddTask}>
          +
        </button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="todo-task">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span className={task.completed ? 'completed' : ''}>
              {task.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}
