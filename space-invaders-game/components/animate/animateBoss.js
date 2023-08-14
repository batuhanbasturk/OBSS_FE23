const animateBoss = () => {
  boss.update();
  bossTheme.play();
  boss.shoot(bossProjectiles);
  bossProjectiles.forEach((bossProjectile, index) => {
    //remove projectiles that are out of the screen
    if (bossProjectile.position.y + bossProjectile.height > canvas.height) {
      setTimeout(() => {
        bossProjectiles.splice(bossProjectile, 1);
      }, 0);
    } else {
      bossProjectile.update();
    }
    if (
      bossProjectile.position.x + bossProjectile.width >= player.position.x &&
      bossProjectile.position.x <= player.position.x + player.width &&
      bossProjectile.position.y + bossProjectile.height >= player.position.y &&
      bossProjectile.position.y <=
        player.position.y + player.height - bossProjectile.height
    ) {
      // Remove the collided projectile
      bossProjectiles.splice(index, 1);
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
  projectiles.forEach((projectile, index) => {
    // Remove projectiles that are out of the screen
    if (projectile.position.y + projectile.height < 0) {
      projectiles.splice(index, 1);
    } else {
      // Update and draw the projectile
      projectile.update();

      // Check if the projectile hits the boss
      if (
        projectile.position.x + projectile.width >= boss.position.x &&
        projectile.position.x <= boss.position.x + boss.width &&
        projectile.position.y <= boss.position.y + boss.height &&
        projectile.position.y + projectile.height >= boss.position.y
      ) {
        // Projectile hit the boss, remove the projectile
        projectiles.splice(index, 1);
        if (boss.live > 1) {
          boss.live--;
        } else {
          score += 9999;
          //scoreboards update
          scoreEl.innerHTML = score;
          winScoreDisplay.innerHTML = score;
          lossScoreDisplay.innerHTML = score;

          killedSound.play();
          setTimeout(() => {
            handleGameWin();
          }, 200);
        }
      }
    }
  });
};
