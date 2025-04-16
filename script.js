// script.js

let pomodoroCount = 0;
let timerInterval;
let currentSession = 0;

// Draggable Pomodoro Window
const pomodoroWindow = document.getElementById('pomodoro-window');
let isDragging = false;
let offsetX, offsetY;

pomodoroWindow.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - pomodoroWindow.getBoundingClientRect().left;
  offsetY = e.clientY - pomodoroWindow.getBoundingClientRect().top;
});

window.addEventListener('mousemove', (e) => {
  if (isDragging) {
    pomodoroWindow.style.left = `${e.clientX - offsetX}px`;
    pomodoroWindow.style.top = `${e.clientY - offsetY}px`;
  }
});

window.addEventListener('mouseup', () => {
  isDragging = false;
});

// Timer Functions
function startTimer(duration) {
  clearInterval(timerInterval); // Clear any existing timer
  const flipClock = document.querySelector('.flip-clock');
  let timer = duration, minutes, seconds;

  timerInterval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    flipClock.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(timerInterval);
      flipClock.textContent = "00:00";
      if (currentSession < 5) {
        currentSession++;
        updateSessionCircles();
      }
    }
  }, 1000);
}

function startStudy() {
  if (currentSession < 5) {
    startTimer(25 * 60); // 25 minutes
  }
}

function startShortBreak() {
  startTimer(5 * 60); // 5 minutes
}

function startLongBreak() {
  startTimer(15 * 60); // 15 minutes
}

function resetTimer() {
  clearInterval(timerInterval);
  const flipClock = document.querySelector('.flip-clock');
  flipClock.textContent = "60:00";
  currentSession = 0;
  updateSessionCircles();
}

// Update Session Circles
function updateSessionCircles() {
  const circles = document.querySelectorAll('.circle');
  circles.forEach((circle, index) => {
    if (index < currentSession) {
      circle.classList.add('filled');
    } else {
      circle.classList.remove('filled');
    }
  });
}

// Close Window
function closeWindow() {
  pomodoroWindow.style.display = 'none';
}

// Toggle Window
function togglePomodoroWindow() {
  if (pomodoroWindow.style.display === 'none') {
    pomodoroWindow.style.display = 'block';
  } else {
    pomodoroWindow.style.display = 'none';
  }
}

function changeChannel(videoId) {
  const player = document.getElementById('lofi-player');
  player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0`;
}

// Dock visibility control
const dock = document.getElementById('dock');
let dockTimeout;

// Show dock when mouse enters window
document.addEventListener('mousemove', (e) => {
  if (e.clientY > window.innerHeight - 50) {
    dock.classList.add('visible');
    clearTimeout(dockTimeout);
    dockTimeout = setTimeout(() => {
      dock.classList.remove('visible');
    }, 3000); // Hide after 3 seconds of inactivity
  }
});

// Hide dock when mouse leaves window
document.addEventListener('mouseleave', () => {
  dock.classList.remove('visible');
});

// Channel changing function
function changeChannel(videoId) {
  const player = document.getElementById('lofi-player');
  player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0`;
}

// Pomodoro window toggle
function togglePomodoroWindow() {
  const pomodoroWindow = document.getElementById('pomodoro-window');
  if (pomodoroWindow.style.display === 'none') {
    pomodoroWindow.style.display = 'block';
  } else {
    pomodoroWindow.style.display = 'none';
  }
}

