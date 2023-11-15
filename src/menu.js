import { pauseBackgroundMusic, playBackgroundMusic, resumeBackgroundMusic, stopBackgroundMusic } from "./audio.js";
import { isPaused, lives, pauseTimer, resumeTimer, setIsPaused, setLives, startGame } from "./game.js";
import { resetAndShowMainMenu, resetGame } from "./reset.js";
import { moveUser } from "./user.js";

/////////////////////////////////////////////////////////////////
//selectors
const resumeButton = document.getElementById('resume-btn');
const restartButton = document.getElementById('restart-btn');
const exitBtn = document.getElementById('exit-btn');
const restartBtnGameOver = document.getElementById('restart-btn-game-over');
const mainMenuBtn = document.getElementById('main-menu-btn');
const restartBtnWin = document.getElementById('restart-btn-win');
const mainMenuBtnWin = document.getElementById('main-menu-btn-win');
export const pauseMenu = document.querySelector('.pause-menu');
export const livesDisplay = document.querySelector('.lives')
export const mainMenu = document.getElementById('main-menu');
export const gameContainer = document.getElementById('game-container');
export const gameOverMenu = document.querySelector('.game-over-menu');
export const winMenu = document.querySelector('.win-menu');

/////////////////////////////////////////////////////////////////
//event listeners
exitBtn.addEventListener('click', exitToMainMenu);

restartBtnWin.addEventListener('click',resetGame)

mainMenuBtnWin.addEventListener('click',exitToMainMenu)

resumeButton.addEventListener('click', () => {
    setIsPaused(false)

    pauseMenu.style.display = 'none';
});

restartButton.addEventListener('click', () => {
    resetGame();
    setIsPaused(false)
    pauseMenu.style.display = 'none';
    setLives(3)
    livesDisplay.innerHTML = `Lives: ${lives}`;


});

restartBtnGameOver.addEventListener('click', () => {
    hideGameOverMenu();
    startGame()
});

mainMenuBtn.addEventListener('click', () => {
    hideGameOverMenu();
    resetAndShowMainMenu();
});

/////////////////////////////////////////////////////////////////
//functions

export function togglePauseMenu() {
    setIsPaused(!isPaused)
    if (isPaused) {
       pauseTimer()
       pauseBackgroundMusic()
      pauseMenu.style.display = 'flex'; 
    } else {
        resumeTimer()
       resumeBackgroundMusic()
      pauseMenu.style.display = 'none';
    
    }
  }

export function hideGameOverMenu() {
    gameOverMenu.classList.add('hidden');
}

function exitToMainMenu() {
   
    resetAndShowMainMenu();
   
}
export function showGameOverMenu() {
    document.removeEventListener('keyup', moveUser);
    gameOverMenu.classList.remove('hidden');
    stopBackgroundMusic()

    
}

export function showWinMenu() {
    winMenu.classList.remove('hidden');
}

