const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = (settings, buildType) => ({
  resolve: {
    extensions: ['.ts', '.js', '.js-next', '.json'],
  },
  output: {
    filename: path.join(settings.scripts.outputPath, `[name]-${buildType}.[chunkhash].js`),
    chunkFilename: path.join(settings.scripts.outputPath, 'chunks', `[name]-${buildType}.[chunkhash].js`),
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: settings.scripts.extensionPattern,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env', {
                  modules: false,
                  useBuiltIns: 'entry',
                  targets: {
                    browsers: settings.browserslist[buildType],
                  },
                },
              ],
              '@babel/typescript',
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              [
                '@babel/plugin-transform-runtime', {
                  regenerator: true,
                },
              ],
              '@babel/proposal-class-properties',
              '@babel/proposal-object-rest-spread',
            ],
          },
        },
      },
    ],
  },
});
