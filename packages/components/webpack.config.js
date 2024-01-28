const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

function devServer() {
  return {
    output: {
      path: path.resolve(__dirname, 'dist'),
      // filename: `[name].es.js`,
      // libraryTarget: 'module'
    },
    experiments: {
      // outputModule: true
    },
    optimization: {
      usedExports: false,
      splitChunks: {
        chunks: 'all',
      },
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader',]
        }
      ],
    },
    devServer: {
      static: {
        // directory: path.resolve(__dirname, './dist')
      },
      hot: true,
      compress: true,
      port: 9000,
      host: '0.0.0.0',
      // open: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ],
  }
}

function create(target, config = {}) {
  const targets = {
    esm: 'module',
    umd: 'umd',
  }
  return {
    entry: {
      ring: './src/ring/index.ts',
    },
    // entry: "./src/ring/index.ts",
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `[name].${target}.js`,
      libraryTarget: targets[target]
    },

    experiments: {
      outputModule: true
    },
    optimization: {
      usedExports: false,
      /*splitChunks: {
        chunks: 'all',
      },*/
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            'style-loader', // creates style nodes from JS strings
            'css-loader', // translates CSS into CommonJS
          ]
        }
      ],
    },
    devtool: 'source-map',
    plugins: [
      new CleanWebpackPlugin(),
    ],
    ...config
  }
}

module.exports = [
  create('esm')
]