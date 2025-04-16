let pomodoroCount = 0;
let timerInterval;
let currentSession = 0;

// Elements
const pomodoroWindow = document.getElementById('pomodoro-window');
const flipClock = document.querySelector('.flip-clock');
const dock = document.getElementById('dock');
const player = document.getElementById('lofi-player');

// Draggable Pomodoro Window
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
  clearInterval(timerInterval);
  let timer = duration;

  timerInterval = setInterval(() => {
    const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
    const seconds = String(timer % 60).padStart(2, '0');
    flipClock.textContent = `${minutes}:${seconds}`;

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
  if (currentSession < 5) startTimer(25 * 60);
}

function startShortBreak() {
  startTimer(5 * 60);
}

function startLongBreak() {
  startTimer(15 * 60);
}

function resetTimer() {
  clearInterval(timerInterval);
  flipClock.textContent = "25:00";
  currentSession = 0;
  updateSessionCircles();
}

// Update Session Circles
function updateSessionCircles() {
  document.querySelectorAll('.circle').forEach((circle, index) => {
    circle.classList.toggle('filled', index < currentSession);
  });
}

// Toggle Pomodoro Window
function togglePomodoroWindow() {
  pomodoroWindow.style.display = (pomodoroWindow.style.display === 'none') ? 'block' : 'none';
}

// Channel Handling
function changeChannel(videoId) {
  player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0`;
}

const channels = [
'M-4zE2GG87w', 'r3JG5gBLbpA', 'vrB9wC6quaU', '92PvEVG0sKI', 'hB2LatX6NLg','vYIYIVmOo3Q', 'CX9_h23icoM', 'yf5NOyy1SXU',
'4LIu4EyuDXI', '5yx6BWlEVcY', '0pb3E4PGxq8','Vg13S-zzol0','FYJ7RCDgFwE', 'LC0fYEpy2ng', 'nP-aOc7g228', '5D5b0-hfzno',
'jEIFHt4q6nA', 'IDZHHQsmvmc','yr9ZxQaWkqs', '_mHmfLfx0NU', 'x0OLPEjna8A', 'KMXZF-K2mus', 'GB7kh1tvZxY', 'orFvdB0gJng',
'XM8bbRA3qio', 'd_t5nnK9Rn4', '28KRPhVzCus', 'ft6R-UNXLSs', 'snL_Pdh51ww', 'dw_Bx0e0lis','pxWfp8Hxazo','x9MolslcpzU',
'1AOMHYL_pz4','jfKfPfyJRdk', 'R4jvhTed_gM', 'WcI5cDt37ec', '7NOSDKb0HlU','PRgS7hBgR1k','Lv0SzPoZltY', '6tWWPn1lYgU', 
'erUTqlcsDJI', 'Na0w3Mz46GA', 'wJSg1H8wOUg', 'pJE-euPdroo' ]


function surpriseChannel() {
  changeChannel(channels[Math.floor(Math.random() * channels.length)]);
}

// Dock visibility control
let dockTimeout;

dock.addEventListener('mouseenter', () => {
  clearTimeout(dockTimeout);
});
dock.addEventListener('mouseleave', () => {
  dockTimeout = setTimeout(() => {
    dock.classList.remove('visible');
  }, 3000);
});


document.addEventListener('mousemove', (e) => {
  if (e.clientY > window.innerHeight - 50) {
    dock.classList.add('visible');
    clearTimeout(dockTimeout);
    dockTimeout = setTimeout(() => dock.classList.remove('visible'), 3000);
  }
});



