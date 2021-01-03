const path = require('path')
const getPath = dir => {
  return path.join(__dirname, dir)
}

const TITLE = 'Moto.Template.Ui'

module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',

      // 模板来源
      template: 'public/index.html',

      // 在 dist/index.html 的输出
      filename: 'index.html',

      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: TITLE,

      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
  },

  // 在生成环境中 将路径设置为 ./
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

  // 在保存的时候 检查代码
  lintOnSave: true,

  // webpack-dev-server 配置
  devServer: {
    open: true, // 运行自动打开
    host: 'localhost', // 指定主机
    port: 5548, // 端口
    https: false, // 是否配置本地https
    hotOnly: false, // 是否启用热模块更新
    // 跨域配置
    proxy: {
      '/api': {
        target: 'http://xuejian.ang/', // 需要替换的线上地址
        ws: true, // 代理 webSocket
        changOrigin: true, // 替换请求头origin为 target url
        pathRewrite: {
          '^/api': '',
        }, // 请求时将 /api 重写为空
      },
    },
  },

  // 配置项目便捷性
  configureWebpack: {
    // externals: {
    //   BMapLib: 'BMapLib',
    //   BMap: 'BMap',
    // }, // 使用 vue-baidu-map 时需要
    resolve: {
      extensions: ['.js', '.vue', '.json', '.css'], // 解析扩展
      alias: {
        '@': getPath('src'), // 寻找src目录时 可直接用 @ 替代
      }, // 确保引入模块时 更简单
    },
  },

  // 引入全局 css变量
  css: {
    loaderOptions: {
      stylus: {
        import: '~@/stylus/theme.styl',
        // import: ["~@/assets/variable.styl", "~@/assets/variable2.styl"]
      },
    },
  },
}
