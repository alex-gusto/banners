import "./styles.css";
import createEl from "./utils/create-element";

const LEFT_FRAME_ID = "frame-left";
const RIGHT_FRAME_ID = "frame-right";
const TOP_FRAME_ID = "frame-top";
const BOTTOM_FRAME_ID = "frame-bottom";

const CONTAINER_WIDTH = 960;

const frames = [
  {
    id: LEFT_FRAME_ID,
    src: "/left.html",
  },
  {
    id: RIGHT_FRAME_ID,
    src: "/right.html",
  },
  {
    id: TOP_FRAME_ID,
    src: "/top.html",
  },
  {
    id: BOTTOM_FRAME_ID,
    src: "/bottom.html",
  },
];

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

const getContainerWidth = () => {
  let params = new URL(document.location).searchParams;
  return params.get("width") || CONTAINER_WIDTH;
};

const initApp = async () => {
  const containers = document.querySelectorAll("[data-container]");
  containers.forEach((el) => {
    el.style.maxWidth = `${getContainerWidth()}px`;
  });

  const frameEls = frames.map(({ id, src }) => {
    return new Promise((resolve) => {
      const holder = document.getElementById(id);
      const frame = createFrame(src, id);
      frame.onload = function() {
        this.contentWindow.ISM = ISM
        resolve(this.contentWindow);
      }

      holder.appendChild(frame);
    });
  });

  const frameWins = await Promise.all(frameEls);

  $(window).on("scroll", function () {
    frameWins.forEach((win) => {
      if (typeof win.receiveScrollData !== "function") return;

      win.receiveScrollData({
        scroll: $(document).scrollTop(),
        body: $(document.body).height(),
      });
    });
  });
};

initApp();
