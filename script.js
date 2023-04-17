"use strict";

// add main containers
document.body.innerHTML = ` <div class="stopwatch-container">
                                <div class="board"></div>
                                <div class="buttons"></div>
                                <div class="laps"></div>
                            </div>`;

const board = document.querySelector('.board');
const btns = document.querySelector('.buttons');
const laps = document.querySelector('.laps');

// add buttons
btns.innerHTML = `<button class="start-btn">Start</button>
                  <button class="lap-btn hide">Lap</button>
                  <button class="reset-btn hide">Reset</button>
                  <button class="pause-btn hide">Pause</button>`;

const startBtn = document.querySelector('.start-btn');
const lapBtn = document.querySelector('.lap-btn');
const resetBtn = document.querySelector('.reset-btn');
const pauseBtn = document.querySelector('.pause-btn');

// define some start values
board.textContent = '00:00:00';
let startTime = 0;
let elapsedTime = 0;
let timeInterval;
let lapsCount = 1;

// show/hide button elements
function updateBtns(value){
    switch (value){
        case 'start': show([lapBtn, pauseBtn]);
                      hide([startBtn, resetBtn]);
        break;
        case 'pause': show([resetBtn, startBtn]);
                      hide([pauseBtn, lapBtn]);
        break;
        case 'stop':  show([startBtn]);
                      hide([resetBtn]);
        break;      
    }
}

// add 'show' class and remove 'hide' class for elements from the array
function show(arr) {
    arr.forEach(element => {
       element.classList.remove('hide');
       element.classList.add('show');
    });
}

// add 'hide' class and remove 'show' class for elements from the array
function hide(arr) {
    arr.forEach(element => {
        element.classList.remove('show');
        element.classList.add('hide');
    });
}


function updateTimer(){
    elapsedTime = Date.now() - startTime;
    board.textContent = updateBoard();
}

// return updated time in 00:00:00 format
function updateBoard(){
    const time = new Date(elapsedTime);
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(time.getMilliseconds() / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

// listener for start button
startBtn.addEventListener('click', () => {
    updateBtns('start');
    startTime = Date.now() - elapsedTime;
    timeInterval = setInterval(updateTimer, 10);
});

// listener for lap button
lapBtn.addEventListener('click', () => {
    updateBtns('lap');
    elapsedTime = Date.now() - startTime;
    laps.innerHTML += `<div>#${lapsCount} ${updateBoard()}</div>`;
    lapsCount++;
});

// listener for reset button
resetBtn.addEventListener('click', () => {
    updateBtns('stop');
    clearInterval(timeInterval);
    startTime = 0;
    elapsedTime = 0;
    laps.innerHTML = '';
    lapsCount = 1;
    board.textContent = updateBoard();
});

// listener for pause button
pauseBtn.addEventListener('click', () => {
    updateBtns('pause');
    clearInterval(timeInterval);
    elapsedTime = Date.now() - startTime;
    board.textContent = updateBoard();
});