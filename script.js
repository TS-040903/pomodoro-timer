const pomodoroTimeDisplay = document.getElementById('pomodoro-time');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const pomodoroButton = document.getElementById('pomodoro');
const breakButton = document.getElementById('break');

let timerInterval;
let timeLeft;
let isRunning = false;
let isPomodoro = true;



function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    pomodoroTimeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        startButton.textContent = 'start';
    } else {
        isRunning = true;
        startButton.textContent = 'stop';
        timerInterval = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timerInterval);
                isRunning = false;
                startButton.textContent = 'start';
                resetTimer();
            }
        });
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    startButton.textContent = 'start';
    if (isPomodoro) {
        timeLeft = 25 * 60;
    } else {
        timeLeft = 5 * 60;
    }
    updateDisplay();
}

function switchMode(mode) {
    clearInterval(timerInterval);
    isRunning = false;
    startButton.textContent = 'start';
    if (mode === 'pomodoro') {
        isPomodoro = true;
        pomodoroButton.classList.add('active');
        breakButton.classList.remove('active');
        timeLeft = 25 * 60;
    } else {
        isPomodoro = false;
        breakButton.classList.add('active');
        pomodoroButton.classList.remove('active');
        timeLeft = 5 * 60;
    }
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
pomodoroButton.addEventListener('click', () => switchMode('pomodoro'));
breakButton.addEventListener('click', () => switchMode('break'));

timeLeft = 25 * 60;
updateDisplay();