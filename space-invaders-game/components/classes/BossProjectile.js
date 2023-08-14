//projectile class for player
class BossProjectile {
  constructor({ position, move, type }) {
    this.position = position;
    this.move = move;
    this.type = type;
    this.height = canvas.height / 50;
    this.width = canvas.width / 400;
  }
  draw() {
    c.beginPath();
    c.rect(this.position.x, this.position.y, this.width, this.height);
    if (this.type === "cage") {
      c.fillStyle = "green";
    } else {
      c.fillStyle = "red";
    }
    c.fill();
    c.closePath();
  }
  update() {
    this.draw();

    this.position.x += this.move.x;
    this.position.y += this.move.y;
  }
}
