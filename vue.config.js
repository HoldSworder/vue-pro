module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'pages': '@/pages',
        'utils': '@/utils',
        'store': '@/store'
      }
    }
  }
}