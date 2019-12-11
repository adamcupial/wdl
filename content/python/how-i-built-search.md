Title: Search
Slug: how-i-built-my-blog-search
Date: 2019-12-12
Tags: blog, tips, python, search
Series: How I built my blog
series_index: 7

How it's possible to have a full text-search on static site? Read on.

<!-- PELICAN_END_SUMMARY -->

## What is searching all about?

Search is a technique of finding the best matching *documents* to given *search criteria*.

Sounds simple, right? Unfortunately it's anything but.

Let's take an uncomplicated example, I want to find every document that contains word **cat** or **cats**.

What it usually means that I want to have a result that:

* has all documents that have words **cat** or **cats** in them
* We don't want results finding **cat**erpilar or **cat**astrophe, just cat
* Results should be ordered by density those terms exist in them, with most frequent at top
* We want results with **cat** in title to be higher then results with **cat** in text, for ridiculus example:
    * title: Cat rescues human, text: all about cat rescuing human
    * title: Baking cookies for dummies, text: my cat just jumped on a cookie tray.

That small requirement - *wanting to find what you are searching for* - means advanced engines need to be used to return relevant results - search indexers and engines.

Those tools work by first sanitizing the documents and preparing the index to search against, thanks to that they return relevant results very quickly.

The following processes / tools are used:

### Stemmer
*Stemming* is the process of reducing inflected or derived words to their base or stem form:

* templating becomes templat
* template becomes templat
* templates becomes templat

When same stemmer is used on documents and on search query it enables search for inflected and derived words.

### Tokenizer
No search engine is operating on actual text, first it processes the document and extracts the actual words from it - using process named tokenizer.
The simplest example would be whitespace tokenizer which just splits words by space.

### Text processors and filters
There are multiple of those, the most commonly used are:

- blacklisted words filter
- stop words filter, stop words like *a*, *an*, *the* are not relevant for search results and can be safely removed.
- special characters remover / sanitizer
- short words filter - usually words that are short (let's say 1 or 2 characters) are not relevant and can be removed.
- synonyms filter, abbreviations filter


## What engine to use

Obviously writing this kind of tools is time consuming and unnecessary - excellent libraries are ready and free to use, few good examples are:

- [Apache Solr](https://lucene.apache.org/solr/) - Lucene engine based indexer, open-sourced and one of best
- [Whoosh](https://whoosh.readthedocs.io/en/latest/intro.html) - Python based indexer, much simpler to use then Solr but much worse at complex tasks
- [Lunr.js](https://lunrjs.com/) - Sorl-like engine written in javascript


I am using lunr, but since I am using it in browser environment I am not creating indexes on the fly, it'd take ages.

Instead I have used [python version of lunr](https://github.com/yeraydiazdiaz/lunr.py) to create an [serialized index](https://github.com/adamcupial/wdl/blob/master/plugins/search.py) during page generation, which I am loading and search against using [simple component](https://github.com/adamcupial/wdl/blob/master/src/scripts/search.ts).

All that was left is to pass the query to the lunr, and display the results.

What this search can do? Let's see:

* Search words by [stem](/search?q=templates)
* Search by words matching from any side [front](/search?q=*log) or [back](/search?q=log*) or even [both](/search?q=*log*)
* Search [just in title](/search?q=title:styling) or [in full text](/search?q=text:styling)
* Boost terms in title over those in text
* Fuzzy search when unclear of the word [link](/search?q=sryling~1)
* Search [without a term](/search?q=styling%20-css) or with [multiple terms](/search?q=styling%20+css) present.

Quite nice for a ready to install package, with just some small tooling.

This is the last article in this series.
