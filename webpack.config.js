const HtmlWebpackPlugin = require("html-webpack-plugin");
var HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

const frames = ["left", "top", "right", "bottom"];

const createHtmlForFrame = (name) => {
  return [
    new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: `./src/${name}/index.html`,
      chunks: [],
    }),
    new HtmlWebpackTagsPlugin({
      tags: ["global.js", `${name}.js`],
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
      excludeAssets: [/bottom/],
      chunks: ["main"],
    }),
    ...frames.map(createHtmlForFrame).flat(),
    new HtmlWebpackTagsPlugin({
      tags: [
        {
          append: false,
          external: { packageName: "jquery", variableName: "jQuery" },
          publicPath: "",
          path: "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js",
        },
        {
          append: false,
          path: "https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js",
          publicPath: "",
          attributes: {
            integrity:
              "sha512-DkPsH9LzNzZaZjCszwKrooKwgjArJDiEjA5tTgr3YX4E6TYv93ICS8T41yFHJnnSmGpnf0Mvb5NhScYbwvhn2w==",
            crossorigin: "anonymous",
          },
        },
        {
          append: false,
          path: "https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TimelineMax.min.js",
          publicPath: "",
        },
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
      ],
    }),
  ],
  externals: {
    jquery: "jQuery",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  devServer: {
    contentBase: ["dist"],
    publicPath: "/",
    port: 3001,
  },
};
