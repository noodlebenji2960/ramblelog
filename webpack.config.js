const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].js",  // Use [name] placeholder
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  devtool: "eval-source-map",
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(webp|png|avif|jpe?g|gif|bmp|svg)$/i,
        exclude: /node_modules/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      chunks: ["main"],
    }),
  ],
};