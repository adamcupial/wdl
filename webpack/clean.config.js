const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = (settings, buildType) => {
  if (buildType === 'modern') {
    return {};
  }

  return {
    plugins: [
      new CleanWebpackPlugin([
        settings.scripts.outputPath,
        settings.styles.outputPath,
      ], {
        verbose: true,
        root: settings.paths.output,
        allowExternal: true,
      }),
    ],
  };
};
