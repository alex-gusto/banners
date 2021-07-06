const HtmlWebpackPlugin = require("html-webpack-plugin");
var HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const { FRAMES, PROJECTS_FOLDER } = require("./core/constants");

module.exports = (env) => {
  const rootDir = `${PROJECTS_FOLDER}/${env.name}`;

  const createHtmlForFrame = (name) => {
    return [
      new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: `./${rootDir}/${name}/${name}.html`,
        chunks: [],
      }),
      new HtmlWebpackTagsPlugin({
        files: [`${name}.html`],
        links: ["global.css", `${name}.css`],
        scripts: ["global.js", `${name}.js`],
      }),
    ];
  };

  return {
    mode: "development",
    entry: "./index.js",
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
        template: "./core/index.html",
        chunks: ["main"],
      }),
      ...FRAMES.map(createHtmlForFrame).flat(),
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
        files: FRAMES.map((name) => `${name}.html`),
        tags: [
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js",
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TimelineMax.min.js",
        ],
      }),
      new CopyPlugin({
        patterns: [
          `./${rootDir}/global/global.js`,
          `./${rootDir}/global/global.css`,

          ...FRAMES.map((name) => [
            `./${rootDir}/${name}/${name}.js`,
            `./${rootDir}/${name}/${name}.css`,
          ]).flat(),
          {
            from: `./${rootDir}/assets/`,
            to: "assets",
            noErrorOnMissing: true,
          },
        ],
      }),
    ],
    devServer: {
      contentBase: ["dist"],
      publicPath: "/",
    },
  };
};
