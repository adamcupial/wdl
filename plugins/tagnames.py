from pelican import signals

def tagnames(obj):
  obj.tagnames = [x.name for x in obj.tags]

def register():
    signals.content_object_init.connect(tagnames)
