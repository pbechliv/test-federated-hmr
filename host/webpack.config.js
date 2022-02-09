const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');
const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devtool: 'source-map',
  optimization: {
    minimize: false,
  },
  devServer: {
    hot: true,
    static: path.join(__dirname, 'dist'),
    port: 3000,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  output: {
    uniqueName: 'host',
    publicPath: 'auto',
    clean: true,
  },
  module: {
    rules: [
      // {
      //   test: /\.jsx?$/,
      //   loader: 'babel-loader',
      //   exclude: /node_modules/,
      //   options: {
      //     presets: ['@babel/preset-react'],
      //     plugins: [require.resolve('react-refresh/babel')],
      //   },
      // },
      {
        test: /\.jsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          getCustomTransformers: () => ({
            before: [require('react-refresh-typescript')()]
          }),
        }
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        remote1: 'remote1@[remote1Url]/remoteEntry.js',
        remote2: 'remote2@[remote2Url]/remoteEntry.js',
        libs: 'libs@[libsUrl]/remoteEntry.js',
      },
      shared: require("./package.json").devDependencies
    }),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ReactRefreshWebpackPlugin({
      exclude: [/node_modules/, /bootstrap\.js$/],
    }),
    // new LiveReloadPlugin({
    //   port: 35729,
    // }),
  ],
};
