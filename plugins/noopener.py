# this python file uses the following encoding utf-8

from bs4 import BeautifulSoup
from pelican import signals


def content_object_init(instance):
    """
    Pelican callback
    """
    settings = instance.settings
    siteurl = settings.get('SITEURL', '')

    soup_doc = BeautifulSoup(instance._content, 'html.parser')

    for anchor in soup_doc(['a']):
        if 'href' not in anchor.attrs:
            continue
        url = anchor['href']

        # local files and other links are not really intresting
        if not url.startswith('http'):
            continue

        # Previous case works also for debugging environment (with SITEURL
        # being empty) This case resolves publish environment with all links
        # starting with http.
        if siteurl and url.startswith(siteurl):
            continue

        anchor['rel'] = 'noopener nofollow'
        anchor['target'] = '_blank'

    instance._content = soup_doc.decode()


def register():
    """
    Part of Pelican API
    """
    signals.content_object_init.connect(content_object_init)
