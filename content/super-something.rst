Super Post About Nothing
########################

:date: 2018-12-01
:tags: python, tips, best practices

A nisi aliquet commodo. Suspendisse massa lorem, dignissim at, vehicula et,
ornare non, libero. Donec molestie, velit quis dictum scelerisque, est lectus
hendrerit lorem, eget dignissim orci nisl sit amet massa. Etiam volutpat
lobortis eros. Nunc ac tellus in sapien molestie rhoncus. Pellentesque nisl.
Praesent venenatis blandit velit. Fusce rutrum. Cum sociis natoque penatibus et
magnis dis parturient montes, `nascetur </dasdasd>`_ ridiculus mus. Pellentesque vitae erat.
Vivamus porttitor cursus lacus. Pellentesque tellus. Nunc aliquam interdum
felis. Nulla imperdiet leo. Mauris hendrerit, sem at mollis pharetra, leo
sapien pretium elit, a faucibus sapien dolor vel pede. Vestibulum et enim ut
nulla sollicitudin adipiscing.


`a root-relative link to markdown-article <|filename|/cat1/markdown-article.md>`_
`a file-relative link to markdown-article <|filename|cat1/markdown-article.md>`_

Testing sourcecode directive
----------------------------

.. sourcecode:: python

    formatter = self.options and VARIANTS[self.options.keys()[0]]


Testing another case
--------------------

Dictum. Phasellus rhoncus est id turpis. Vestibulum in elit at odio
pellentesque volutpat. Nam nec tortor. Suspendisse porttitor consequat nulla.
Morbi suscipit tincidunt nisi. Sed laoreet, mauris et tincidunt facilisis, est
nisi pellentesque ligula, sit amet convallis neque dolor at sapien. Aenean
viverra justo ac sem.

Pellentesque at dolor non lectus sagittis semper. Donec quis mi. Duis eget
pede. Phasellus arcu tellus, ultricies id, consequat id, lobortis nec, diam.
Suspendisse sed nunc. Pellentesque id magna. Morbi interdum quam at est.
Maecenas eleifend mi in urna. Praesent et lectus ac nibh luctus viverra. In vel
dolor sed nibh sollicitudin tincidunt. Ut consequat nisi.


.. sourcecode:: python

    formatter = self.options and VARIANTS[self.options.keys()[0]]


Lovely.

Testing more sourcecode directives
----------------------------------

.. sourcecode:: python
    :anchorlinenos:
    :hl_lines: 10,11,12
    :linespans: foo
    :nobackground:

    def run(self):
        self.assert_has_content()
        try:
            lexer = get_lexer_by_name(self.arguments[0])
        except ValueError:
            # no lexer found - use the text one instead of an exception
            lexer = TextLexer()

        if ('linenos' in self.options and
                self.options['linenos'] not in ('table', 'inline')):
            self.options['linenos'] = 'table'

        for flag in ('nowrap', 'nobackground', 'anchorlinenos'):
            if flag in self.options:
                self.options[flag] = True

        # noclasses should already default to False, but just in case...
        formatter = HtmlFormatter(noclasses=False, **self.options)
        parsed = highlight('\n'.join(self.content), lexer, formatter)
        return [nodes.raw('', parsed, format='html')]


Lovely.

Testing even more sourcecode directives
---------------------------------------

.. sourcecode:: python

    formatter = self.options and VARIANTS[self.options.keys()[0]]


Lovely.

Testing overriding config defaults
----------------------------------

Even if the default is line numbers, we can override it here

.. sourcecode:: python

    formatter = self.options and VARIANTS[self.options.keys()[0]]


Lovely.

