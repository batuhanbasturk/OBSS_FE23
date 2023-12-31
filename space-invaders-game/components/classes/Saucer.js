//saucer class
class Saucer {
  constructor({ position, type }) {
    this.move = {
      x: 0,
      y: 0,
    };
    this.type = type;
    this.imageSources = {
      saucer1: "./icons/saucer1.ico",
      saucer2: "./icons/saucer2.ico",
      saucer3: "./icons/saucer3.ico",
      saucer4: "./icons/saucer4.png",
      saucer5: "./icons/saucer5.png",
      saucer6: "./icons/saucer6.png",
    };

    const image = new Image();

    image.src = this.imageSources[type];

    image.onload = () => {
      this.image = image;
      this.width = canvas.width / 20;
      this.height = canvas.height / 14;
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
