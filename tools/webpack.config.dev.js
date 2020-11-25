var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CircularDependencyPlugin = require("circular-dependency-plugin");

var BASE_PATH = process.env.BASE_PATH || "/";

module.exports = {
  name: "client",
  devtool: "source-map",
  target: "web",
  mode: "development",
  entry: {
    app: [path.join(__dirname, "../src", "index.tsx")],
  },
  output: {
    path: path.join(__dirname, "..", "/dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: {
      "@pages": path.resolve(__dirname, "..", "src", "pages"),
      "@components": path.resolve(__dirname, "..", "src", "components"),
      "@assets": path.resolve(__dirname, "..", "src/assets/"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../src", "index.html"),
      inject: false,
      chunksSortMode: "none",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
      "process.env.BASE_PATH": JSON.stringify(BASE_PATH),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "source-map-loader",
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2|otf)$/,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]",
        },
      },
      // Files
      {
        test: /\.(jpg|jpeg|png|gif|svg|ico)$/,
        loader: "file-loader",
        options: {
          name: "static/[name].[ext]",
        },
      },
    ],
  },
  devServer: {
    hot: true,
    compress: true,
    historyApiFallback: {
      index: BASE_PATH,
    },
    host: "0.0.0.0",
    port: 8070,
    proxy: {
      "/api/": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
};
