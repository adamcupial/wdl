#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
import sys
sys.path.append('.')
from plugins.jinja_plugins import manifest_asset, tag_present, tags_not_present, aggregate_tags, fetch, get_asset_sha, get_tag_names
from urllib.parse import urljoin

PLUGIN_PATHS = ['./plugins', './pelican-plugins']
PLUGINS = [
    'tagnames',
    'search',
    'sitemap',
    'series',
    'summary',
    'share_post',
    'noopener',
]

AUTHOR = 'Adam Cupial'
SITENAME = 'Webdesign-log.pl'
SITEURL = 'http://127.0.0.1:8000'
SITE_LOGO = urljoin(SITEURL, '/theme/images/logo.png')
SITE_SUMMARY = '''
For developers by (web) developer - a list of posts about the everyday struggles of web-dev and programmer in general, Included highly opinionated tips, tricks and advices.
'''

JINJA_ENVIRONMENT = {'trim_blocks': True, 'lstrip_blocks': True}
SITEMAP = {
    'format': 'xml',
}

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
  'get_asset_sha': get_asset_sha,
  'get_tag_names': get_tag_names,
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


# disable this ones

AUTHORS_SAVE_AS = ''
AUTHOR_SAVE_AS = ''
TAGS_SAVE_AS = ''
ARCHIVES_SAVE_AS = ''
HEADERS_SAVE_AS = '_headers'


DIRECT_TEMPLATES = ['index', 'search', 'headers']
SEARCH_SAVE_AS = 'search/index.html'
MINIFY = {
  'remove_comments': False,
  'remove_all_empty_space': True,
  'remove_optional_attribute_quotes': False
}

CSP_HEADERS_DICT = {
    "default-src": [
        "none"
    ],
    "script-src": [
        "self",
        "unsafe-inline",
        "https://*.consensu.org",
        "https://unpkg.com",
        "https://www.googletagmanager.com",
    ],
    "connect-src": [
        "self",
        "https://*.consensu.org",
    ],
    "img-src": [
        "self",
        "https://webdesign-log.pl",
        "data:",
    ],
    "style-src": [
        "self",
        "unsafe-inline",
        "https://fonts.googleapis.com",
    ],
    "font-src": [
        "https://fonts.gstatic.com",
    ],
    "frame-ancestors": [
        "none",
    ],
    "base-uri": [
        "none",
    ],
    "form-action": [
        "self",
    ],
    "manifest-src": [
        "self",
    ],
    "frame-src": [
        "self",
        "https://*.consensu.org",
    ],
}

CSP_HEADERS = []
for key, arr in CSP_HEADERS_DICT.items():
    vals = [key] + [x if x.startswith('http') or x.endswith(':') else "'{0}'".format(x) for x in arr]
    CSP_HEADERS.append(' '.join(vals))
CSP_HEADERS = '; '.join(CSP_HEADERS)
