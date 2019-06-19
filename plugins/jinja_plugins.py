# this python file uses the following encoding utf-8

# Python Standard Library
import hashlib
import json
import math
from base64 import urlsafe_b64encode as b64encode
from itertools import chain, groupby
from os.path import dirname, join


STATIC_PATH = join(dirname(__file__), '..', 'theme', 'static')
MANIFEST_PATH = join(STATIC_PATH, 'manifest.json')


def manifest_asset(name):
    """Get full asset name using it's simple (short) name.

        Args:
          name (str): asset simple name

        Returns:
          str: full name of asset
    """

    with open(MANIFEST_PATH) as json_file:
        loaded = json.load(json_file)
        if name in loaded.keys():
            return loaded[name]['src']
        return name


def tag_present(tagname, tag=None, article=None, category=None):
    """Checks if tag is present in current context.

        Args:
            tagname (str): name of the tag
            tag (object, optional): pelican Tag object
            article (object, optional): pelican Article object
            category (str, optional): category name

        Returns:
            bool: whether tag is present in current context
    """

    if category and category == tagname:
        return True
    elif tag and tag.name == tagname:
        return True
    elif article and tagname == article.category:
        return True
    else:
        return False


def tags_not_present(tagnames, tag=None, article=None, category=None):
    """Checks if tag is NOT present in current context.

        Args:
            tagname (str): name of the tag
            tag (:obj:`Tag`, optional): pelican Tag object
            article (:obj:`Article`, optional): pelican Article object
            category (str, optional): category name

        Returns:
            bool: whether tag is NOT present in current context
    """

    return not any(
        [
            tag_present(x, tag, article, category)
            for x in tagnames.split(',')
        ]
    )


def get_tag_names(tags):
    """Gets tag names from list of Tag objects.

        Args:
            tags (:obj:`list` of :obj:Tag): list of pelican Tag object
        Returns:
            :obj:`list` of :obj:`str`: list of tag names
    """

    return [k.name for k, v in tags]


def aggregate_tags(articles):
    all_tags = list(chain.from_iterable([x.tags for x in articles]))
    all_tags.sort(key=lambda x: x.name)

    taglist = []
    for tagname, group in groupby(all_tags, key=lambda x: x.name):
        lst = [x for x in group]
        taglist.append((lst[0], len(lst)))

    taglist.sort(key=lambda x: x[1], reverse=True)
    counts = [y for x, y in taglist]
    min_count, max_count = min(counts), max(counts)
    fin = []

    for tag, count in taglist:
        fin.append((
            tag,
            count,
            int(math.floor(
                    math.log(count - min_count + 1) /
                    (math.log(max_count - min_count + 1) or 1)
            ))
        ))

    fin.sort(key=lambda x: x[0].name)

    return fin


def fetch(filepath):
    filepath = join(STATIC_PATH, filepath)
    with open(filepath) as fil:
        return fil.read()


def get_asset_sha(name):
    with open(MANIFEST_PATH) as json_file:
        return json.load(json_file)[name]['integrity']
