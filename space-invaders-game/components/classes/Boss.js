class Boss {
  constructor(position) {
    this.position = position;
    this.move = {
      x: canvas.width / 800,
      y: 0,
    };
    this.live = 40;

    this.fireCounter = 0;
    this.fireThreshold = 100;

    const image = new Image();
    image.src = "./icons/AlienMotherShip.webp";

    image.onload = () => {
      this.image = image;
      this.width = canvas.width / 7;
      this.height = canvas.height / 7;
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
      // change image when live is less than 20
      if (this.live <= 20) {
        const newImage = new Image();
        newImage.src = "./icons/AlienMothershipDamaged.png";

        newImage.onload = () => {
          this.image = newImage;
          this.width = canvas.width / 7;
          this.height = canvas.height / 7;
          this.position = {
            x: this.position.x,
            y: this.position.y,
          };
        };
      }
      //increase fire counter
      this.fireCounter++;
      //fire projectiles every 100 fire counter
      if (this.fireCounter === this.fireThreshold) {
        this.fireCounter = 0;
        this.shoot(
          bossProjectiles.push(
            new BossProjectile({
              position: {
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height,
              },
              move: {
                x: this.move.x * 1.5,
                y: canvas.height / 75,
              },
              type: "laser",
            })
          ),
          bossProjectiles.push(
            new BossProjectile({
              position: {
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height,
              },
              move: {
                x: 0,
                y: canvas.height / 75,
              },
              type: "laser",
            })
          ),
          bossProjectiles.push(
            new BossProjectile({
              position: {
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height,
              },
              move: {
                x: -this.move.x * 1.5,
                y: canvas.height / 75,
              },
              type: "laser",
            })
          )
        );
      }
    }
  }
  shoot() {
    //cage projectiles to trap player
    bossProjectiles.push(
      new BossProjectile({
        position: {
          x: this.position.x,
          y: this.position.y + this.height,
        },
        move: {
          x: canvas.width / 200,
          y: canvas.height / 75,
        },
        type: "cage",
      })
    );
    bossProjectiles.push(
      new BossProjectile({
        position: {
          x: this.position.x + this.width,
          y: this.position.y + this.height,
        },
        move: {
          x: -canvas.width / 200,
          y: canvas.height / 75,
        },
        type: "cage",
      })
    );
  }
}
