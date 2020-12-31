const { VueLoaderPlugin } = require("vue-loader");
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const distDir = path.resolve(__dirname) + '/dist/';
const srcDir = path.resolve(__dirname) + '/src/';
module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: path.resolve(__dirname)+'/dist/',
    host: "0.0.0.0",
    open: true,
    overlay: true,
    port: 8008,
    useLocalIp: true,
  },
  entry: {
    'main': srcDir + 'script/main.ts',
  },
  output: {
    publicPath: srcDir,
    filename: '[name].js',
  },
  resolve: {
    alias: {
      '@': srcDir + 'script/',
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader'
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
        }
      },
      {
        test: /\.(sc|c|sa)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: distDir + '[name].css'
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false'
    })
  ]
};
