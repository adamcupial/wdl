import json
from os.path import join, dirname

STATIC_PATH = join(dirname(__file__), '..', 'theme', 'static')

def manifest_asset(name, mode):
  manifest = join(STATIC_PATH, 'manifest-{0}.json'.format(mode))
  parsed = {}

  with open(manifest) as json_file:
    parsed = json.load(json_file)
  return parsed[name]
