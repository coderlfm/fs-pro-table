var path = require('path')
var webpack = require('webpack')
const glob = require("glob")
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: "none", //打包为开发模式
  // entry:'./pro-table/index.jsx', //入口文件路径
  entry: {
    ProTable: "./src/index.jsx",
    ProTableHeader: "./src/pro-table/Pro-table-header.jsx",
    ProForm: "./src/pro-form/index.jsx",
  },
  output: {
    //输出路径和文件名，使用path模块resolve方法将输出路径解析为绝对路径
    path: path.resolve(__dirname, "./dist"), //将js文件打包到dist/js的目录
    filename: "[name].js",
    libraryExport: "default",
    library:"ProTable",
    libraryTarget: "umd"
    // filename: 'main.js',
    // library: 'nsc-components', 
    // libraryTarget: 'umd',
    // libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,  // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
        exclude: /node_modules/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader' // 加载模块 "babel-loader" 
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'less-loader',
          { loader: 'less-loader', options: { javascriptEnabled: true } }
        ]
      },
      {
        test: /\.css$/,
        use: [{
          loader: "style-loader"
        },
        {
          loader: 'css-loader',
          options: {
            modules: {
              mode: 'local',
              localIdentName: '[name]-[local]',
            },
          }
        }
        ]
      },
      // { test: /.jsx$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.optimize.CommonsChunkPlugin('lib', 'js/lib.js')
  ],
  externals: [nodeExternals()]
}