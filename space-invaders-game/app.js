const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = canvas.width * 0.5;

//player class
class Player {
  constructor() {
    this.move = {
      x: 0,
      y: 0,
    };

    this.imageIndex = 0;
    this.images = [
      "./icons/baseshipa.ico",
      "./icons/baseshipb.ico", // Örnek olarak ikinci bir görüntü ekledik
    ];
    const image = new Image();
    image.src = this.images[this.imageIndex];

    image.onload = () => {
      this.image = image;
      this.width = canvas.width / 20;
      this.height = canvas.height / 13;
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height,
      };
    };
  }
  draw() {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  update() {
    if (this.image) {
      this.draw();
      this.position.x += this.move.x;
    }
  }
  //switch image
  switchImage() {
    this.imageIndex = (this.imageIndex + 1) % this.images.length;
    const newImageSrc = this.images[this.imageIndex];
    const newImage = new Image();
    newImage.src = newImageSrc;

    newImage.onload = () => {
      this.image = newImage;
      this.width = canvas.width / 20;
      this.height = canvas.height / 13;
    };
  }
}

//projectile class
class Projectile {
  constructor({ position, move }) {
    this.position = position;
    this.move = move;
    this.height = canvas.height / 50;
    this.width = canvas.width / 100;
  }
  draw() {
    c.beginPath();
    c.rect(this.position.x, this.position.y, this.width, this.height);
    c.fillStyle = "white";
    c.fill();
    c.closePath();
  }
  update() {
    this.draw();

    this.position.x += this.move.x;
    this.position.y += this.move.y;
  }
}
//saucer class
class Saucer {
  constructor({ position, type }) {
    this.move = {
      x: 0,
      y: 0,
    };
    this.type = type;

    this.imageSources = {
      saucer1: "./icons/saucer1a.ico",
      saucer2: "./icons/saucer2a.ico",
      saucer3: "./icons/saucer3a.ico",
    };

    const image = new Image();

    image.src = this.imageSources[type];

    image.onload = () => {
      this.image = image;
      this.width = canvas.width / 20;
      this.height = canvas.height / 13;
      this.position = {
        x: position.x,
        y: position.y,
      };
    };
  }
  draw() {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  update({ move }) {
    if (this.image) {
      this.draw();
      this.position.x += move.x;
      this.position.y += move.y;
    }
  }
}
//grid class for saucers
class Grid {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };
    this.move = {
      x: canvas.width / 1300,
      y: 0,
    };
    this.saucers = [];

    const rows = 5;
    const columns = 10;
    this.width = columns * (canvas.width / 20);
    this.height = rows * (canvas.height / 13);

    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        let saucerType = j === 0 ? "saucer3" : j < 3 ? "saucer2" : "saucer1";
        this.saucers.push(
          new Saucer({
            position: {
              x: i * (canvas.width / 20),
              y: j * (canvas.height / 13),
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
      this.move.y = canvas.height / 13;
    }
    this.saucers.forEach((saucer) => {
      saucer.update({ move: this.move });
    });
  }
}

//variables
const player = new Player();
const grid = new Grid();
const projectiles = [];
const keys = {
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
};
let canFire = true;

function animate() {
  requestAnimationFrame(animate);
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
}
animate();

addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      player.switchImage();
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      player.switchImage();
      break;
    case " ":
      //fire
      if (canFire) {
        canFire = false;
        projectiles.push(
          new Projectile({
            position: {
              x: player.position.x + player.width / 2,
              y: player.position.y,
            },
            move: {
              x: 0,
              y: -canvas.height / 75,
            },
          })
        );
        const shootSound = document.getElementById("shootSound");
        shootSound.volume = 0.1;
        shootSound.currentTime = 0.02;
        shootSound.play();
        setTimeout(() => {
          canFire = true;
        }, 500);
      }
      break;
  }
});
addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;

      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case " ": // Space
      break;
  }
});
