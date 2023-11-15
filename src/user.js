import { grid, isPaused } from "./game.js";

/////////////////////////////////////////////////////////////////
//variables
const userStart = [410, 10];
export let currentPosition = userStart;
export let isMovingLeft = false;
export let isMovingRight = false;
const user = document.createElement('div');
user.classList.add('user');

/////////////////////////////////////////////////////////////////
//functions

    export function drawUser() {
        user.style.left = currentPosition[0] + 'px';
        user.style.bottom = currentPosition[1] + 'px';
        grid.appendChild(user);
    }

    export function moveUser(e) {
        if(!isPaused){
            switch (e.key) {
                case "ArrowLeft":
                case "a":
                    isMovingLeft = (e.type === 'keydown');
                    break;
                case "ArrowRight":
                case "d":
                    isMovingRight = (e.type === 'keydown');
                    break;
            }
        }
    }
    export function setcurrentPosition(position) {
        currentPosition = position;
    }

