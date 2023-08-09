class SaucerProjectile {
  constructor({ position, move }) {
    this.position = position;
    this.move = move;
    this.height = canvas.height / 50;
    this.width = canvas.width / 200;
  }
  draw() {
    c.beginPath();
    c.rect(this.position.x, this.position.y, this.width, this.height);
    c.fillStyle = "red";
    c.fill();
    c.closePath();
  }
  update() {
    this.draw();

    this.position.x += this.move.x;
    this.position.y += this.move.y;
  }
}
