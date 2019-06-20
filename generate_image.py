#!/usr/bin/env python
import os

from os import path
from wordcloud import WordCloud

d = path.dirname(__file__) if "__file__" in locals() else os.getcwd()

# Read the whole text.
text = 'Aria HTML CSS blog'

# Generate a word cloud image
wordcloud = WordCloud().generate(text)

# Display the generated image:
image = wordcloud.to_image()
image.show()
