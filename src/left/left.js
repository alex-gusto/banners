function receiveScrollData(data) {
  ISM.shared.get("topHeight");

  const y = data.scroll;
  if (y > 0) {
    TweenMax.to("[data-scroll]", 0.7, { y });
  }
}

function animate() {
  TweenMax.to(".circle", 0.5, { opacity: 1 });
}
