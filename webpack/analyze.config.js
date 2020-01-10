const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Visualizer = require('webpack-visualizer-plugin');


module.exports = (settings) => {
  if (settings.env && settings.env.analyze) {
    return {
      plugins: [
        new BundleAnalyzerPlugin({}),
      ]
    };
  }

  if (settings.env && settings.env.visualize) {
    return {
      plugins: [
        new Visualizer(),
      ],
    }
  }
  return {};
}
