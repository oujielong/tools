const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: "./src/index.js",
    another: "./src/another-module.js",
    vendor: ["lodash"] //单独将某写第三方插件打包
  },
  mode: "development",
  // 源代码映射
  devtool: "none",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: false,
    port: 9000,
    clientLogLevel: "error"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          { loader: MiniCssExtractPlugin.loader },
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: "dist/*"
    }),
    new HtmlWebpackPlugin({ title: "Output Management" }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    }),
    new webpack.HashedModuleIdsPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "vendor",
          chunks: "initial", //all 会将所有第三方包打包成一个 initial
          minChunks: 2
        }
      }
    }
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    // chunkFilename: "[name].[chunkhash].chunk.js",
    filename: "[name].[chunkhash].js"
  }
};
