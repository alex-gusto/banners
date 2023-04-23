import { Dom } from "../utils";

const createArrow = (className) => {
  const el = document.createElement("BUTTON");
  el.classList.add(className);

  return el;
};

export function initArrows(rootEl, options) {
  const { prevArrowEl, nextArrowEl, onPrevClick, onNextClick } = options;

  const arrows = {
    prev: Dom.findEl(prevArrowEl, rootEl),
    next: Dom.findEl(nextArrowEl, rootEl),
  };

  if (!arrows.prev) {
    arrows.prev = createArrow(prevArrowEl.replace(".", ""));

    rootEl.appendChild(arrows.prev);
  }

  if (!arrows.next) {
    arrows.next = createArrow(nextArrowEl.replace(".", ""));

    rootEl.appendChild(arrows.next);
  }

  arrows.prev.addEventListener("click", onPrevClick);
  arrows.next.addEventListener("click", onNextClick);

  return arrows;
}
