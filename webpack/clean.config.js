const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');


module.exports = (settings) => {
  return {
    plugins: [
      new CleanWebpackPlugin([
        settings.scripts.outputPath,
        settings.styles.outputPath,
        path.join(settings.paths.output, 'manifest.json'),
      ], {
        verbose: true,
        root: settings.paths.output,
        allowExternal: true,
      }),
    ],
  };
};
