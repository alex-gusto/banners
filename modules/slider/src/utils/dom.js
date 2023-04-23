const isEl = (el) => el instanceof HTMLElement;
const isString = (str) => typeof str === "string";

export const Dom = {
  findEl(strOrEl, parent = document) {
    if (isString(strOrEl)) {
      return parent.querySelector(strOrEl);
    }

    if (isEl(strOrEl)) {
      return strOrEl;
    }

    return null;
  },

  findEls(str, parent = document) {
    return parent.querySelectorAll(str);
  },

  getClassName(strOrEl) {
    if (isString(strOrEl)) {
      return strOrEl;
    }

    if (isEl(strOrEl)) {
      return strOrEl.className;
    }

    return "no-class-found";
  },
};
