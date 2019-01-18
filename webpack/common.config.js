const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const webpack = require('webpack');
const noop = require('noop-webpack-plugin');


module.exports = (settings) => ({
  mode: settings.mode,
  entry: settings.entry,
  resolve: {
    modules: settings.paths.modules,
  },
  output: {
    path: settings.paths.output,
    publicPath: settings.urls.public,
  },
  plugins: [
    settings.mode === 'development' ? new WebpackNotifierPlugin({
      title: 'Webpack',
      excludeWarnings: true,
      alwaysNotify: true,
    }) : noop(),
    new ManifestPlugin({
      writeToFileEmit: true,
      fileName: `manifest.json`,
      basePath: settings.paths.manifestBasePath,
    }),
  ],
  optimization: {
    minimize: true,
    moduleIds: 'hashed',
    flagIncludedChunks: true,
    providedExports: true,
    sideEffects: true,
    usedExports: true,
  },
  performance: {
    hints: 'warning',
  },
  stats: {
    assets: true,
    builtAt: true,
    cached: true,
    cachedAssets: true,
    children: false,
    chunks: false,
    chunkGroups: false,
    chunkModules: false,
    chunkOrigins: true,
    chunksSort: 'field',
    depth: true,
    entrypoints: false,
    env: true,
    errors: true,
    errorDetails: true,
    hash: true,
    maxModules: 100,
    modules: false,
    modulesSort: 'field',
    moduleTrace: true,
    performance: true,
    providedExports: false,
    publicPath: true,
    reasons: false,
    source: false,
    timings: true,
    usedExports: true,
    version: true,
    warnings: true,
  },
});
