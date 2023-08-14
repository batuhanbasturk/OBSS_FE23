// home screen
const homeScreen = document.querySelector(".home-screen");
const startButton1 = document.getElementById("level1");
const startButton2 = document.getElementById("level2");
const startButton3 = document.getElementById("boss");
// game screen
const gameContainer = document.getElementById("canvas");
// top menu
const topMenu = document.querySelector(".top-menu");
const pauseButton = document.getElementById("pauseButton");
const scoreEl = document.querySelector("#score");
const livesEl = document.querySelector("#lives");
// pause screen
const pauseScreen = document.querySelector(".pause-menu");
const resumeButton = document.getElementById("resumeButton");
const pauseExitButton = document.querySelector(".pauseExitButton");
// game win screen
const gameWinScreen = document.querySelector(".game-win");
const winPlayAgainButton = document.querySelector(".game-win .playAgainButton");
const winExitButton = document.querySelector(".game-win .exitGameButton");
// game over screen
const gameOverScreen = document.querySelector(".game-over");
const losePlayAgainButton = document.querySelector(
  ".game-over .playAgainButton"
);
const loseExitButton = document.querySelector(".game-over .exitGameButton");
// touch controls
const touchControls = document.querySelector(".touch-controls");
//canvas
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
//sounds
const killedSound = document.getElementById("saucerKilledSound");
const shootSound = document.getElementById("shootSound");
const playerKilledSound = document.getElementById("playerKilledSound");
const ufoMoveSound = document.getElementById("ufoMoveSound");
const ufoAppearedSound = document.getElementById("ufoAppearedSound");

//canvas resize
canvas.width = window.innerWidth;
if (window.innerWidth / window.innerHeight > 2.2) {
  canvas.height = canvas.width * 0.37;
} else if (window.innerWidth / window.innerHeight > 1.7) {
  canvas.height = canvas.width * 0.4;
} else if (window.innerWidth / window.innerHeight > 1.5) {
  canvas.height = canvas.width * 0.5;
} else if (window.innerWidth / window.innerHeight > 1.3) {
  canvas.height = canvas.width * 0.6;
} else {
  canvas.height = canvas.width * 0.7;
}

function startGame(event) {
  homeScreen.style.display = "none";
  if (window.innerWidth < 1200) {
    touchControls.style.display = "flex";
  }
  gameOverScreen.style.display = "none";
  pauseScreen.style.display = "none";
  topMenu.style.display = "flex";
  gameWinScreen.style.display = "none";
  canvas.style.display = "block";
  scoreEl.innerHTML = 0;
  livesEl.innerHTML = 3;
  if (event.target === startButton1) {
    level = 1;
  } else if (event.target === startButton2) {
    level = 2;
  } else if (event.target === startButton3) {
    level = 3;
  }
  resetVariables({ level });
  animate();
}

function handleGameLoss() {
  cancelAnimationFrame(animationFrame);
  gameContainer.style.display = "none";
  touchControls.style.display = "none";
  topMenu.style.display = "none";
  gameOverScreen.style.display = "flex";
}
function handleGameWin() {
  cancelAnimationFrame(animationFrame);
  gameContainer.style.display = "none";
  touchControls.style.display = "none";
  gameWinScreen.style.display = "flex";
  topMenu.style.display = "none";
}
function homeScreenDisplay() {
  homeScreen.style.display = "flex";
  touchControls.style.display = "none";
  gameOverScreen.style.display = "none";
  gameWinScreen.style.display = "none";
  canvas.style.display = "none";
}
function pauseScreenDisplay() {
  pauseScreen.style.display = "flex";
  touchControls.style.display = "none";
  gameContainer.style.display = "none";
  topMenu.style.display = "none";
  cancelAnimationFrame(animationFrame);
}
function pauseMenuDisplay() {
  pauseScreen.style.display = "none";
  if (window.innerWidth < 1200) {
    touchControls.style.display = "flex";
  }
  gameContainer.style.display = "block";
  topMenu.style.display = "flex";
  animate();
}

//home screen
startButton1.addEventListener("click", startGame);
startButton2.addEventListener("click", startGame);
startButton3.addEventListener("click", startGame);
//game win screen
winPlayAgainButton.addEventListener("click", startGame);
winExitButton.addEventListener("click", homeScreenDisplay);
//game over screen
losePlayAgainButton.addEventListener("click", startGame);
loseExitButton.addEventListener("click", homeScreenDisplay);
//pause screen
pauseButton.addEventListener("click", pauseScreenDisplay);
resumeButton.addEventListener("click", pauseMenuDisplay);
pauseExitButton.addEventListener("click", homeScreenDisplay);
