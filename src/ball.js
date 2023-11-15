import { playCollisionSound, playDestroyBlockSound, playLoseSound, resumeBackgroundMusic } from "./audio.js";
import { blocks } from "./blocks.js";
import { boardHeight, boardWidth, checkForWin, gameOver, grid, isGameRunning, isPaused, lives, loseLife, pauseTimer, score, scoreDisplay, setScore } from "./game.js";
import { resetGame } from "./reset.js";
import { currentPosition } from "./user.js";

/////////////////////////////////////////////////////////////////
//variables
export const blockWidth = 100;
export const blockHeight = 20;
const ballDiameter = 40;
const ball = document.createElement('div');
const ballStart = [450, 40];
let lastFrameTime = performance.now();
let xDirection = 3;
let yDirection = 3;
export let ballCurrentPosition = ballStart;

///////////////////////////////////////////////////////////////
//functions
export function setXDirection(newXDirection) {
    xDirection = newXDirection;
}

export function setYDirection(newYDirection) {
    yDirection = newYDirection;
}

export function setBallPosition(position) {
    ballCurrentPosition = position;
}

export function drawBall() {
 
    ball.classList.add('ball');
    grid.appendChild(ball);
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';
}

function moveBall() {
    if (!isPaused && isGameRunning) {
        const currentTime = performance.now();
        lastFrameTime = currentTime;
        ballCurrentPosition[0] += xDirection;
        ballCurrentPosition[1] += yDirection;
        drawBall();
        checkForCollisions();
    }

    requestAnimationFrame(moveBall);
}

requestAnimationFrame(moveBall);

function checkForCollisions() {
    const allBlocks = document.querySelectorAll('.block');

    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        if (
            ballCurrentPosition[0] + ballDiameter >= block.bottomLeft[0] &&
            ballCurrentPosition[0] <= block.bottomRight[0] &&
            ballCurrentPosition[1] + ballDiameter >= block.bottomLeft[1] &&
            ballCurrentPosition[1] <= block.topLeft[1]
        ) {
            if (allBlocks[i]) {
                allBlocks[i].remove();
            }
            blocks.splice(i, 1);
            changeDirectionY();
            let newScore = score
            setScore(++newScore)
            scoreDisplay.innerHTML = `Score: ${score}`;
            playDestroyBlockSound()
           resumeBackgroundMusic()
            break;
        }
    }

    if (ballCurrentPosition[0] + ballDiameter >= boardWidth || ballCurrentPosition[0] <= 0) {
        changeDirectionX();
        playCollisionSound();
        
    }

    if (ballCurrentPosition[1] + ballDiameter >= boardHeight || ballCurrentPosition[1] <= 0) {
        changeDirectionY();
    }

    if (
        ballCurrentPosition[0] >= currentPosition[0] &&
        ballCurrentPosition[0] <= currentPosition[0] + blockWidth &&
        ballCurrentPosition[1] + ballDiameter >= currentPosition[1] &&
        ballCurrentPosition[1] <= currentPosition[1] + blockHeight
    ) {
  // colision with user
 const speed = 5; // speed of the ball
 const maxBounceAngle = Math.PI / 3; // minimal angle (60 degrees)


// Calculate the deviation from the center of the platform in the range from -1 to 1
 const normalizedOffset = (ballCurrentPosition[0] + ballDiameter / 2 - currentPosition[0] - blockWidth / 2) / (blockWidth / 2);


// Limit the normalized deviation
 const clampedOffset = Math.max(-1, Math.min(1, normalizedOffset));

// Calculate the rebound angle
 const bounceAngle = clampedOffset * maxBounceAngle;

 
// Calculate new velocity components
 xDirection = speed * Math.sin(bounceAngle);
 yDirection = Math.abs(speed * Math.cos(bounceAngle));

 playCollisionSound();
    }


    if (ballCurrentPosition[1] <= 0) {
        loseLife();
       if(lives >= 1){
        playLoseSound()
        resetGame()
       }else{
        gameOver()
        pauseTimer()
       }
        
      
    }
    checkForWin();
}

function changeDirectionX() {
    xDirection *= -1;
}

function changeDirectionY() {
    yDirection *= -1;
}
