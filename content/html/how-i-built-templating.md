Title: Templating
Date: 2019-02-18
Tags: blog, tips, metadata, seo
Series: How I built my blog
series_index: 4

Basic html structure, useful metatags and tools I use to build this blog.

<!-- PELICAN_END_SUMMARY -->

Nothing fancy here just basic good semantic HTML 5, few things that may be of interest - not because they are fancy but because they are oft overlooked.

## Semantic ~= Accessible

In olden times [^olden-times] the name of game was [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) which has been long
overtaken by [semantic elements](https://www.w3schools.com/html/html5_semantic_elements.asp) in HTML5 ... mostly.

While all semantic elements have an implied ARIA role (landmark), it is still valuable to add those to elements that do not have their specialized tags (carousel, collapsible elements etc come to mind).

There is really no excuse not to use semantic elements:

* they have clear meaning, making it easier to understand the HTML - screen readers, read modes etc.
* it is no more difficult to use then divs
* typed form elements (email, number, search inputs) come with added benefits - free validation and fancy [^form-fanciness] widgets on mobile
* we got SEO brownie points for this

and for a bit of extra credit we may as well make the page a tad more accessible, right?

While most of the situations we can get by just with semantic HTML, I have found aria-label useful when I have to cheat - due to my design decisions I couldn't add text to search icon, aria-label saved my bacon here.

## Keyboard navigation

Most of people who need accessibility features do not use mouse, it is important to provide a nice navigation for those:

* semantic HTML helps here - main, header, nav are ARIA landmarks and can be jumped to
* do not remove the outline styles from focused elements, those visual hints are a must with keyboard navigation
* by default links on page are navigable in HTML order, you can modify the behaviour by using [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) attribute:
    * give **tabindex="-1"** to elements that should be skipped: minor elements that are not part of main content, additional logo's, second links to articles (readmores [^readmores]) can be safely excluded from the tab-order
    * give **tabindex="0"** to elements that are normally not focusable, but should be - buttons, especially the nice span ones
    * give **tabindex="1"** to elements that should be focused first - modal close buttons
* avoid strange HTML order, if something is visually on top of the page it should be the same in HTML.

## Alternate text and title

Alt attributes for images are mandatory! [^just-a-reminder] it should of course describe the image if and only if the image has some information on it.
If the image is just for decoration the proper alt content is empty string (alt=""), if the image is inside a link it should describe it's destination as well.

Title attributes are a good way to convey additional information, gives seo brownie points too. One necessary semantic item that has to have them is the abbr tag.

## Meta me

Metatags, are the tags that describe the content: categorize it (is it a person bio, or is it a recipe? Maybe it's an event invitiation?), provide additional info that may or not be useful (publication time, update time, which image should be considered main, what's the full url for the content, who's the author and what's his webpage etc.).
Basically they are used by any automatic processes to categorize / display the page properly, useful for the additional SEO brownie points they are giving, the most important tags to be aware of:

* [open graph tags](http://ogp.me/) are used by facebook and twitter crawlers, mostly when someone links to that page - it allows for customization and display the link properly they are put in the head of page as meta tags with names starting from `og`.
* [schema.org](https://schema.org/) is mostly used by search crawlers, e.g. google (see: [search gallery](https://developers.google.com/search/docs/guides/search-gallery)) and provide additional information, they can either be inlined in html-tags as attributes or provided in a separate script tag (jsod-ld)
* canonical url tag - should always be present, if by some reason there're multiple urls pointing at the same content all search crawlers look for canonical to group it under.


[^olden-times]: few years ago, given web technology expansion rate it might as well be middle-ages
[^form-fanciness]: I am very happy when mobile browser autocompletes my email or provides me keyboard with *@* sign on first page, may be a character flaw
[^readmores]: Also called 'read more about article title', subspecies of alt="picture"
[^just-a-reminder]: You do validate your HTML, right ... right?

