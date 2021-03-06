const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const webpackEnv = process.env.NODE_ENV
const isEnvDevelopment = webpackEnv === 'development'
const isEnvProduction = webpackEnv === 'production'

module.exports = {
  mode: webpackEnv,
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
    }
  },
  entry: {
    'inject': './src/chrome/inject',
    'background-loader': './src/chrome/background-loader',
    'background-index': './src/chrome/background-index',
    'popup-loader': './src/chrome/popup-loader',
    'popup-index': './src/chrome/popup-index',
    'room': './src/chrome/room'
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: isEnvProduction ? 'static/js/[name]-[contenthash:8].js' : 'static/js/[name].js',
    publicPath: '.',
  },
  optimization: {
    minimize: isEnvProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          keep_classnames: false,
          keep_fnames: false,
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        sourceMap: false,
      }),
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      isEnvDevelopment && {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/preset-react'],
          plugins: [require.resolve('react-refresh/babel')], // ??? react-refresh ??????
        },
      },
      {
        test: /\.css$/,
        use: [
          isEnvDevelopment && 'style-loader',
          isEnvProduction && {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader'
        ].filter(Boolean)
      }
    ].filter(Boolean)
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, './dist/index.html'),
      template: 'public/index.html',
      chunks: ['popup-loader'],
      minify: {
        removeComments: true,  // ????????????
        collapseWhitespace: true, // ????????????
        removeAttributeQuotes: true // ??????????????????
      }
    }),
    isEnvProduction && new MiniCssExtractPlugin({
      filename: 'static/css/[name]-[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    isEnvProduction && new CleanWebpackPlugin(),
    isEnvDevelopment && new ReactRefreshPlugin()
  ].filter(Boolean),
  // ???????????????????????????????????????
  devServer: {
    historyApiFallback: true, // ??????????????????????????????????????????index.html??????
    disableHostCheck:true,
    hot: true,
    contentBase: false, // ???????????????????????????????????????????????????????????????????????????????????????
    compress: true,
    port: '3000', // ????????????
    publicPath: '/', // ?????????????????????
    proxy: {
      // ??????????????????
    }
  }
}