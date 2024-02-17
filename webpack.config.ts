import type { Configuration as WebpackConfiguration } from 'webpack';

import { DefinePlugin } from 'webpack';
import path from 'node:path';
import TerserPlugin from 'terser-webpack-plugin';

const isDevelopment = () => process.env['NODE_ENV'] === 'development';
const isProduction = () => process.env['NODE_ENV'] === 'production';

const toWebpackMode = () =>
  isDevelopment() || isProduction()
    ? process.env['NODE_ENV'] as 'development' | 'production'
    : 'none'
;

const WEBPACK_CONFIG: WebpackConfiguration[] = [{
  mode: toWebpackMode(),
  devtool: isDevelopment() ? 'inline-source-map' : false,
  entry: {
    index: './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
}];

WEBPACK_CONFIG.unshift({
  ...WEBPACK_CONFIG[0],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  entry: {
    'normal-env': './src/index.ts'
  },
  output: {
    ...WEBPACK_CONFIG[0]?.output,
    filename: '[name].min.js'
  }
});

WEBPACK_CONFIG[0]!.plugins = [
  new DefinePlugin({
    BROWSER: false
  })
];

WEBPACK_CONFIG[1]!.plugins = [
  new DefinePlugin({
    BROWSER: true
  })
];


export default WEBPACK_CONFIG;