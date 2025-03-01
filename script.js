const pomodoroTimeDisplay = document.getElementById('pomodoro-time');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const pomodoroButton = document.getElementById('pomodoro');
const breakButton = document.getElementById('break');

let timer;
let timeLeft = 25 * 60;
let isRunning = false;
let mode = 'pomodoro';


function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    pomodoroTimeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (isRunning) {
        clearInterval(timer);
        startButton.textContent = 'start';
        isRunning = false;
    } else {
        isRunning = true;
        startButton.textContent = 'stop';
        timer = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timer);
                startButton.textContent = 'start';
                isRunning = false;
                resetTimer();
            }
        });
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    startButton.textContent = 'start';
    timeLeft = mode === 'pomodoro' ? 25 * 60 : 5 * 60;
    updateDisplay();
}


startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

pomodoroButton.addEventListener('click', () => {
    stopTimer();
    pomodoroButton.classList.add('active');
    breakButton.classList.remove('active');
    mode = 'pomodoro';
    resetTimer();
});

breakButton.addEventListener('click', () => {
    stopTimer();
    breakButton.classList.add('active');
    pomodoroButton.classList.remove('active');
    mode = 'break';
    resetTimer();
});

function stopTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        startButton.textContent = 'start';
    }
}



resetTimer();