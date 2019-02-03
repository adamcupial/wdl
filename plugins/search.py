# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from bs4 import BeautifulSoup
from pelican import signals
from hashlib import sha1
from lunr import lunr
import json
import os


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

        iden_str = '{0}{1}'.format(page.category.name, page.slug).encode('utf-8')

        iden = sha1(iden_str).hexdigest()

        soup_title = BeautifulSoup(
            page.title.replace('&nbsp;', ' '),
            'html.parser'
        )
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
        idx = lunr(
            ref='id',
            fields=[
                {
                    'field_name': 'title',
                    'boost': 10,
                },
                'text'
            ],
            documents=pages_to_index
        ).serialize()
        with open(path, 'w') as idxfile:
            json.dump({
                'index': idx,
                'data': additional_data,
            }, idxfile)


def get_generators(generators):
    return SearchIndexGenerator


def register():
    signals.get_generators.connect(get_generators)
