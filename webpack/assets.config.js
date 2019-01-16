const imageminGifsicle = require('imagemin-gifsicle');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminOptipng = require('imagemin-optipng');
const imageminSvgo = require('imagemin-svgo');
const path = require('path');

module.exports = (settings, buildType) => {
  if (buildType === 'modern') {
    return {};
  }

  return {
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: path.join(settings.paths.output, 'img'),
                name: '[name].[hash].[ext]',
              },
            },
            {
              loader: 'img-loader',
              options: {
                plugins: [
                  imageminGifsicle({
                    interlaced: true,
                  }),
                  imageminMozjpeg({
                    progressive: true,
                    arithmetic: false,
                  }),
                  imageminOptipng({
                    optimizationLevel: 5,
                  }),
                  imageminSvgo({
                    plugins: [
                      { convertPathData: false },
                    ],
                  }),
                ],
              },
            },
          ],
        },
      ],
    },
  };
};
