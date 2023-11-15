// audio.js

export function playAudio(audioPath) {
    const audio = new Audio(audioPath);
      audio.volume=0.5
    audio.play().then(() => {
    }).catch((error) => {
        console.error('Error playing audio:', error);
    });
}

export function playCollisionSound() {
    playAudio('./static/audio/ball.mp3');
}

export function playDestroyBlockSound() {
  
    playAudio('./static/audio/destroy.mp3');
}

export function playLoseSound() {
    playAudio('./static/audio/over.wav');
}

export function playGameOverSound() {
    playAudio('./static/audio/gamelost.mp3');
}

export function playWinSound() {
    playAudio('./static/audio/game-won.mp3');
}

export let backgroundMusic;

export function playBackgroundMusic() {
    backgroundMusic = new Audio('./static/audio/backgroundmusic.mp3');
    backgroundMusic.play();
}

export function pauseBackgroundMusic() {
    if (backgroundMusic) {
        backgroundMusic.pause();
    }
}

export function restartBackgroundMusic() {
    if (backgroundMusic) {
        backgroundMusic.currentTime = 0;
        backgroundMusic.play();
    }
}

export function resumeBackgroundMusic() {
    if (backgroundMusic && backgroundMusic.paused) {
        backgroundMusic.play();
    }
}

export function stopBackgroundMusic() {
    if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    }
}