export const CHANGE_MODES = {
  inOut: "in-out",
  outIn: "out-in",
};

export const RANDOM_OPTIONS = ["first", "first-last", "last"];

export const DEFAULT_OPTIONS = {
  rootEl: ".scene-manager",
  holderEl: ".scene-manager-holder",
  sceneSelector: ".scene-manager-scene",
  navEl: ".scene-manager-nav",
  arrowsSelector: ".scene-manager-arrow",
  skipDelay: 250,
  random: false,
  nav: false,
  arrows: false,
  mode: CHANGE_MODES.inOut,
};
