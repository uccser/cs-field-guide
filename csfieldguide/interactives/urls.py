"""URL routing for the interactives application."""

from django.conf.urls import url

from . import views
from django.views.generic.base import RedirectView

app_name = "interactives"


urlpatterns = [
    url(
        r"^thumbnail-json/",
        views.thumbnail_json,
        name="thumbnail-json"
    ),
    # eg: /interactives/
    url(
        r"^$",
        views.IndexView.as_view(),
        name="index"
    ),
    # eg: /interactives/iframe/sorting-algorithms/
    url(
        r"^iframe/(?P<interactive_slug>[-\w]+)/$",
        views.interactive_iframe_view,
        name="iframe_interactive"
    ),
    url(
        r"^centered/(?P<interactive_slug>[-\w]+)/$",
        views.interactive_centered_view,
        name="centered_interactive"
    ),
    # eg: /interactives/sorting-algorithms/
    url(
        r"^(?P<interactive_slug>[-\w]+)/$",
        views.interactive_whole_page_view,
        name="interactive"
    ),
    # the redirect for /further-information/interactives.html is in /general/urls.py
    # eg: redirect /interactives/binary-cards/index.html to /interactives/binary-cards/
    url(
        r"^(?P<interactive_slug>[-\w]+)/index.html/$",
        RedirectView.as_view(
            permanent=True,
            pattern_name="interactives:interactive",
            query_string=True
        ),
    ),
    # eg: redirect /interactives/mips-assembler/index.php to /interactives/mips-assembler/
    url(
        r"^(?P<interactive_slug>[-\w]+)/index.php/$",
        RedirectView.as_view(
            permanent=True,
            pattern_name="interactives:interactive",
            query_string=True
        ),
    ),
]
