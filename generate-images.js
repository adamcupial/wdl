const sharp = require('sharp');
const path = require('path');
const glob = require('fast-glob');
const imageminPng = require('imagemin-pngquant');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
var tmp = require('tmp');

const extension = 'png';
// default: 1200x600
const sizes = [
  [1200, 600],
  [900, 450],
  [600, 300],
  [300, 150],
];

const images = glob.sync(`*.${extension}`, { cwd: path.join(process.cwd(), 'content-images') });
const output = path.join(process.cwd(), 'theme', 'static', 'content-images');
const tmpobj = tmp.dirSync();

images
  .map(name => path.join(process.cwd(), 'content-images', name))
  .forEach((filepath) => {
    sizes
      .forEach(([width, height]) => {
        const newFile = path.join(tmpobj.name, `${path.basename(filepath, '.' + extension)}-${width}x${height}`);
        sharp(filepath)
          .resize(width, height)
          .png()
          .toFile(`${newFile}.png`, (err, info) => {
            if (err) {
              throw new Error(err);
              process.exit(1);
            }
          })
          .webp()
          .toFile(`${newFile}.webp`, (err, info) => {
            if (err) {
              throw new Error(err);
              process.exit(1);
            }
          })
      });
  });

console.info('Resized images');

Promise.all([
  imagemin([`${tmpobj.name}/*.png`], output, {
    plugins: [
      imageminPng({
        strip: true,
        speed: 1,
      }),
    ]
  }),
  imagemin([`${tmpobj.name}/*.webp`], output, {
    plugins: [
      imageminWebp({
        method: 6,
      }),
    ]
  })
])
  .then(([pngs, webp]) => {
    [...pngs, ...webp]
      .forEach((obj) => {
        console.info(`Optimized ${path.basename(obj.path)}`);
      });
    tmpobj.removeCallback();
  })
  .catch((err) => {
    throw new Error(err);
    process.exit(1);
  });
