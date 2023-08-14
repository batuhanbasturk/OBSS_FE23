const animate = () => {
  animationFrame = requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  player.update();
  //if ufo is not appeared yet
  if (level !== 3) {
    animateLevel();
  } else {
    animateBoss();
  }
  //move player
  movePlayer();
  frame++;
  winScoreDisplay.innerHTML = score;
  lossScoreDisplay.innerHTML = score;
};
