// home screen
const homeScreen = document.querySelector(".home-screen");
const startButton = document.getElementById("startButton");
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

//canvas resize
canvas.width = window.innerWidth;
canvas.height = canvas.width * 0.5;

function startGame() {
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
  resetVariables();
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
startButton.addEventListener("click", startGame);

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

//variables
const resetVariables = () => {
  player = new Player();
  grid = new Grid();
  projectiles = [];
  saucerProjectiles = [];
  score = 0;
  keys = {
    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false },
  };
  canFire = true;
  frame = 0;
  randomFire = Math.floor(Math.random() * 101) + 100;
};

const animate = () => {
  animationFrame = requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  player.update();
  grid.update();

  projectiles.forEach((projectile, index) => {
    //remove projectiles that are out of the screen
    if (projectile.position.y + projectile.height < 0) {
      projectiles.splice(index, 1);
    } else {
      projectile.update();
    }
  });
  saucerProjectiles.forEach((saucerProjectile) => {
    //remove projectiles that are out of the screen
    if (saucerProjectile.position.y + saucerProjectile.height > canvas.height) {
      setTimeout(() => {
        saucerProjectiles.splice(saucerProjectile, 1);
      }, 0);
    } else {
      saucerProjectile.update();
    }

    //check if saucerProjectile hit the player
    if (
      saucerProjectile.position.x + saucerProjectile.width >=
        player.position.x &&
      saucerProjectile.position.x <= player.position.x + player.width &&
      saucerProjectile.position.y + saucerProjectile.height >=
        player.position.y &&
      saucerProjectile.position.y <=
        player.position.y + player.height - saucerProjectile.height
    ) {
      setTimeout(() => {
        saucerProjectiles.splice(saucerProjectile, 1);
        //if player has more than 1 life remove one else game over
        if (player.lives > 1) {
          player.lives--;
          livesEl.innerHTML = player.lives;
        } else {
          playerKilledSound.volume = 0.1;
          playerKilledSound.currentTime = 0.02;
          playerKilledSound.play();
          setTimeout(() => {
            handleGameLoss();
          }, 200);
        }
      }, 0);
    }
  });
  //move player
  if (keys.ArrowLeft.pressed && player.position.x >= 0) {
    player.move.x = -canvas.width / 100;
  } else if (
    keys.ArrowRight.pressed &&
    player.position.x + player.width <= canvas.width
  ) {
    player.move.x = canvas.width / 100;
  } else {
    player.move.x = 0;
  }
  frame++;
  //frame counter for random fire of saucers and saucer3s
  // only if there are saucers left on the grid and the player is alive
  if (frame % randomFire === 0 && grid.saucers.length > 0) {
    const saucer3s = grid.saucers.filter((saucer) => saucer.type === "saucer3");
    if (saucer3s.length > 0) {
      saucer3s[Math.floor(Math.random() * saucer3s.length)].shoot(
        saucerProjectiles
      );
    }
  }
};
