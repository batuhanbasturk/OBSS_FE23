// Objective: reset all variables to their initial state when the game is started or restarted.
const resetVariables = ({ level }) => {
  //player variables
  player = new Player();
  projectiles = [];
  keys = {
    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false },
  };
  canFire = true;
  //saucer variables
  if (level !== 3) {
    grid = new Grid(level);
  }
  saucerProjectiles = [];
  randomFire = Math.floor(Math.random() * 101) + 100;
  //boss variables
  if (level === 3) {
    boss = new Boss({
      x: canvas.width / 2 - canvas.width / 14,
      y: canvas.height / 14,
    });
    bossProjectiles = [];
  }
  //ufo variables
  randomUfoAppearanceTime = Math.random() * 10000 + 20000;
  initialUfoPosition = { x: 0, y: 0 };
  ufoAppeared = false;
  ufo = null;
  ufoProjectiles = [];
  //score
  score = 0;
  //frame
  frame = 0;
};
