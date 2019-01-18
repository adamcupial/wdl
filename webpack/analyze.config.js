const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (settings) => {
  if (settings.env && settings.env.analyze) {
    return {
      plugins: [
        new BundleAnalyzerPlugin({}),
      ]
    };
  }
  return {};
}
