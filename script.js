// script.js
let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

function startPause() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startPauseBtn.innerText = 'Pause';
        resetBtn.disabled = true;
        lapBtn.disabled = false;
    } else {
        clearInterval(tInterval);
        running = false;
        startPauseBtn.innerText = 'Start';
        resetBtn.disabled = false;
        lapBtn.disabled = true;
    }
}

function reset() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    display.innerText = '00:00:00';
    startPauseBtn.innerText = 'Start';
    resetBtn.disabled = false;
    lapBtn.disabled = true;
    laps.innerHTML = '';
    lapCounter = 0;
}

function lap() {
    if (running) {
        lapCounter++;
        const li = document.createElement('li');
        li.innerText = `Lap ${lapCounter}: ${display.innerText}`;
        laps.appendChild(li);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    display.innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
