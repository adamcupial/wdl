import json
from os.path import join, dirname
from itertools import groupby
import math
import hashlib
from base64 import urlsafe_b64encode as b64encode

STATIC_PATH = join(dirname(__file__), '..', 'theme', 'static')


def manifest_asset(name):
    manifest = join(STATIC_PATH, 'manifest.json')
    parsed = {}

    with open(manifest) as json_file:
        parsed = json.load(json_file)
        return parsed[name]


def tag_present(tagname, tag=None, article=None, category=None):
    if category and category == tagname:
        return True
    elif tag and tag.name == tagname:
        return True
    elif article and tagname == article.category:
        return True
    return False


def tags_not_present(tagnames, tag=None, article=None, category=None):
    return not any(
        [
            tag_present(x, tag, article, category)
            for x in tagnames.split(',')
        ]
    )


def aggregate_tags(articles):
    all_tags = []

    for article in articles:
        all_tags += article.tags
    all_tags.sort(key=lambda x: x.name)

    taglist = []
    for tagname, group in groupby(all_tags, key=lambda x: x.name):
        lst = [x for x in group]
        taglist.append((lst[0], len(lst)))

    taglist.sort(key=lambda x: x[1], reverse=True)
    counts = [y for x, y in taglist]
    min_count = min(counts)
    max_count = max(counts)
    steps = 4
    fin = []

    for tag, count in taglist:
        fin.append((
            tag,
            count,
            int(math.floor(steps - (steps - 1) * math.log(count - min_count + 1)
                           / (math.log(max_count - min_count + 1) or 1)))
        ))

    fin.sort(key=lambda x: x[0].name)

    return fin


def fetch(filepath):
    filepath = filepath.replace('/theme', 'theme/static')
    with open(filepath) as fil:
        src = fil.read()
    return src


def get_asset_sha(name):
    sha = hashlib.sha256()
    filepath = manifest_asset(name)
    filepath = filepath.replace('/theme', 'theme/static')
    with open(filepath, 'rb') as fil:
        sha.update(fil.read())

    return b64encode(sha.digest()).decode()
