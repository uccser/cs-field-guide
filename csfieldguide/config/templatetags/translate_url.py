"""Module for the custom translate_url template tag."""

from django.template import Library
from django.urls import resolve, reverse
from django.utils.translation import activate, get_language
from django.template import TemplateSyntaxError
from django.urls.exceptions import Resolver404

from utils.language_utils import get_available_languages

INVALID_ATTRIBUTE_MESSAGE = "The 'translate_url' tag was given an invalid language code '{}'."
INVALID_PATH_MESSAGE = "The 'translate_url' tag could not resolve the current url {}."


register = Library()


@register.simple_tag(takes_context=True)
def translate_url(context, lang, *args, **kwargs):
    """Get active page's url for a specified language.

    Usage: {% translate_url 'en' %}
    """
    if lang not in get_available_languages():
        raise TemplateSyntaxError(INVALID_ATTRIBUTE_MESSAGE.format(lang))

    url = context["request"].path
    try:
        url_parts = resolve(url)
        cur_language = get_language()
        activate(lang)
        url = reverse(url_parts.view_name, kwargs=url_parts.kwargs)
        activate(cur_language)
    except Resolver404:
        url = reverse("general:index")

    return str(url)
