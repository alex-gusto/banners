module.exports = ({ name, path, filename }) => {
  return {
    output: {
      path,
      filename,
      library: {
        name,
        type: "var",
        export: "default",
      },
      clean: true,
    },
    target: ["web", "es5"],
    module: {
      rules: [
        {
          test: /.js/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  [
                    "@babel/preset-env",
                    {
                      targets: "ie 9",
                    },
                  ],
                ],
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  };
};
