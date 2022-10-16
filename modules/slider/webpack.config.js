const config = require("../webpack.config");
const path = require("path");

module.exports = () => {
  return config({
    name: "SceneManager",
    path: path.resolve(__dirname, "lib"),
    filename: "scene-manager.min.js",
  });
};
