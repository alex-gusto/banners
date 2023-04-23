import { Dom } from "../utils";

const createButtons = ({
  navEl,
  navButtonActiveClass,
  navButtonClass,
  currentSlideIndex,
  slideEls,
}) => {
  const buttons = [];

  let i = 0;
  while (i < slideEls.length) {
    const slide = slideEls[i];

    if ("noNav" in slide.dataset) {
      i++;
      continue;
    }

    const el = document.createElement("BUTTON");
    el.classList.add(navButtonClass);
    el.dataset.index = i;

    if (currentSlideIndex === i) {
      el.classList.add(navButtonActiveClass);
    }

    navEl.appendChild(el);
    buttons.push(el);
    i++;
  }

  return buttons;
};

export function initNav(rootEl, options) {
  const { navEl, slideEls, currentSlideIndex, onButtonClick } = options;

  const _navEl = Dom.findEl(navEl, rootEl);
  const navClass = Dom.getClassName(navEl).replace(".", "");
  const navButtonClass = `${navClass}__button`;
  const navButtonActiveClass = `${navButtonClass}--active`;
  const buttons = _navEl ? Dom.findEls(`.${navButtonClass}`, _navEl) ?? [] : [];

  const nav = {
    el: _navEl,
    buttons,
    updateActiveNavButton: (index) => {
      nav.buttons.forEach((b) => {
        b.classList.remove(navButtonActiveClass);

        if (+b.dataset.index === index) {
          b.classList.add(navButtonActiveClass);
        }
      });
    },
  };

  if (!nav.el) {
    nav.el = document.createElement("div");
    nav.el.classList.add(navClass);

    rootEl.appendChild(nav.el);
  }

  if (!nav.buttons.length) {
    nav.buttons = createButtons({
      navEl: nav.el,
      slideEls,
      currentSlideIndex,
      navButtonActiveClass,
      navButtonClass,
    });
  }

  nav.buttons.forEach((el) => {
    el.addEventListener("click", () => onButtonClick(+el.dataset.index));
  });

  return nav;
}
