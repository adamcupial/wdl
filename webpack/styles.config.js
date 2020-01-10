const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackRemoveEmptyJSChunksPlugin = require('webpack-remove-empty-js-chunks-plugin').WebpackRemoveEmptyJSChunksPlugin;
const cleanCSS = require('clean-css');
const merge = require('webpack-merge');
const path = require('path');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = (settings) => {

  return {
    plugins: [
      new FixStyleOnlyEntriesPlugin(),
      new MiniCssExtractPlugin({
        filename: path.join(settings.styles.outputPath, `[name].[chunkhash].css`),
        chunkFilename: path.join(settings.styles.outputPath, 'chunks', `[name].[chunkhash].css`),
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
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: true,
              },
            },
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
                    browsers: settings.browserslist,
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
};
