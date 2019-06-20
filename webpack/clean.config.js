const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');


module.exports = (settings) => {
  return {
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['css/**/*','js/**/*', 'manifest.json'],
            verbose: true,
        })
    ],
  };
};
