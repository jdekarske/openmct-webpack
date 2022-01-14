const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const VueLoaderPlugin = require('vue-loader/lib/plugin');

const webpackConfig = {
  mode: 'development',
  plugins: [
    // new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'ISAAC IUI',
    }),

    // to copy openmct assets
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'node_modules/openmct/dist',
          to: 'assets'
        }
      ]
  }),
  ],
  entry: {
    index: './index.js',
    // HelloPlugin: './include/js/openmct-plugins/HelloPlugin',
  },
  output: {
    globalObject: "this",
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
      "MCT": path.join(__dirname, "node_modules/openmct/dist")
      // "vue": vueFile,
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
            }
          }
      },
      // {
      //   test: /\.css$/i,
      //   use: ['style-loader', 'css-loader'],
      // },
      // {
      //   test: /\.html$/,
      //   use: 'html-loader'
      // },
      // {
      //   test: /\.(jpg|jpeg|png|svg|ico|woff2?|eot|ttf)$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[name].[ext]',
      //     outputPath(url, resourcePath, context) {
      //       if (/\.(jpg|jpeg|png|svg)$/.test(url)) {
      //         return `images/${url}`;
      //       }

      //       if (/\.ico$/.test(url)) {
      //         return `icons/${url}`;
      //       }

      //       if (/\.(woff2?|eot|ttf)$/.test(url)) {
      //         return `fonts/${url}`;
      //       } else {
      //         return `${url}`;
      //       }
      //     }
      //   }
      // },
      // {
      //   test: /\.vue$/,
      //   use: 'vue-loader'
      // }
    ]
  },
  devtool: 'source-map'
};

module.exports = webpackConfig;