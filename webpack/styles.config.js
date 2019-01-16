const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackRemoveEmptyJSChunksPlugin = require('webpack-remove-empty-js-chunks-plugin').WebpackRemoveEmptyJSChunksPlugin;
const RtlCssPlugin = require('rtl-css-transform-webpack-plugin');
const cleanCSS = require('clean-css');
const merge = require('webpack-merge');
const path = require('path');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = (settings, buildType) => {

  return {
    plugins: [
      new MiniCssExtractPlugin({
        filename: path.join(settings.styles.outputPath, `[name]-${buildType}.[chunkhash].css`),
        chunkFilename: path.join(settings.styles.outputPath, 'chunks', `[name]-${buildType}.[chunkhash].css`),
      }),
      new WebpackRemoveEmptyJSChunksPlugin(),
    ],
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({
          cssProcessor: cleanCSS,
          cssProcessorOptions: {
            level: 2,
          },
        }),
      ],
    },
    module: {
      rules: [
        {
          test: settings.styles.extensionPattern,
          sideEffects: true,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  postcssPresetEnv({
                    browsers: settings.browserslist[buildType],
                  }),
                ],
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
  };

  if (settings.styles.useRTL) {
    ret = merge(ret, {
      plugins: [
        new RtlCssPlugin({
          filename: path.join(settings.styles.outputPath, '[name]-rtl.[chunkhash].css'),
        }),
      ],
    });
  }
};
