const animateLevel = () => {
  if (!ufoAppeared) {
    if (frame >= randomUfoAppearanceTime / (1000 / 60)) {
      ufo = new Ufo({ x: 0, y: canvas.height / 14 }); //create ufo
      ufoAppeared = true;
      ufoAppearedSound.volume = 0.1;
      ufoAppearedSound.play();
    }
  } else {
    if (ufo !== null) {
      ufo.update();
      ufoMoveSound.volume = 0.1;
      ufoMoveSound.play();
      if (frame % randomFire === 0) {
        ufo.shoot(ufoProjectiles);
      }
    }
  }

  ufoProjectiles.forEach((ufoProjectile, index) => {
    //remove projectiles that are out of the screen
    if (ufoProjectile.position.y + ufoProjectile.height > canvas.height) {
      setTimeout(() => {
        ufoProjectiles.splice(ufoProjectile, 1);
      }, 0);
    } else {
      ufoProjectile.update();
    }
    if (
      ufoProjectile.position.x + ufoProjectile.width >= player.position.x &&
      ufoProjectile.position.x <= player.position.x + player.width &&
      ufoProjectile.position.y + ufoProjectile.height >= player.position.y &&
      ufoProjectile.position.y <=
        player.position.y + player.height - ufoProjectile.height
    ) {
      // Remove the collided projectile
      ufoProjectiles.splice(index, 1);

      if (player.lives > 1) {
        player.lives--;
        livesEl.innerHTML = player.lives;
      } else {
        playerKilledSound.volume = 0.1;
        playerKilledSound.currentTime = 0.02;
        playerKilledSound.play();
        setTimeout(() => {
          handleGameLoss();
        }, 200);
      }
    }
  });
  grid.update();

  projectiles.forEach((projectile, index) => {
    // Remove projectiles that are out of the screen
    if (projectile.position.y + projectile.height < 0) {
      projectiles.splice(index, 1);
    } else {
      // Update and draw the projectile
      projectile.update();

      if (ufo !== null && ufoAppeared) {
        // Check if the projectile hits the UFO
        if (
          projectile.position.x + projectile.width >= ufo.position.x &&
          projectile.position.x <= ufo.position.x + ufo.width &&
          projectile.position.y <= ufo.position.y + ufo.height &&
          projectile.position.y + projectile.height >= ufo.position.y
        ) {
          // Projectile hit the UFO, remove the projectile
          projectiles.splice(index, 1);
          if (ufo.live > 1) {
            ufo.live--;
          } else {
            score += 200;
            scoreEl.innerHTML = score;
            killedSound.play();
            ufo = null;
          }
        }
      }
    }
  });

  saucerProjectiles.forEach((saucerProjectile) => {
    //remove projectiles that are out of the screen
    if (saucerProjectile.position.y + saucerProjectile.height > canvas.height) {
      setTimeout(() => {
        saucerProjectiles.splice(saucerProjectile, 1);
      }, 0);
    } else {
      saucerProjectile.update();
    }

    //check if saucerProjectile hit the player
    if (
      saucerProjectile.position.x + saucerProjectile.width >=
        player.position.x &&
      saucerProjectile.position.x <= player.position.x + player.width &&
      saucerProjectile.position.y + saucerProjectile.height >=
        player.position.y &&
      saucerProjectile.position.y <=
        player.position.y + player.height - saucerProjectile.height
    ) {
      setTimeout(() => {
        saucerProjectiles.splice(saucerProjectile, 1);
        //if player has more than 1 life remove one else game over
        if (player.lives > 1) {
          player.lives--;
          livesEl.innerHTML = player.lives;
        } else {
          playerKilledSound.volume = 0.1;
          playerKilledSound.currentTime = 0.02;
          playerKilledSound.play();
          setTimeout(() => {
            handleGameLoss();
          }, 200);
        }
      }, 0);
    }
  });
  if (frame % randomFire === 0 && grid.saucers.length > 0) {
    const saucerTypes = ["saucer3", "saucer4", "saucer5", "saucer6"];

    saucerTypes.forEach((saucerType) => {
      const saucersOfType = grid.saucers.filter(
        (saucer) => saucer.type === saucerType
      );
      if (saucersOfType.length > 0) {
        const randomIndex = Math.floor(Math.random() * saucersOfType.length);
        saucersOfType[randomIndex].shoot(saucerProjectiles);
      }
    });
  }
  //loss score update
  lossScoreDisplay.innerHTML = score;
  //win score update
  winScoreDisplay.innerHTML = score;
};
