Styling
##########

:date: 2019-06-20
:tags: blog, tips, css, design
:series: How I built my blog
:series_index: 5

The episode I dread, I am detailing here my design and style process as well what technologies are used and why.

.. PELICAN_END_SUMMARY

First the basic requirements / assumptions I had when deciding how the page would look:
 - should be performant and that meant lightweight, which means - simple, clean design [#clean-is-boring]_
 - should be responsive, mobile first and have a high usability
 - easy to maintain
 - should be bleeding edge, technologically bees-knees and css-grids
 - should be not ugly [#not-ugly]_

Pure css - you can keep it
--------------------------

CSS has always been a bit of ugly child of webdevelopment, hard to maintain with different methodologies
that have different thoughts how it should be done, each one 'the best' (OOCSS, atomic, BEM, modular css).

Despite it's recent upgrades (css variables, css-grid, flexbox) it's still very much linear and infinitely buggable.

If not pure css we're left with two choices: pre- or postprocessors, or combinations thereof.

Postprocessors are a bit too fragmented for me, so I have been using them just to provide some compatibility and polish to the style (`postcss autoprefixer <https://github.com/postcss/autoprefixer>`__).
For preprocessor we have 3 to choose from: sass, stylus, less - they mostly do the same thing with different syntax.

I like sass, have been using it for years, it's comprehensive, lots of features and easy to use.

As all preprocessors it has it's drawbacks: takes more time (has to be built) and it's easy to create a long selector chains.
To prevent long selector chains it's best to use BEM, but don't go overly crazy on it - if you have the same button in 20 places just give it a class and style on it, instead of being purist and renaming (re-classing) it for each module, minifiers won't be able to catch them all.

Speaking of minifiers - `don't extend in sass, ever <https://www.sitepoint.com/avoid-sass-extend/>`__.
On paper it looks great, common properties are grouped under their selectors and rest is separate.
In practice - bigger file sizes (because minifiers are not as efficient, as well as gzip) and strange behaviour when extending inside the mixin or media query.

My SASS setup is pretty standard, have a separate directory for mixins, one main file for variables and separate one for colors.
Each page has it's own style (90% of those just import the default) and each widget have it's own styles. Since widgets are lazy loaded (all of them) the styles are just loaded on the fly, based on scroll position (webpack dynamic imports), this way unused scripts ratio is kept nice and low.
In future I may consider separate styles for different breakpoints, but now it's not worth it.

Break me a point
----------------

Funny thing, we always say that we do RWD (Responsive Web Design), but are using breakpoint which is a trademark of adaptive web design, semantics [#responsive]_

Using latest technology it is possible to create truly responsive design (grid-repeat, flexbox), but it's very hard. It's much easier to set some sensible number of breakpoints (usually mobile, tablet and desktop) and modify the layouts in those.

Of course then we are asking browser to load and parse style for several versions of the page at once, which is not ideal. Thankfully there're `ways to fix those <https://github.com/SassNinja/media-query-plugin>`__.

Back to breakpoints, I use them on the website - as little as I can. I have designed the website to have mostly layout changes on breakpoint so I can keep the overhead reasonably low.  To help with the pain of maintaing them I use a sass library `include media <https://include-media.com/>`__, nice little library to make the media queries readable.

Paint me a picture
------------------

First version of the site was text only - I thought it would be more performant and 3g friendly, it was - and looked like something out of 90's.
I have started with icons, sparingly. I have used an excellent `Font Awesome <https://fontawesome.com/>`__ font set, funny enough as an SVG version not as font [#svg-fonts]_

In first iteration I have used their js library to automatically replace the placeholders with inline SVG, it worked but was adding the overhead that I don't need.
I have since replaced the script with inlined SVGs, additionally replacing logo with SVG, only to find out that schema.org requires png. I have both now - it works.

As for the post images, there're several nice (free!) options I've toyed with:
 - `canva <https://www.canva.com/>`__ dead easy to use, didn't like the output quality and lack of 'free only' filters
 - `word cloud <https://amueller.github.io/word_cloud/>`__ generate an image based on the words in text, too much hassle to setup but nice idea.
 - `crello <https://crello.com>`__ similar to canva, but a tad easier to use, like the example designs better as well. All the images here are created with crello.

Next steps were relatively easy, I've prepared an image resizer / reformatter / optimize `script <https://github.com/adamcupial/wdl/blob/master/generate-images.js>`__ that resizes the pictures and creates a webp version.

Then it was just a matter of putting them in `picture` tag with appropriate attributes (srcset, sizes) and connecting `lazy-loader <https://github.com/adamcupial/wdl/blob/c242d5c1e6560009fb3d30b3b6d6a496db0ae9e0/src/scripts/base.ts#L51>`__ to lessen impact on performance.

Bring me a font
---------------

Ah typography, terra incognita. I know how to use it, I just can't design it - have heard the terms vertical-rhytm and still can't use it for any good effect.

I am using two fonts from google-fonts: Open Sans (for everything) and Fira Mono (for codeblocks), google-fonts is convenient and fast way to deliver fonts, they are serving a stylesheet that has the best font for given browser, as well as preventing some grief of creating your own font face:
 - some fonts a gzippable, some not
 - web servers are notorious of having a bad defaults for font serving (woff2, nginx...)
 - olden browsers support different formats
 - font file names differ based on the system and you always want to use local font first (e.g. `Roboto <https://fonts.googleapis.com/css?family=Roboto&display=swap>`__)

First iteration I was loading them using `typekit webfont-loader <https://github.com/typekit/webfontloader>`__ only on faster networks, this prevents fonts being a blocking resource, and allows the site to load faster.
The downside of it is the visible flicker when font loads, around Google IO's (may) google has finally added support to display: swap to google fonts. I was so excited - right away I have created a `pull request for typekit <https://github.com/typekit/webfontloader/pull/415>`__ to pass that option, as yet to no avail - library doesn't look maintained anymore.

Then it dawned on me that I don't need most of what webfontloader does and have written my `quick loader <https://github.com/adamcupial/wdl/blob/master/src/scripts/font-load.ts>`__, it was better but still the font flickered.
Finally I have just put the link to googlefonts in the body (it's non-blocking because display: swap) for Open Sans and just load the Fira dynamically.

As a final note - very nice way of loading styles in modern browsers, `found here <https://www.filamentgroup.com/lab/async-css.html#a-modern-approach>`__.

.. code-block:: html

    <link
         rel="preload"
         href="mystyles.css"
         as="style"
         onload="this.rel='stylesheet'"
    >

It makes the style non-blocking (it's a preload link first, page is not waiting for it), but at the same time it starts loading it early.
Downside is it doesn't work w/o javascript (you can use noscript then)

Make me usable and accessible
-----------------------------

As mentioned at the beginning I wanted the site to be nice and usable / accesible.
To that effect everything is nice and big and easy to click, or so I thought.

Lately I went through the hassle of getting the 100 in lighthouse accessibility / best practices scores, and had to change whole color schema for the site.
Good thing I had the separate colors.scss file...

Mine thing I was loosing points were:
 - too small clickable elements, good practice is to have them at least 40x40, mine was a tad smaller - all fixed now.
 - color contrast background / text was not enough, I had a nice orange'ish accent color which was just a hair too light for good contrast, since making it darker just made it brown I went with blue instead. Google chrome developers tools has nice color contrast tool now, so I could check the contast in real time.
 - lack of a text on several icons (search...), too small links in footer. I have removed the links from footer (they are in header anyway) and put aria-labels where needed.

 That's all I can say about the style now, Next one will be about the scripts I use on page - hopefully with smaller time gap then these one.

.. [#clean-is-boring] yes, clean design is boring. Especially since it's been overused in last few years (material design..),
                      but still it has it's uses.
.. [#not-ugly] other people may say they want something beatiful, not ugly is a step up from my usual designs
.. [#responsive] In early days all websites were responive - 100% width and one column, reflowing as needed. Then media queries came along and we have started creating adaptive designs (different layout per media query) and calling them responsive, confusing.
.. [#svg-fonts] Yes, I know there are SVG fonts. I have even seen one used - 10 years ago. Once.
