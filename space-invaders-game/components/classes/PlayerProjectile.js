//projectile class for player
class PlayerProjectile {
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
