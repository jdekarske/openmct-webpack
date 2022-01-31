const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const webpackConfig = {
  mode: 'development',
  plugins: [
    new VueLoaderPlugin(),
    new ESLintPlugin({
      extensions: ['js', 'vue'],
     }),
    new HtmlWebpackPlugin({
      title: 'ISAAC IUI',
    }),
    // to copy openmct assets so they can be accessed with `openmct.setassetpath()`
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'node_modules/openmct/dist',
          to: 'assets'
        }
      ]
    }),
  ],
  entry: './index.js',
  output: {
    globalObject: "this",
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    alias: {
      "MCT": path.join(__dirname, "node_modules/openmct/dist/openmct.js"),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.m?js$/,
      //   exclude: /(node_modules)/,
      //   use: [{
      //     loader: 'babel-loader',
      //     options: { presets: ['@babel/preset-env'] },
      //   }, { loader: 'eslint-loader' }]
      // },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
    ]
  },
  devtool: 'source-map'
};

module.exports = webpackConfig;