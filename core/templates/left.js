function receiveScrollData(data) {
  var finalScrollPoint = data.body - data.window - BOTTOM_HEIGHT;

  // first scene on top
  if (data.scroll < TOP_HEIGHT) {
    TweenMax.to("[data-scroll]", 0.55, { y: 0, ease: Power2.easeOut });
  }

  // second scene on scroll
  else if (data.scroll >= TOP_HEIGHT && data.scroll < finalScrollPoint) {
    TweenMax.to("[data-scroll]", 0.75, {
      y: data.scroll,
      ease: Power2.easeOut,
    });
  }

  // third scene on bottom
  else {
    TweenMax.to("[data-scroll]", 0.55, {
      y: data.scroll,
      ease: Power2.easeOut,
    });
  }
}

function animate() {}
