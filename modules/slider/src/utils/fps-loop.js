export function fpsLoop(cb, fps = 60) {
  var prevTime = 0;
  var frameRate = 1000 / fps;

  function animate(time) {
    if (time > prevTime + frameRate) {
      prevTime = time;
      cb();
    }

    requestAnimationFrame(animate);
  }

  animate();
}
