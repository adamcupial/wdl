Build process
#############

:date: 2019-02-04
:tags: blog, tips, javascript, webpack
:series: How I built my blog
:series_index: 3

In this episode I explain how I setup my build process


.. PELICAN_END_SUMMARY

I wanted the following from my build process:

- minification and obfuscation
- transpiling, both for scripts (typescript) and styles (sass)
- bundling
- image optimization
- removing unused code
- lazy loading of styles and scripts

In short - I went with `webpack <https://webpack.js.org/>`__, which comes bundled with half of those things and plugins to handle the rest.

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

Main build
==========

- `glob-all <https://www.npmjs.com/package/glob-all>`__ to collect all entrypoints
- `manifest-plugin <https://github.com/danethurber/webpack-manifest-plugin>`__ to generate manifest so I can have cache-friendly filenames
- `webpack-notifier <https://www.npmjs.com/package/webpack-notifier>`__ so I get notice when build finishes - saves me from refreshing the page too much
- `webpack-merge <https://github.com/survivejs/webpack-merge>`__ so I can keep my webpack configs separated

Styles build
============
Few highlights from the setup:

- based around `mini-css-extract-plugin <https://github.com/webpack-contrib/mini-css-extract-plugin>`__ which allows me
  to have my styles as separate file, which helps with caching
- `postcss-preset-env <https://github.com/csstools/postcss-preset-env>`__ which handles the pesky details of browser-compatibility,
  similar to babel-preset-env
- `sass-loader <https://github.com/webpack-contrib/sass-loader>`__ which loads my sass
- `optimize-css-assets-plugin <https://github.com/NMFR/optimize-css-assets-webpack-plugin>`__ which runs minifier on extracted files,
  webpack by default does it only on chunks

Scripts build
=============

- `babel-loader <https://github.com/babel/babel-loader>`__ to transpile my typescript, using env and typescript preset to handle polyfills and compatibility
- `terser-plugin <https://www.npmjs.com/package/terser-webpack-plugin>`__ to minify the code, seeing as uglify does not support newer ecmascript versions
