// mobile/tablet controls
const btnLeft = document.getElementById("btnLeft");
const btnRight = document.getElementById("btnRight");
const btnFire = document.getElementById("btnFire");

btnLeft.addEventListener("touchstart", () => {
  keys.ArrowLeft.pressed = true;
  player.switchImage();
});

btnLeft.addEventListener("touchend", () => {
  keys.ArrowLeft.pressed = false;
});

btnRight.addEventListener("touchstart", () => {
  keys.ArrowRight.pressed = true;
  player.switchImage();
});

btnRight.addEventListener("touchend", () => {
  keys.ArrowRight.pressed = false;
});

btnFire.addEventListener("touchstart", () => {
  if (canFire) {
    canFire = false;
    projectiles.push(
      new PlayerProjectile({
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

    shootSound.volume = 0.1;
    shootSound.currentTime = 0.02;
    shootSound.play();
    setTimeout(() => {
      canFire = true;
    }, 500);
  }
});

// keyboard controls for desktop
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
          new PlayerProjectile({
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
