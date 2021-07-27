import "./core/styles.css";
import createEl from "./core/utils/create-element";
import { FRAMES, CONTAINER_WIDTH, SCROLL_HEIGHT } from "./core/constants";

const frames = FRAMES.map((frame) => ({
  id: frame,
  src: `/${frame}.html`,
}));

const symbolISM = Symbol("symbolISM");
const ISM = {
  shared: {
    [symbolISM]: {},
    set(key, value) {
      this[symbolISM][key] = value;
    },
    get(key) {
      return this[symbolISM][key];
    },
  },
};

const createFrame = (src, id) => {
  return createEl("iframe", {
    src,
    name: id,
    frameborder: "0",
    allowfullscreen: "true",
    webkitallowfullscreen: "true",
    mozallowfullscreen: "true",
    scrolling: "no",
    style: "width: 100%; height: 100%;",
  });
};

const initApp = async () => {
  const params = new URL(document.location).searchParams;

  const mockContainer = document.querySelector('.mock-container')
  mockContainer.style.height = `${params.get('height') || SCROLL_HEIGHT}px`

  const containers = document.querySelectorAll("[data-container]");
  containers.forEach(el => el.style.maxWidth = `${params.get("width") || CONTAINER_WIDTH}px`);

  const frameEls = frames.map(({ id, src }) => {
    return new Promise((resolve) => {
      const holder = document.getElementById(id);
      const frame = createFrame(src, id);
      frame.onload = function () {
        this.contentWindow.ISM = ISM;
        resolve(this.contentWindow);
      };

      holder.appendChild(frame);
    });
  });

  const frameWins = await Promise.all(frameEls);

  $(window).on("scroll", function () {
    frameWins.forEach((win) => {
      if (typeof win.receiveScrollData !== "function") return;

     $('.scroll').text(Math.round($(document).scrollTop()))

      win.receiveScrollData({
        scroll: $(document).scrollTop(),
        body: $(document.body).height(),
        window: $(window).height()
      });
    });
  });
};

initApp();
