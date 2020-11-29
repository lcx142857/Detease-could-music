module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(html)$/,
          exclude: /node_modules/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        }
      ]
    }
  },

  devServer: {
    public: require('os').networkInterfaces()[Object.keys(require('os').networkInterfaces())[0]][1].address + ':8080',
    disableHostCheck: true
  },

  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/recommend',
        '/detail',
        '/singer',
        '/rank',
        '/search',
        '/Account'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    }
  }
}
