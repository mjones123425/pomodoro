export function startTimer(duration, label = 'work') {
  const startTime = Date.now();
  localStorage.setItem('timerStartTime', startTime);
  localStorage.setItem('timerDuration', duration);
  localStorage.setItem('currentPhase', label); // 'work' or 'break'
  localStorage.setItem('isPaused', false); // Default to not paused
}

export function getTimeLeft() {
  const start = parseInt(localStorage.getItem('timerStartTime'), 10);
  const duration = parseInt(localStorage.getItem('timerDuration'), 10);
  const isPaused = JSON.parse(localStorage.getItem('isPaused')) || false;

  if (!start || !duration || isPaused) return duration; // If paused, return full duration left

  const elapsed = Math.floor((Date.now() - start) / 1000);
  return Math.max(0, duration - elapsed);
}

export function isTimerDone() {
  return getTimeLeft() <= 0;
}

export function togglePause() {
  const isPaused = JSON.parse(localStorage.getItem('isPaused'));
  localStorage.setItem('isPaused', !isPaused);
}