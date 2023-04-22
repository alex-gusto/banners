const createArrow = (arrowClass, className) => {
  const el = document.createElement("BUTTON");
  el.classList.add(arrowClass);
  el.classList.add(className);

  return el;
};

export function initArrows(rootEl, options) {
  const { arrowsSelector, onPrevClick, onNextClick } = options;

  const arrowClass = arrowsSelector.replace(".", "");
  const prevArrowClass = `${arrowClass}--prev`;
  const nextArrowClass = `${arrowClass}--next`;

  const arrows = {
    prev: document.querySelector(`.${prevArrowClass}`),
    next: document.querySelector(`.${nextArrowClass}`),
  };

  if (!arrows.prev) {
    arrows.prev = createArrow(arrowClass, prevArrowClass);

    rootEl.appendChild(arrows.prev);
  }

  if (!arrows.next) {
    arrows.next = createArrow(arrowClass, nextArrowClass);

    rootEl.appendChild(arrows.next);
  }

  arrows.prev.addEventListener("click", onPrevClick);
  arrows.next.addEventListener("click", onNextClick);

  return arrows;
}
