class Ufo {
  constructor(position) {
    this.position = position;
    this.move = {
      x: canvas.width / 600,
      y: 0,
    };
    this.live = 2;
    this.appearanceTime = 1000;
    const image = new Image();
    image.src = "./icons/mysterya.ico";

    image.onload = () => {
      this.image = image;
      this.width = canvas.width / 14;
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
  update() {
    if (this.image) {
      this.draw();
      this.position.x += this.move.x;
      if (this.position.x + this.width >= canvas.width || this.position.x < 0) {
        this.move.x = -this.move.x;
      }
    }
  }
  shoot(ufoProjectiles) {
    ufoProjectiles.push(
      new UfoProjectile({
        position: {
          x: this.position.x,
          y: this.position.y + this.height,
        },
        move: {
          x: 0,
          y: canvas.height / 150,
        },
      })
    );
    ufoProjectiles.push(
      new UfoProjectile({
        position: {
          x: this.position.x + this.width,
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
