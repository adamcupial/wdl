const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const webpack = require('webpack');
const noop = require('noop-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = (settings) => ({
    mode: settings.mode,
    entry: settings.entry,
    resolve: {
        modules: settings.paths.modules,
    },
    output: {
        path: settings.paths.output,
      publicPath: settings.urls.public,
      hashDigestLength: 8,
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
        new WebpackAssetsManifest({
            integrity: true,
            integrityHashes: ['sha256'],
            writeToDisk: true,
        }),
    ],
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: "all",
      },
      mangleWasmImports: true,
      mergeDuplicateChunks: true,
      removeAvailableModules: true,
      removeEmptyChunks: true,
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
        all: true,
    },
});
