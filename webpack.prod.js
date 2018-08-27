const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const paths = require('./paths');

const shouldUseSourceMap = false;

const config = {
  mode: 'production',
  bail: true,
  devtool: shouldUseSourceMap,
  entry: [paths.appIndexJs],
  output: {
    path: path.resolve(paths.appBuild),
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        cache: true,
        sourceMap: shouldUseSourceMap,
        uglifyOptions: {
          safari10: true,
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
    },
    runtimeChunk: true,
  },
  resolve: {
    modules: ['node_modules', paths.appSrc],
    extensions: ['.js', '.json', '.jsx'],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: paths.srcPaths,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                [require.resolve('@babel/preset-env'), { modules: false }],
                require.resolve('@babel/preset-react'),
              ],
              plugins: [
                [require.resolve('@babel/plugin-proposal-class-properties')],
              ],
              compact: true,
              highlightCode: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(paths.appBuild, {
      root: paths.appPath,
    }),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
    }),
  ],
};

module.exports = config;
