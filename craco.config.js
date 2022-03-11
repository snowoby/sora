// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
    configure: {
      output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, "build"),
      },
    },
  },
  style: {
    css: {
      loaderOptions: (cssLoaderOptions, { env }) => {
        const modules = {
          exportLocalsConvention: "camelCase",
          auto: true,
          compileType: "module",
        };
        if (env === "development") {
          modules.localIdentName = "[name]_[local]__[hash:base64:5]";
        }
        cssLoaderOptions.modules = modules;
        return cssLoaderOptions;
      },
    },
  },
};
