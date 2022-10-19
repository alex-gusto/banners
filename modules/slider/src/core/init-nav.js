export function initNav(rootEl, options) {
  const { navSelector, slidesCount, currentSlideIndex, onButtonClick } =
    options;
  const navClass = navSelector.replace(".", "");
  const navButtonClass = `${navClass}__button`;
  const navButtonActiveClass = `${navButtonClass}--active`;
  const buttons = [];

  const nav = {
    el: rootEl.querySelector(navSelector),
    buttons,
    updateActiveNavButton: (index) => {
      buttons.forEach((b) => b.classList.remove(navButtonActiveClass));
      buttons[index].classList.add(navButtonActiveClass);
    },
  };

  if (!nav.el) {
    nav.el = document.createElement("div");
    nav.el.classList.add(navClass);

    rootEl.appendChild(nav.el);
  }

  let i = 0;
  while (i < slidesCount) {
    const el = document.createElement("BUTTON");
    el.classList.add(navButtonClass);
    el.dataset.index = i;

    if (currentSlideIndex === i) {
      el.classList.add(navButtonActiveClass);
    }

    el.addEventListener("click", () => onButtonClick(+el.dataset.index));

    nav.el.appendChild(el);
    nav.buttons.push(el);
    i++;
  }

  return nav;
}
