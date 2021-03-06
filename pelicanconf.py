#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
import sys
sys.path.append('.')
from plugins.jinja_plugins import manifest_asset, tag_present, tags_not_present, aggregate_tags, fetch, get_asset_sha, get_tag_names, get_article_image
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
STATIC_URL = '/theme'
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
  'get_article_image': get_article_image,
}

DEFAULT_PAGINATION = 8

PAGINATED_TEMPLATES = {
  'index': 8,
  'tag': 8,
  'category': 8,
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
PRIVACY_POLICY_URL = 'https://www.websitepolicies.com/policies/view/TNf3ZbcR'
COOKIE_POLICY_URL = 'https://www.websitepolicies.com/policies/view/9z3EcX5l'
TERMS_AND_CONDITIONS_URL = 'https://www.websitepolicies.com/policies/view/VCfpUmy4'

DIRECT_TEMPLATES = ['index', 'search', 'headers', 'not_found']
SEARCH_SAVE_AS = 'search/index.html'
NOT_FOUND_SAVE_AS = '404.html'
MINIFY = {
  'remove_comments': False,
  'remove_all_empty_space': True,
  'remove_optional_attribute_quotes': False
}

MARKDOWN = {
    'extension_configs': {
        'markdown.extensions.codehilite': {'css_class': 'highlight'},
        'markdown.extensions.extra': {},
        'markdown.extensions.meta': {},
    },
    'output_format': 'html5',
}

CSP_HEADERS_DICT = {
    "report-uri": [
        "https://webdesignlogpl.report-uri.com/r/d/csp/wizard",
    ],
    "default-src": [
        "self",
    ],
    "script-src": [
        "self",
        "https://webdesign-log.pl",
        "unsafe-inline",
        "https://wpcc.io",
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com",
        "https://storage.googleapis.com",
    ],
    "connect-src": [
        "self",
        "data:",
        "https://wpcc.io",
        "https://webdesign-log.pl",
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com",
        "https://storage.googleapis.com",
        "https://fonts.googleapis.com",
        "https://fonts.gstatic.com",
    ],
    "img-src": [
        "self",
        "https://webdesign-log.pl",
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com",
        "data:",
    ],
    "style-src": [
        "self",
        "unsafe-inline",
        "https://wpcc.io",
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
    ],
    # "require-trusted-types-for": [
    #     "script",
    # ],
}

CSP_HEADERS = []
for key, arr in CSP_HEADERS_DICT.items():
    vals = [key] + [x if x.startswith('http') or x.endswith(':') else "'{0}'".format(x) for x in arr]
    CSP_HEADERS.append(' '.join(vals))
CSP_HEADERS = '; '.join(CSP_HEADERS)

IMAGE_SIZES = [
    [272, 136],
    [346, 173],
    [522, 261],
    [692, 346],
    [1044, 522],
]

IMAGE_TYPES = [
    ['webp', 'image/webp'],
    ['jpg', 'image/jpeg'],
]
