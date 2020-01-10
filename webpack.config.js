const getCleanConfig = require('./webpack/clean.config.js');
const getCommonConfig = require('./webpack/common.config.js');
const getScriptsConfig = require('./webpack/scripts.config.js');
const getStylesConfig = require('./webpack/styles.config.js');
const getAssetsConfig = require('./webpack/assets.config.js');
const getAnalyzeConfig = require('./webpack/analyze.config.js');
const path = require('path');
const glob = require('fast-glob');

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
    browserslist: [
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
    styles: {
        extensionPattern: /\.(css|scss)$/,
        outputPath: 'css',
    },
    scripts: {
        extensionPattern: /\.ts$/,
        outputPath: 'js',
    },
    images: {
        outputPath: 'images',
    }
};

module.exports = (env) => {
    const settings = merge(config, {
        mode: env.production ? 'production' : 'development',
        env,
    });

    const ret = [
        merge(
            getCommonConfig(settings),
            getCleanConfig(settings),
            getScriptsConfig(settings),
            getStylesConfig(settings),
            getAssetsConfig(settings),
            getAnalyzeConfig(settings),
        ),
    ];

    return ret;
};
