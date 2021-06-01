/*
 * @Description:
 * @Author: mewcoder
 * @Date: 2021-06-01 19:24:06
 * @LastEditors: mewcoder
 * @LastEditTime: 2021-06-01 19:26:13
 */
const path = require('path');
const resolve = filePath => path.join(__dirname, './', filePath);

module.exports = {
  outputDir: 'docs',
  publicPath: '/my-ui/',
  devServer: { port: '3366' },
  pages: {
    index: {
      entry: resolve('story/main.ts'),
      template: 'public/index.html',
      filename: 'index.html',
      title: 'my-ui'
    }
  },
  /*
   * 这个两个插件会在我们的index单页面中的script标签加上 defer以及async属性，导致我们demo示例页面按需加载失效
   */
  chainWebpack: config => {
    config.plugins.delete('prefetch-index').delete('preload-index');
    config.resolve.alias.set('story', resolve('story'));
  }
};
