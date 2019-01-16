const getCleanConfig = require('./webpack/clean.config.js');
const getCommonConfig = require('./webpack/common.config.js');
const getScriptsConfig = require('./webpack/scripts.config.js');
const getStylesConfig = require('./webpack/styles.config.js');
const getAssetsConfig = require('./webpack/assets.config.js');
const path = require('path');
const glob = require('glob-all');

const LEGACY_CONFIG = 'legacy';
const MODERN_CONFIG = 'modern';

// webpack plugins
const merge = require('webpack-merge');

const basePath = path.resolve(__dirname);
const pagePath = path.join(basePath, 'src', 'pages');

const entries = {};
(glob.sync('**/script.ts', { cwd: pagePath }) || [])
  .reverse()
  .forEach((file) => {
    const dirName = `page-${path.dirname(file).split(path.sep).join('-')}`;

    if (!entries[dirName]) {
      entries[dirName] = path.join(pagePath, file);
    }
  });

const config = {
  mode: 'production',
  entry: entries,
  urls: {
    public: '/theme/',
  },
  paths: {
    modules: [path.join(basePath, 'src'), 'node_modules'],
    manifestBasePath: '',
    output: path.join(basePath, 'theme', 'static'),

  },
  browserslist: {
    modern: [
      'last 2 Chrome versions',
      'not Chrome < 60',
      'last 2 Safari versions',
      'not Safari < 10.1',
      'last 2 iOS versions',
      'not iOS < 10.3',
      'last 2 Firefox versions',
      'not Firefox < 54',
      'last 2 Edge versions',
      'not Edge < 15',
    ],
    legacy: [
      '> 1%',
      'last 2 versions',
      'Firefox ESR',
    ],
  },
  styles: {
    useRTL: false,
    extensionPattern: /\.(css|scss)$/,
    outputPath: 'css',
  },
  scripts: {
    extensionPattern: /\.ts$/,
    outputPath: 'js',
  },
};

module.exports = (env) => {
  const settings = merge(config, {
    mode: env.production ? 'production' : 'development',
  });

  const ret = [
    merge(
      getCommonConfig(settings, LEGACY_CONFIG),
      getCleanConfig(settings, LEGACY_CONFIG),
      getScriptsConfig(settings, LEGACY_CONFIG),
      getStylesConfig(settings, LEGACY_CONFIG),
      getAssetsConfig(settings, LEGACY_CONFIG),
    ),
    merge(
      getCommonConfig(settings, MODERN_CONFIG),
      getCleanConfig(settings, MODERN_CONFIG),
      getScriptsConfig(settings, MODERN_CONFIG),
      getStylesConfig(settings, MODERN_CONFIG),
      getAssetsConfig(settings, MODERN_CONFIG),
    ),
  ];

  return ret;
};
