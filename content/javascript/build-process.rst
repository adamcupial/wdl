Build process
#############

:date: 2019-02-04
:tags: blog, tips, webpack
:series: How I built my blog
:series_index: 3

In this episode I explain details about the build process, what were the requirements and why I have chosen webpack to handle them.


.. PELICAN_END_SUMMARY

I wanted the following from my build process:

- minification and obfuscation
- transpiling, both for scripts (typescript) and styles (sass)
- bundling
- image optimization
- removing unused code
- lazy loading of styles and scripts

In short - I went with `webpack <https://webpack.js.org/>`__, which comes bundled with half of those things and plugins to handle the rest.

That's basically the setup I am using as a base for all my projects, and modify as needed.

I won't delve into some excrutiating details, you are welcome to take a look yourself on `github <https://github.com/adamcupiall/wdl/blob/master/webpack.config.js>`__.

Build config
------------

When creating my build I was heavily inspired by the `NY Studio's 107 annotated config <https://nystudio107.com/blog/an-annotated-webpack-4-config-for-frontend-web-development>`__ with few notable exceptions:

- I don't need modern/legacy builds, I decided to cater only for newer browsers - something that I have longed to do for years
- I don't need any HTML injection, which also means I handle critical path rendering and script loading myself
- I don't use vue
- I don't need HMR
- I use sass instead of modern-era css/postcss, which I still believe is a better option for now
- I like writing in typescript, even if it's kindof wasted here
- I needed multiple entrypoints, one per page template to be exact

Main
====

I went with one entrypoint per page, globbing the source for them, manifest for nice cache-friendly files and few tools for more pleasant experience.

- `glob-all <https://www.npmjs.com/package/glob-all>`__ to collect all entrypoints
- `manifest-plugin <https://github.com/danethurber/webpack-manifest-plugin>`__ to generate manifest so I can have cache-friendly filenames
- `webpack-notifier <https://www.npmjs.com/package/webpack-notifier>`__ so I get notice when build finishes - saves me from refreshing the page too much
- `webpack-merge <https://github.com/survivejs/webpack-merge>`__ so I can keep my webpack configs separated
- bundle analyzer on switch when I need to debug the bundles
- clean plugin to erase the output dir

Full setup can be found on `github <https://github.com/adamcupial/wdl/blob/master/webpack.config.js>`__

Styles
======

Nothing fancy, sass with extraction and minification

- based around `mini-css-extract-plugin <https://github.com/webpack-contrib/mini-css-extract-plugin>`__ which allows me
  to have my styles as separate file, which helps with caching
- `postcss-preset-env <https://github.com/csstools/postcss-preset-env>`__ which handles the pesky details of browser-compatibility,
  similar to babel-preset-env
- `sass-loader <https://github.com/webpack-contrib/sass-loader>`__ which loads my sass
- `optimize-css-assets-plugin <https://github.com/NMFR/optimize-css-assets-webpack-plugin>`__ which runs minifier on extracted files,
  webpack by default does it only on chunks

Full setup can be found on `github <https://github.com/adamcupial/wdl/blob/master/webpack/styles.config.js>`__

Scripts
=======

This one took some time to setup, I wanted to use babel glorious env preset AND write in typescript - needed some fiddling.

- `babel-loader <https://github.com/babel/babel-loader>`__ to transpile my typescript, using env and typescript preset to handle polyfills and compatibility
- `terser-plugin <https://www.npmjs.com/package/terser-webpack-plugin>`__ to minify the code, seeing as uglify does not support newer ecmascript versions
- few plugins to allow some nice features: dynamic import syntax, class properties, object rest spread

Full setup can be found on `github <https://github.com/adamcupial/wdl/blob/master/webpack/scripts.config.js>`__

Assets
======

The funny part here is I setup it ahead of time, being sure I will be using images - I don't ... yet

- plugins to minify basic assets, not used now but I plan to use some images in the future
- imageminGifsicle, imageminMozjpeg, imageminOptipng, imageminSvgo

Full setup can be found on `github <https://github.com/adamcupial/wdl/blob/master/webpack/assets.config.js>`__

Extending
=========

In the future I am considering extending it:
 - `media query splitting <https://github.com/mike-diamond/media-query-splitting-plugin>`__ which would mean further reduction of unused styles, right now the styles here are small enough I don't need it
 - `workbox plugin <https://www.npmjs.com/package/workbox-webpack-plugin>`__ obviously to use PWA features without hassle of writing service worker from scratch

For anyone interested how to setup your own webpack build I would suggest first looking at `this article on medium <https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9>`__ it explains basics of webpack nicely.

Next article will be about the styling of the blog
