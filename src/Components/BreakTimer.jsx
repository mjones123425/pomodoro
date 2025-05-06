import { useState, useEffect } from 'react';

function BreakTimer() {
  const [savedBreaks, setSavedBreaks] = useState([]);

  useEffect(() => {
    // Fetch saved breaks from localStorage
    const savedItems = JSON.parse(localStorage.getItem('savedBreaks')) || [];
    setSavedBreaks(savedItems);
  }, []);

  return (
    <div className="break-time-container">
      <h3>Your Saved Break Time Activities</h3>
      {savedBreaks.length > 0 ? (
        <ul className="saved-list">
          {savedBreaks.map(item => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      ) : (
        <p>No break activities saved yet. Go pick some!</p>
      )}
    </div>
  );
}

export default BreakTimer;
