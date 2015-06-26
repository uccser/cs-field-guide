"""System Functions Module - CSFG
    -Contains: Helper functions for guide creation
    -Authors: Jordan Griffiths, Jack Morgan
"""

import string

def to_kebab_case(text):
    """Returns the given text as kebab case.
    The text is lower case, has spaces replaced as dashes.
    All punctuation is also removed.
    """
    text = ''.join(letter for letter in text if letter not in set(string.punctuation))
    return text.replace(' ', '-').lower()


def from_kebab_case(text):
    """Returns given kebab case text to plain text.
    Text is camel case, with dashs replaced with spaces
    """
    return text.replace('-', ' ').title()
