import { grid } from "./game.js";

/////////////////////////////////////////////////////////////////
//variables
export const blocks = [];
const blockWidth = 100;
const blockHeight = 20;
const blockSpacingX = 20;
const blockSpacingY = 20;

/////////////////////////////////////////////////////////////////
//classes
class Block {
    constructor(x, y) {
        this.bottomLeft = [x, y];
        this.bottomRight = [x + blockWidth, y];
        this.topLeft = [x, y + blockHeight];
        this.topRight = [x + blockWidth, y + blockHeight];
    }
}

/////////////////////////////////////////////////////////////////
//functions

export function clearBlocks(){
     blocks.length = 0
}

export function fillBlocks() {
    for (let x = 40; x <= 910; x += 100 + blockSpacingX) {
        for (let y = 410; y <= 570; y += 20 + blockSpacingY) {
            blocks.push(new Block(x, y));
        }
    }
}

export function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }
}






