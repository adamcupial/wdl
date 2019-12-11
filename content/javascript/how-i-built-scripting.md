Title: Scripting
Slug: how-i-built-my-blog-scripting
Date: 2019-12-11
Tags: blog, tips, javascript
Series: How I built my blog
series_index: 6

How scripts are organized on page and good practices regarding scripting.

<!-- PELICAN_END_SUMMARY -->

When scripting the page I have just put one requirement: "As little as possible" [^get-away-with],
so the page just have some really basic scripting, for example this particular one loads ~36 KB of Javascript, 22 of which is a GPDR framework, 4 of which is inlined.

Why? Because byte-for-byte javascript is **the most expensive** resource browser loads,
it not only needs to be downloaded and parsed but also compiled and executed!.

You can more easily get away with bloated styles then with bloated javascript, and since web page is pretty much single-threaded, large scripts on page delay, well - everything.

If you want to know more check [this excellent article by Addy Osmani](https://v8.dev/blog/cost-of-javascript-2019).

In short, for page to be performant:

 - load only what you need -> obviously
 - load when it's needed -> don't load footer when user has yet to see header
 - keep bundles small -> to make use of HTTP/2 multiplexing

The page is build around the concepts of 'Widgets' that aim to automatically deliver those.
Each widget on page consists of an html node (or tree) and an attached script and style, e.g. the series box on right:

```html
<section
    data-module="article-box"
    data-lazy="true"
    class="article-box article-box--series"
    >
(...)
</section>
```

as you can see it contains widget name (data-module="article-box") and setting (data-lazy="true").

And the the script side of this coin:

```typescript
import BaseWidget from 'scripts/base-widget';
import './style.scss';

export default class ArticleBoxWidget extends BaseWidget{};
```

which while seemingly doing nothing loads the style for widget, lazily, and only if widget is on page.

I have a [loader running](https://github.com/adamcupial/wdl/blob/master/src/scripts/base.ts#L18) in background that searches for [data-module] and then uses webpack [dynamic-imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports) and [intersection observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

Each widget is separate - moves only within it's own context - loader automatically passes it to widget constructor.

Obviously this kind of mechanism is a big overengineering for this blog, it'd be much more useful for larger codebases, but hey - it was fun to create and it performs beautifully.

I hope you liked this short post, next one in series will be about search.

[^get-away-with]: or "As little I can get away with"
