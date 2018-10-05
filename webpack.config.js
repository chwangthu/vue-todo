const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin')
const isDev = process.env.WEBPACK_MODE === 'development'
const webpack = require('webpack')

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'), //入口
  output: { //出口
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     WEBPACK_MODE: isDev ? '"development"' : '"production"'
    //   }
    // }),
    new VueLoaderPlugin(), new HTMLPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
			{
				test: /\.styl/,
				use: [
					'style-loader', 'css-loader',{
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          }, 'stylus-loader'
				]
			},
      {
        test: /\.(png|gif|jpeg|jpg|svg)$/,
        use: [
          {
        	loader: 'url-loader',
        	options: {
              limit: 1024, //转成base64代码
              name: '[name].[ext]' //输出文件名
            }
          }
        ]
      }
    ]
  }
}

if(isDev) {
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true, //显示错误
    },
    hot: true,
    open: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
}

module.exports = config