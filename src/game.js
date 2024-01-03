import { backgroundMusic, playBackgroundMusic, playGameOverSound, playWinSound,stopBackgroundMusic } from "./audio.js";
import { blockWidth } from "./ball.js";
import { blocks } from "./blocks.js";
import { livesDisplay, pauseMenu, showGameOverMenu, showWinMenu, togglePauseMenu } from "./menu.js";
import {  resetGame } from "./reset.js";
import { currentPosition, drawUser, isMovingLeft, isMovingRight, moveUser,user } from "./user.js";

///////////////////////////////////////////////////////////////
//selectors
const startBtn = document.getElementById('start-btn');
const mainMenu = document.getElementById('main-menu');
const gameContainer = document.getElementById('game-container');
export const grid = document.querySelector('.container');
export const scoreDisplay = document.querySelector('.score');
export const timerDisplay = document.querySelector('.timer');


/////////////////////////////////////////////////////////////////
//variables

export const boardWidth = 1020;
export const boardHeight = 600;
export let isGameRunning = false;
export let  lives = 3;
export let isPaused = false;
export let score = 0;
let timerInterval;
let remainingTime = 300; 

export function setisGameRunning(state) {
    isGameRunning = state;
}
export function setLives(newLives) {
    lives = newLives;
}
export function setIsPaused(state){
    isPaused = state
}
export function setScore(newScore) {
    score = newScore;
}

///////////////////////////////////////////////////////////////
//eventListeners
startBtn.addEventListener('click', startGame);
document.addEventListener('keyup', moveUser);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    togglePauseMenu();
  } else {
    moveUser(e);
  }
});

///////////////////////////////////////////////////////////////
//functions

export function startGame() {
    mainMenu.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    isPaused = false; 
    pauseMenu.style.display = 'none';
    resetGame();
    lives = 3
    livesDisplay.innerHTML = `Lives: ${lives}`;
   if(!backgroundMusic){
    playBackgroundMusic()
   }
   
  }
function update() {
    const moveDistance = 10;
    if (isMovingLeft && currentPosition[0] > 0) {
        currentPosition[0] = Math.max(0, currentPosition[0] - moveDistance);
    }

    if (isMovingRight && currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] = Math.min(boardWidth - blockWidth, currentPosition[0] + moveDistance);
    }

    drawUser();
    requestAnimationFrame(update);
}
export function checkForWin() {

    if (blocks.length === 0) {
        showWinMenu();
        pauseTimer()
        stopBackgroundMusic()
        playWinSound()
        isGameRunning = false;
    }
}
export function loseLife() {
    lives--;
    livesDisplay.innerHTML = `Lives: ${lives}`;
}
export function gameOver() {
    user.style.display = 'none'; // Hide the user element

    grid.removeChild(user); 
    setisGameRunning(false)
    scoreDisplay.innerHTML = 'GAME OVER';
    playGameOverSound()
    showGameOverMenu();

}
export function stopGame() {
    isGameRunning = false; 
}

//timer
function updateTimerDisplay() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timerDisplay.innerHTML = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export function startTimer() {
    timerInterval = setInterval(function() {
        if (remainingTime <= 0) {
            clearInterval(timerInterval); 
            gameOver()
        } else {
            updateTimerDisplay();
            remainingTime--; 
        }
    }, 1000); 
}

export function pauseTimer() {
    clearInterval(timerInterval);
}

export function resumeTimer() {
    startTimer();
}

export function resetTimer() {
    clearInterval(timerInterval);
    remainingTime = 300; 
    updateTimerDisplay();
}


// Start the update loop
  requestAnimationFrame(update);









