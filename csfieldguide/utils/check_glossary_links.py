"""Module for checking glossary links found within Markdown conversions."""

from django.core.exceptions import ObjectDoesNotExist
from utils.errors.CouldNotFindGlossaryTermError import CouldNotFindGlossaryTermError
from chapters.models import GlossaryTerm


def check_converter_glossary_links(glossary_links, md_file_path):
    """Process glossary links found by Markdown converter.

    Args:
        glossary_links: Dictionary of glossary links (dict).
    """
    for slug in glossary_links.keys():
        try:
            GlossaryTerm.objects.get(slug=slug)
        except ObjectDoesNotExist:
            raise CouldNotFindGlossaryTermError(slug, md_file_path)
