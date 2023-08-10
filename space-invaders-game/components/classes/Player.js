//player class
class Player {
  constructor() {
    this.move = {
      x: 0,
      y: 0,
    };

    this.lives = 3;

    this.imageIndex = 0;
    this.images = ["./icons/baseshipa.ico", "./icons/baseshipb.ico"];
    const image = new Image();
    image.src = this.images[this.imageIndex];

    image.onload = () => {
      this.image = image;
      this.width = canvas.width / 20;
      this.height = canvas.height / 14;
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
  //switch image upon keypress
  switchImage() {
    this.imageIndex = (this.imageIndex + 1) % this.images.length;
    const newImageSrc = this.images[this.imageIndex];
    const newImage = new Image();
    newImage.src = newImageSrc;

    newImage.onload = () => {
      this.image = newImage;
      this.width = canvas.width / 20;
      this.height = canvas.height / 14;
    };
  }
}
