//grid class for saucers
class Grid {
  constructor(level) {
    this.position = {
      x: 0,
      y: 0,
    };
    this.move = {
      x: canvas.width / 1000,
      y: 0,
    };
    this.saucers = [];

    const rows = 5;
    const columns = 10;
    let saucerType;
    this.width = columns * (canvas.width / 20);
    this.height = rows * (canvas.height / 14);

    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        if (level === 1) {
          saucerType = j === 0 ? "saucer3" : j < 3 ? "saucer2" : "saucer1";
        } else if (level === 2) {
          saucerType = j === 0 ? "saucer6" : j < 3 ? "saucer5" : "saucer4";
        }
        this.saucers.push(
          new Saucer({
            position: {
              x: i * (canvas.width / 20),
              y: j * (canvas.height / 14) + canvas.height / 14,
            },
            type: saucerType,
          })
        );
      }
    }
  }
  update() {
    this.position.x += this.move.x;
    this.position.y += this.move.y;

    //for every frame until the saucers reach the end of the canvas
    this.move.y = 0;

    if (this.position.x + this.width >= canvas.width || this.position.x < 0) {
      this.move.x = -this.move.x;
      this.move.y = canvas.height / 14;
    }
    this.saucers.forEach((saucer, i) => {
      saucer.update({ move: this.move });
      //if saucer reaches the player
      if (saucer.position.y + saucer.height > player.position.y) {
        // to show saucer reached y position of player
        setTimeout(() => {
          handleGameLoss();
        }, 100);
      }

      projectiles.forEach((projectile, j) => {
        if (
          // checks if lasers right side hit the saucers left side
          projectile.position.x + projectile.width >= saucer.position.x &&
          // checks if lasers left side hit the saucers right side
          projectile.position.x <= saucer.position.x + saucer.width &&
          // checks if lasers top side hit the saucers bottom side
          projectile.position.y <= saucer.position.y + saucer.height &&
          // checks if lasers bottom side hit the saucers top side
          projectile.position.y + projectile.height >= saucer.position.y
        ) {
          setTimeout(() => {
            //checks if the saucer is still in the array with check i get delay
            const saucerFound = this.saucers.find(
              (saucerDelay) => saucerDelay === saucer
            );
            const projectileFound = projectiles.find(
              (projectileDelay) => projectileDelay === projectile
            );
            //if both are still in the array remove them
            if (saucerFound && projectileFound) {
              if (saucer.type === "saucer1") {
                score += 10;
              } else if (saucer.type === "saucer2") {
                score += 20;
              } else if (saucer.type === "saucer3") {
                score += 40;
              } else if (saucer.type === "saucer4") {
                score += 40;
              } else if (saucer.type === "saucer5") {
                score += 60;
              } else if (saucer.type === "saucer6") {
                score += 80;
              }
              scoreEl.innerHTML = score;
              projectiles.splice(j, 1);
              killedSound.volume = 0.1;
              killedSound.play();
              this.saucers.splice(i, 1);
              if (this.saucers.length === 0) {
                handleGameWin();
              }
            }
            // if column is empty resize the grid
            if (this.saucers.length > 0) {
              const firstSaucer = this.saucers[0];
              const lastSaucer = this.saucers[this.saucers.length - 1];
              grid.width =
                lastSaucer.position.x -
                firstSaucer.position.x +
                lastSaucer.width;
              grid.position.x = firstSaucer.position.x;
            }
          }, 0);
        }
      });
    });
  }
}
