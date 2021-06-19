function receiveScrollData(data) {
  const y = data.scroll - 900;
  
  if (y > 0) {
    TweenMax.to("[data-scroll]", 0.7, { y });
  }
}

function animate() {
  TweenMax.to(".circle", 0.5, { opacity: 1 });
}
