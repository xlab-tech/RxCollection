/* eslint import/no-extraneous-dependencies: 0 */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = [
  {
    mode: 'development',
    entry: './src/index.umd.js',
    output: {
      library: 'RxC',
      libraryTarget: 'umd',
      libraryExport: 'default',
      filename: 'umd/RxCollection.src.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map',
    plugins: [
      new CleanWebpackPlugin(['dist']),
    ],
  },
  {
    mode: 'production',
    entry: './src/index.umd.js',
    output: {
      library: 'RxC',
      libraryTarget: 'umd',
      libraryExport: 'default',
      filename: 'umd/RxCollection.min.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    plugins: [],
  }];
