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
  shoot(saucerProjectiles) {
    saucerProjectiles.push(
      new SaucerProjectile({
        position: {
          x: this.position.x + this.width / 2,
          y: this.position.y + this.height,
        },
        move: {
          x: 0,
          y: canvas.height / 150,
        },
      })
    );
  }
}
