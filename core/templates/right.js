function receiveScrollData(data) {
  if (data.scroll > TOP_HEIGHT) {
    TweenMax.to("[data-scroll]", 0.75, { y: data.scroll, ease: Power2.easeOut });
  } else {
    TweenMax.to("[data-scroll]", 0.55, { y: 0, ease: Power2.easeOut });
  }
}

function animate() {}
