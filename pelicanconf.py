#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
import sys
sys.path.append('.')
from plugins.jinja_plugins import manifest_asset, tag_present, tags_not_present, aggregate_tags, fetch
from plugins import tagnames, search

PLUGINS = [tagnames, search, 'minify']

AUTHOR = 'Adam Cupial'
SITENAME = 'Webdesign-log.pl'
SITEURL = ''

PATH = 'content'

TIMEZONE = 'Europe/Paris'

DEFAULT_LANG = 'en'
THEME = 'theme'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None
JINJA_FILTERS = {
  'manifest_asset': manifest_asset,
  'tag_present': tag_present,
  'tags_not_present': tags_not_present,
  'aggregate_tags': aggregate_tags,
  'fetch': fetch,
}

DEFAULT_PAGINATION = 9

PAGINATED_TEMPLATES = {
  'index': 9,
  'tag': 9,
  'category': 9,
}


PAGINATION_PATTERNS = (
    (1, '{url}', '{save_as}'),
    (2, '{base_name}/{number}/', '{base_name}/{number}/index.html'),
)

STATIC_EXCLUDES = ['ignore']
PYGMENTS_RST_OPTIONS = {
    'linenos': 'none'
}

MINIFY = {
  'remove_comments': True,
  'remove_all_empty_space': True,
  'reduce_empty_attributes': True,
  'reduce_boolean_attributes': True,
  'remove_optional_attribute_quotes': False
}

TAGLINE = 'WebDesignLog.pl'
DELETE_OUTPUT_DIRECTORY = True
TYPOGRIFY = True

ARTICLE_URL = '{category}/{slug}'
ARTICLE_SAVE_AS = '{category}/{slug}/index.html'

CATEGORY_URL = 'category/{slug}'
CATEGORY_SAVE_AS = 'category/{slug}/index.html'
DEFAULT_CATEGORY = 'varia'

TAG_URL = 'tag/{slug}'
TAG_SAVE_AS = 'tag/{slug}/index.html'

ARCHIVES_URL = 'archive'
ARCHIVES_SAVE_AS = 'archive/index.html'
AUTHORS_SAVE_AS = ''
AUTHOR_SAVE_AS = ''

TAGS_URL = 'tag'
TAGS_SAVE_AS = 'tag/index.html'

DIRECT_TEMPLATES = ['index', 'tags', 'archives', 'search']
SEARCH_SAVE_AS = 'search/index.html'
