import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import './Home.css'
import logo from './logo.png';
import pic1 from './pic1.jpeg';
import pic2 from './pic2.png';
import pic3 from './pic3.avif';
import { startTimer } from './timer';

export default function CountdownTimer() {
  const [cycles, setCycles] = useState('');
  const [workMinutes, setWorkMinutes] = useState('');
  const [breakMinutes, setBreakMinutes] = useState('');
  const [longBreakMinutes, setLongBreakMinutes] = useState('');
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [animate, setAnimate] = useState(false);

  const navigate = useNavigate();

  const [savedBreaks, setSavedBreaks] = useState(() => {
    const saved = localStorage.getItem('savedBreaks');
    return saved ? JSON.parse(saved) : [];
  });
  
  const clearBreaks = () => {
    setSavedBreaks([]);
    localStorage.removeItem('savedBreaks'); 
  };

  const [activeTab, setActiveTab] = useState(1);

  const breakItems = [
    {
      
      id: 1,
      title: "5 Minute Seated Stretches",
      type: "video",
      url: "https://www.youtube.com/embed/xRH1To_xyr8?si=OPCPgws98b9LQxFt"
    },
    {
      id: 2,
      title: "The Science of Learning",
      type: "video",
      url: "https://www.youtube.com/embed/pN34FNbOKXc"
    },
    {
      id: 3,
      title: "How to Practice Effectively... for Just About Anything",
      type: "video",
      url: "https://www.youtube.com/embed/falHoOEUFz0"
    },
    {
      id: 4,
      title: "Geography Lesson: Pompeii Volcano Eruption", 
      type: "video",
      url: "https://www.youtube.com/embed/YIZ4aSKT3mo?si=DUeRjcJno_TcdN8P&amp;controls=0"
    }, 
    {
      id: 5,
      title: "26,000 Dominoes ft. SPONGEBOB!",
      type: "video",
      url: "https://www.youtube.com/embed/4-kYRawXi84?si=oZzatiWRucO8nhfc&amp;controls=0"
    },
    {
      id: 6,
      title: "Will It Cereal? Taste Test",
      type: "video",
      url: "https://www.youtube.com/embed/Ip0XlEmJafk?si=Q3RO_95HPOiLxUll&amp;controls=0"
    },
    {
      id: 7,
      title: "The Plague That Made People Dance Themselves to Death",
      type: "video",
      url: "https://www.youtube.com/embed/TKhVE-pP7hA?si=Ul-HzGJ17yNo9_Ed&amp;controls=0"
    },
    {
      id: 8,
      title: "Russian Sleep Experiment - EXPLAINED",
      type: "video",
      url: "https://www.youtube.com/embed/8eq2vGEEbB4?si=bvKwmTT723knuuUN"
    }, 
    {
      id: 9,
      title: "Calming Music",
      type: "video",
      url: "https://www.youtube.com/embed/koRbYQyPU0U?si=CIricyfkzp_DXGb2&amp;controls=0"
    }, 
    {
      id: 10,
      title: "Why You Learn More Effectively by Teaching Others",
      type: "article",
      url: "https://fs.blog/feynman-learning-technique/",
      description: "The Feynman Technique breaks down complex ideas into teachable steps."
    },
    {
      id: 11,
      title: "The Science of Learning",
      type: "article",
      url: "https://www.cultofpedagogy.com/learning-science/",
      description: "How memory and understanding work based on cognitive science."
    },
    {
      id: 12,
      title: "How Coffee Affects Your Brain",
      type: "article",
      url: "https://www.healthline.com/nutrition/how-coffee-affects-your-brain",
      description: "Learn how caffeine boosts alertness and mood in under 5 minutes."
    },
    {
      id: 13,
      title: "The Surprising Origin of the High Five",
      type: "article",
      url: "https://www.history.com/news/the-history-of-the-high-five",
      description: "A quick dive into the quirky moment that sparked the high five."
    },
    {
      id: 14,
      title: "What Makes Popcorn Pop?",
      type: "article",
      url: "https://www.exploratorium.edu/snacks/pop-popcorn",
      description: "The simple science behind your favorite movie snack."
    },
    {
      id: 15,
      title: "Why Do Cats Knead?",
      type: "article",
      url: "https://www.purina.co.uk/articles/cats/behaviour/common-questions/why-do-cats-knead",
      description: "A charming explanation of a cat’s comforting behavior."
    },
    {
      id: 16,
      title: "The Secret Life of Redheads",
      type: "article",
      url: "https://www.nationalgeographic.com/science/article/genetics-redhead-myths-truths",
      description: "Why red hair is rare and the genes behind it."
    },
    {
      id: 17,
      title: "How Velcro Was Invented",
      type: "article",
      url: "https://www.smithsonianmag.com/innovation/velcro-how-it-was-invented-180978783/",
      description: "A short story of burrs, a dog, and a brilliant idea."
    }, 
    {
      id: 18,
      title: "Quick Draw!",
      type: "game",
      url: "https://quickdraw.withgoogle.com/",
      description: "Can a neural net guess what you're drawing? Play this fun doodle guessing game."
    },
    {
      id: 19,
      title: "2048",
      type: "game",
      url: "https://play2048.co/",
      description: "Combine the numbers to reach 2048 in this classic sliding puzzle."
    },
    {
      id: 20,
      title: "Slither.io",
      type: "game",
      url: "https://slither.io/",
      description: "Grow your snake and avoid others in this addictive online multiplayer game."
    },
    {
      id: 21,
      title: "Tetris",
      type: "game",
      url: "https://tetris.com/play-tetris",
      description: "Play the classic block-stacking puzzle game right in your browser."
    },
    {
      id: 22,
      title: "Doodle Jump Online",
      type: "game",
      url: "https://www.coolmathgames.com/0-doodle-jump",
      description: "Bounce your way up and avoid obstacles in this simple vertical platformer."
    }
  ];
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

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('savedBreaks')) || [];
    setSavedBreaks(savedItems);
  }, []);

  const handleSave = (item) => {
    // Check if the item is already saved
    if (!savedBreaks.some(saved => saved.id === item.id)) {
      const updatedBreaks = [...savedBreaks, item];
      setSavedBreaks(updatedBreaks);
      // Save to localStorage
      localStorage.setItem('savedBreaks', JSON.stringify(updatedBreaks));
    }
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleStart = () => {
    const data = {
      cycles,
      workMinutes,
      breakMinutes,
      longBreakMinutes,
    };
  
    localStorage.setItem('timerSettings', JSON.stringify(data));
    localStorage.setItem('remainingCycles', cycles);
    startTimer(workMinutes * 60, 'work');
    navigate('/MinTimer');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'tab1':
        return  (
          <ul className="item-list">
          {breakItems
            .filter(item => item.id >= 1 && item.id <= 9)
            .map(item => (
              <li key={item.id} className="item">
                <h4>{item.title} ({item.type})</h4>
                {item.type === 'video' && (
                  <iframe
                    src={item.url}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
                <button onClick={() => handleSave(item)}>Save for Break</button>
              </li>
            ))}
        </ul>)
      case 'tab2':
        return (
          <ul className="item-list">
          {breakItems
            .filter(item => item.id >= 10 && item.id <= 17)
            .map(item => (
              <li key={item.id} className="item">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="article-link"
                >
                  Read Article →
                </a>
                <button onClick={() => handleSave(item)}>Save for Break</button>
              </li>
            ))}
        </ul>)
      case 'tab3':
        return (
          <ul className="item-list">
          {breakItems
            .filter(item => item.id >= 18 && item.id <= 22)
            .map(item => (
              <li key={item.id} className="item">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="play-button">
                  Play Now
                </a>
                <button onClick={() => handleSave(item)}>Save for Break</button>
              </li>
            ))}
        </ul>)
      default:
        return null;
    }
  };

  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const filteredBreaks = savedBreaks.filter((item) => {
    const startId = (activeTab - 1) * 5 + 1;
    const endId = activeTab * 5;
    return item.id >= startId && item.id <= endId;
  });
  
  return (
    <div className="home-container">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Signika:wght@600&display=swap');
      </style>
      <div className="home-box">
      <Link to="/UserSettings">
        <button type="button" id="user-settings"><i className="bi bi-person"></i></button>
      </Link>
        <h1 className="mb-4">Pomodoro - Home</h1>
        <img src={logo} alt="Logo" class="logo"/>

        <div className='home-info-box'>
        <div>
          <h4>Suggested Work Times:</h4>

           <h5>Traditional Pomodoro</h5>
            <div className='div'>
              <ul className='list'>
                <li>Work Time: 25 mins.</li>
                <li>Break Time: 5 mins.</li>
                <li>x3 times = 1 hour, 30 mins.</li>
              </ul>
              <img src={pic1} alt="Example" className="image" />
            </div>
          </div>

          <h5>Extended Pomodoro</h5>
          <div className='div'>
            <ul className='list'>
                <li>Work Time: 25 mins.</li>
                <li>Break Time: 5 mins.</li>
                <li>Long Break Time: 20 mins.</li>
                <li>x5 times = 2 hours, 20 mins.</li>
            </ul>
            <img src={pic2} alt="Example" className="image2" />
          </div>

          <h5>Undergrad Special</h5>
          <div className='div'>
            <ul className='list'>
              <li>Work Time: 20 mins.</li>
              <li>Break Time: 5 mins.</li>
              <li>Long Break Time: 20 mins.</li>
              <li>x9 times = 4 hours, 25 mins.</li>
          </ul>
          <img src={pic3} alt="Example" className="image" />
          </div>
        </div>

       <div className={`display-1 fw-bold clock ${animate ? 'pulse' : ''}`}>
          {formatTime(totalSeconds)}
        </div>
        <div>Total Pomodoro Time</div>
   
        <form className="custom-form" onSubmit={(e) => { handleStart(); }}>
          <h2 className="form-title">How long are you working?</h2>

          <div className="form-group">
            <label className="form-label">Total Cycles</label>
            <input
              type="number"
              className="form-input"
              value={cycles}
              onChange={(e) => setCycles(e.target.value)}
              min="1"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Minutes per Work Cycle</label>
            <input
              type="number"
              className="form-input"
              value={workMinutes}
              onChange={(e) => setWorkMinutes(e.target.value)}
              min="1"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Minutes per Break</label>
            <input
              type="number"
              className="form-input"
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(e.target.value)}
              min="1"
            />
          </div>

          {parseInt(cycles) >= 4 && (
            <div className="form-group">
              <label className="form-label">Minutes per Long Break</label>
              <input
                type="number"
                className="form-input"
                value={longBreakMinutes}
                onChange={(e) => setLongBreakMinutes(e.target.value)}
                min="1"
              />
            </div>
          )}

            <button type="submit">Start</button>
        </form>
        <div className='spacer'></div>

        <h2>Break Time Options</h2>
        <div className="tabs-container">
          <div className="tabs-header">
            <button
              className={activeTab === 'tab1' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('tab1')}
            >
             Watch
            </button>
            <button
              className={activeTab === 'tab2' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('tab2')}
            >
              Read
            </button>
            <button
              className={activeTab === 'tab3' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('tab3')}
            >
              Play
            </button>
          </div>
          <div className="tabs-content">
            {renderContent()}
          </div>
      </div>

        <div className="break-container">
          <h4>Break Time Picks:</h4>
          <ul className="saved-list">
           {savedBreaks.map(item => (
            <li key={item.id}>{item.title} ({item.type})</li>
            ))}
          </ul>
         <button onClick={clearBreaks} className="clear-btn">
            Clear Break Picks
         </button>
        </div>

      </div>
    </div>
  );
}
