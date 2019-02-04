Choosing right tools
####################

:date: 2019-02-03
:tags: blog, tips, python, pelican, static site generator
:series: How I built my blog
:series_index: 2

In this episode I explain how I have chosen the technology for my blog - which of the myriad options suited me best and why.


.. PELICAN_END_SUMMARY

We all know that website consist of HTML, CSS and Javascript. That's the only output that can be on websites (unless you are good at assembly).
But what should be used on the backend? Do you even need a backend?

As it happens - sometimes you can get away with no backend at all.

If you remember from my `previous post <{filename}/varia/the-beginning.rst>`__ I wanted a simple to use and to create website with minimum amount of fuss and moderate number of features, typical to blog. That was shouting to me *Static Site*.

For those unfamiliar - static site means you create a content and then run script which outputs the HTML and static files ready for upload to your hosting, no backend required at all.

The page is delivered exactly as stored, with little-to-no dynamic content possible.

Short list of pros and cons I went through:

Pros
````
- easy to host, can be done even on github pages
- no security vulnerabilities, nothing to attack but hosting
- plethora of ready solutions to choose from
- can be chock-full of frontend goodies
- no backend performance issues
- no database, migrations and library-version update problems
- cheap
- can write content in any editor (yay - vim)

Cons
````
- how would I provide search?
- no dynamic content unless purely on frontend
- would need to leverage 3rd party services for some features
- no dynamic headers, dynamic redirects, form processing, mail sending etc.
- wouldn't create a 99'th version of one-perfect-cms [#one-perfect-cms]_


Since my list of pros' outweighted my list of cons by a nice margin, now all I had to do was:

Choose static site generator
````````````````````````````

There was of course an option of creating my own, but I have left it as a last resort.

Onward with research, started obviously with google search [#programmer-essential-skill]_, having found a staggering amount of options I went with tried-and-true: find a `list <https://www.staticgen.com/>`__ and try the most popular ones.

I have filtered-out any generators that create an (React, Angular, Vue) apps, as I have strong opinion what is not a web app (e.g. blog) - in the future I may even write about it.

Jekyll
------

First one I have tried was a ruby staple: `Jekyll <https://jekyllrb.com/>`__.

It started nice - very good documentation, easy start process (4 step to working website).
I was delighted with front matter, custom variables and big community. Data files would even enable me some more dynamic content or at least easy management of some lists - good feature.

Then I hit a first snag - meh template system, not slot based as I am used to, but more linear one that I am not fond very much.

Another problem was the language Jekyll is written in - ruby, I am not overly familiar with it [#my-skills]_ and trying to create even a simple plugin was a chore.

Having decided to check other options I moved on.


Hugo
----

Wow, that's fast! Written in GO it's page/content generation is so fast it's unreal.

Nice, extensible, can do anything you want. Asset management, tag management, style compilation - just check the `docs <https://gohugo.io/documentation/>`__

For my simple case it's overly complex as well as written in unfamiliar language.

Moving on


Hexo
----

At least some familiar language, nice `documentation <https://hexo.io/docs/themes>`__ too.

A bit opinionated, uses moment and lodash to generate. Not so easy as jekyll, not so powerful as hugo.

Looks a bit more like generic then custom-build solution, you can easily get lost in plugins - some of them doing exactly the same things, but that's a bit of node/npm sickness.

Last try!

Pelican
-------

Which became my choice, why?

- written in python, plugins in python as well - environment I am most familiar with.
- uses excellent `Jinja2 <http://jinja.pocoo.org/docs/2.10/>`__ template engine, in my opinion one of best if not the best there is
- easy to start, easy to extend, not overly complicated
- can create content in RST, which I like
- some simple plugins bundled in
- theme is entirely up to you, you can setup it in any structure you want

Of course that's my reasons for choosing the generator - you may have different requirements or different background so some of the options above may suit your situation better.I suggest try a few.

Next on - build process


.. [#one-perfect-cms] Apparently a rite of passage, every programmer will try to create at least one game (usually RPG) and every webdeveloper will create at least one perfect CMS, for him that is - noone else will be using them unless forced.

.. [#programmer-essential-skill] There's a theory that programmers are people who have better google-search skills then rest of the population. It has a grain of truth in it.

.. [#my-skills] I am a python/php/javascript programmer, I dislike block-with-end languages and I dislike ruby's syntax.
