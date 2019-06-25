const sharp = require('sharp');
const path = require('path');
const glob = require('fast-glob');
const imageminWebp = require('imagemin-webp');
const imageminJpg = require('imagemin-mozjpeg');
const imagemin = require('imagemin');
var tmp = require('tmp');

const extension = 'png';
const [maxWidth, maxHeight] = [1200, 600];
// default: 1200x600
let sizes =  [];
const multipliers = [1, 2, 3];
const possibleSizes = [
  [272, 136],
  [346, 173],
  [314, 157],
  [522, 261],
  [298, 149],
  [718, 359],
  [654, 327],
  [1070, 535],
];


multipliers
  .forEach((multiplier) => {
    possibleSizes
      .forEach(([width, height]) => {
        let newWidth = width * multiplier;
        const newHeight = height * multiplier;

        if (newWidth > maxWidth || newHeight > maxHeight) {
          console.log(`${multiplier} * ${width} x ${height} is too much: ${newWidth} x ${newHeight}!`);
          return;
        }

        sizes.push([newWidth, newHeight]);
      });
  });

sizes.sort((a, b) => {
  return a[0] - b[0] || a[1] - b[1];
});

sizes = sizes
  .filter(([width, height], index, arr) => {
    if (index === 0 || index === arr.length -1) {
      return true;
    }

    const next = arr[index + 1];
    if (next[0] - width < 5 || next[1] - height < 5) {
      console.log(`Different between ${width} x ${height} and ${next[0]} x ${next[1]} is too small`);
      return false;
    }

    return true;

  });
console.log('The following sizes will be generated:');
sizes.forEach(([width, height]) => { console.log(`[${width}, ${height}],`); });
sizes.push([maxWidth, maxHeight]); // google json-ld


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
          .webp()
          .toFile(`${newFile}.webp`, (err, info) => {
            if (err) {
              throw new Error(err);
              process.exit(1);
            }
          })
          .jpeg()
          .toFile(`${newFile}.jpg`, (err, info) => {
            if (err) {
              throw new Error(err);
              process.exit(1);
            }
          })
      });
  });

console.info('Resized images');

Promise.all([
  imagemin([`${tmpobj.name}/*.webp`], output, {
    plugins: [
      imageminWebp({
        method: 6,
      }),
    ]
  }),
  imagemin([`${tmpobj.name}/*.jpg`], output, {
    plugins: [
      imageminJpg(),
    ]
  }),
])
  .then(([webp, jpgs]) => {
    [...webp, ...jpgs]
      .forEach((obj) => {
        console.info(`Optimized ${path.basename(obj.path)}`);
      });
    tmpobj.removeCallback();
  })
  .catch((err) => {
    throw new Error(err);
    process.exit(1);
  });
