export function fpsLoop(cb, fps = 60) {
  var frameRate = 1000 / fps;

  function animate() {
    cb();
    setTimeout(animate, frameRate);
  }

  animate();
}
