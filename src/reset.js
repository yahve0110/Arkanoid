import {  restartBackgroundMusic, resumeBackgroundMusic, stopBackgroundMusic } from "./audio.js";
import { drawBall, setBallPosition, setXDirection, setYDirection } from "./ball.js";
import { addBlocks, clearBlocks, fillBlocks } from "./blocks.js";
import { lives,  resetTimer,  score, scoreDisplay, setIsPaused, setLives, setScore, setisGameRunning, startTimer, stopGame } from "./game.js";
import { gameContainer, hideGameOverMenu, livesDisplay, mainMenu, pauseMenu, winMenu } from "./menu.js";
import { drawUser, moveUser, setcurrentPosition } from "./user.js";


/////////////////////////////////////////////////////////////////
//functions
export function resetGame() {
    // clear existing blocks
    const allBlocks = document.querySelectorAll('.block');
    allBlocks.forEach((block) => block.remove());

   clearBlocks()

   fillBlocks();

    addBlocks();

    setBallPosition([450, 40]);
    setcurrentPosition([410, 10]) 
    setScore(0);

    drawUser();
    drawBall();
    scoreDisplay.innerHTML = `Score: ${score}`;

  
    winMenu.classList.add('hidden');
    resetTimer()
    startTimer()
    restartBackgroundMusic()
   //set direction for the ball
    setXDirection(3);
    setYDirection(3);
    setisGameRunning(true)
    if( lives <= 0){
        setLives(3)
        livesDisplay.innerHTML = `Lives: ${lives}`;
    }
    document.addEventListener('keyup', moveUser);
 
   
   
}

export function resetAndShowMainMenu() {
    resetGame();
    stopGame()
    pauseMenu.style.display = 'none';
    mainMenu.classList.remove('hidden');
    gameContainer.classList.add('hidden');
    winMenu.classList.add('hidden');
    hideGameOverMenu()
    setIsPaused(false)
    setLives(3)
    resumeBackgroundMusic()
    stopBackgroundMusic()
    
   
    livesDisplay.innerHTML = `Lives: ${lives}`;
}