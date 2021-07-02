const HtmlWebpackPlugin = require("html-webpack-plugin");
var HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

const frames = ["left", "top", "right", "bottom"];

const createHtmlForFrame = (name) => {
  return [
    new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: `./src/${name}/${name}.html`,
      chunks: [],
    }),
    new HtmlWebpackTagsPlugin({
      files: [`${name}.html`],
      links:["global.css", `${name}.css`],
      scripts: ["global.js", `${name}.js`],
    }),
  ];
};

module.exports = {
  mode: "development",
  entry: "./src/core/index.js",
  devtool: "inline-source-map",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
      chunks: ["main"],
    }),
    ...frames.map(createHtmlForFrame).flat(),
    new HtmlWebpackTagsPlugin({
      publicPath: false,
      append: false,
      tags: [
        "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js",
      ],
    }),
    new HtmlWebpackTagsPlugin({
      publicPath: false,
      append: false,
      files: frames.map((name) => `${name}.html`),
      tags: [
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TimelineMax.min.js",
      ],
    }),
    new CopyPlugin({
      patterns: [
        "./src/global/global.js",
        "./src/global/global.css",

        ...frames
          .map((name) => [
            `./src/${name}/${name}.js`,
            `./src/${name}/${name}.css`,
          ])
          .flat(),
       {
         from:  "./src/assets/",
         to: 'assets'
       }   
      ],
    }),
  ],
  devServer: {
    contentBase: ["dist"],
    publicPath: "/",
  },
};
