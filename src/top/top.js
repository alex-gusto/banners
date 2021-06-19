function receiveScrollData(data) {
  const topHeight = $(".bg").height();
  ISM.shared.set("topHeight", topHeight);
  
  const y = data.scroll - 900;
  if (y > 0) {
    TweenMax.to("[data-scroll]", 0.7, { y });
  }
//   if (data.scroll > topHeight) {
    
//   } else {
//     TweenMax.to("[data-scroll]", 0.7, { y: 0 });
//   }
}

function animate() {
  TweenMax.to(".circle", 0.5, { opacity: 1 });
}
