const HtmlWebpackPlugin = require("html-webpack-plugin");
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
      })
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
      new CopyPlugin({
        patterns: [
          {
            from: `./${rootDir}/global/global.js`,
            to: "js",
          },
          `./${rootDir}/global/global.css`,

          ...FRAMES.map((name) => [
            {
              from: `./${rootDir}/${name}/${name}.js`,
              to: "js",
            },
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
      contentBase: ["dist", "public"],
      publicPath: "/",
    },
  };
};
