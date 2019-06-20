const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = (settings) => ({
    resolve: {
        extensions: ['.ts', '.js', '.js-next', '.json'],
    },
    output: {
        filename: path.join(settings.scripts.outputPath, `[name].[chunkhash].js`),
        chunkFilename: path.join(settings.scripts.outputPath, 'chunks', `[name].[chunkhash].js`),
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    output: {
                        comments: false,
                    },
                }
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
                                    corejs: 3,
                                    targets: {
                                        browsers: settings.browserslist,
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
