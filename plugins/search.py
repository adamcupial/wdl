# -*- coding: utf-8 -*-

# Future in this version
from __future__ import unicode_literals

# Python Standard Library
import json
import os
import re
from hashlib import sha1

# Own
from bs4 import BeautifulSoup
from lunr.builder import Builder
from lunr.pipeline import Pipeline
from lunr.stemmer import stemmer
from lunr.trimmer import trimmer
from lunr.stop_word_filter import stop_word_filter
from pelican import signals

def special_chars_remover(token, i=None, tokens=None):
    if re.match(r'^[a-zA-Z]*$', token.string):
        return token

class SearchIndexGenerator(object):

    def __init__(self, context, settings, path, theme, output_path, *null):
        self.output_path = output_path
        self.context = context
        self.siteurl = settings.get('SITEURL')
        self.relative_urls = settings.get('RELATIVE_URLS')
        self.output_path = output_path
        self.json_nodes = []

    def create_node(self, page):
        if getattr(page, 'status', 'published') != 'published':
            return

        iden_str = '{0}{1}'.format(
                page.category.name, page.slug
            ).encode('utf-8')

        iden = sha1(iden_str).hexdigest()

        soup_title = BeautifulSoup(
            page.title.replace('&nbsp;', ' '),
            'html.parser')
        page_title = soup_title\
            .get_text(' ', strip=True)\
            .replace('Ò', '"')\
            .replace('Ó', '"')\
            .replace('Õ', "'")\
            .replace('^', '&#94;')

        soup_text = BeautifulSoup(page.content, 'html.parser')
        page_text = soup_text.get_text(' ', strip=True)\
            .replace('Ò', '"')\
            .replace('Ó', '"')\
            .replace('Õ', "'")\
            .replace('¦', ' ')\
            .replace('^', '&#94;')
        page_text = ' '.join(page_text.split())
        soup_summary = BeautifulSoup(page.summary, 'html.parser')
        page_summary = soup_summary.get_text(' ', strip=True)

        page_url = '.' if self.relative_urls else self.siteurl + '/' + page.url

        if hasattr(page, 'series'):
            page_title = '{0}: {1}'.format(page.series['name'], page_title)

        return {
            'id': iden,
            'title': page_title,
            'text': page_text,
            'url': page_url,
            'summary': page_summary,
        }

    def generate_output(self, writer):
        pages = [self.create_node(x) for x in self.context['articles']]
        path = os.path.join(self.output_path, 'search_index.json')

        pages_to_index = [{
            'id': x['id'],
            'title': x['title'],
            'text': x['text']
        } for x in pages]

        additional_data = {
            x['id']: {
                'url': x['url'],
                'title': x['title'],
                'summary': x['summary'],
            } for x in pages
        }

        Pipeline.register_function(special_chars_remover, 'specialCharsRemover')

        bldr = Builder()
        bldr.pipeline.add(trimmer, stop_word_filter, stemmer, special_chars_remover)
        bldr.search_pipeline.add(stemmer)
        bldr.ref('id')
        bldr.field('title', 10)
        bldr.field('text')

        for page in pages_to_index:
            bldr.add(page)
        idx = bldr.build().serialize()

        with open(path, 'w') as idxfile:
            json.dump({
                'index': idx,
                'data': additional_data,
            }, idxfile)


def get_generators(generators):
    return SearchIndexGenerator


def register():
    signals.get_generators.connect(get_generators)
