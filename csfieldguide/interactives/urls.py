"""URL routing for the interactives application."""

from django.urls import path, reverse_lazy
from django.views.generic.base import RedirectView
from . import views

app_name = "interactives"
urlpatterns = [
    # eg: /interactives/
    path(
        "",
        views.IndexView.as_view(),
        name="index"
    ),
    # Redirects due to interactive name change
    path(
        "cfg-equation-builder/",
        views.redirect_to_cfg_parsing_challenge,
    ),
    path(
        "trainsylvania-blank/",
        views.redirect_to_trainsylvania_map_blank,
    ),
    path(
        "trainsylvania-complete/",
        views.redirect_to_trainsylvania_map_complete,
    ),
    path(
        "thumbnail-json/",
        views.thumbnail_json,
        name="thumbnail-json"
    ),
    # eg: /interactives/iframe/sorting-algorithms/
    path(
        "iframe/<interactive_slug>/",
        views.interactive_iframe_view,
        name="iframe_interactive"
    ),
    path(
        "centered/<interactive_slug>/",
        views.interactive_centered_view,
        name="centered_interactive"
    ),
    # eg: /interactives/sorting-algorithms/
    path(
        "<interactive_slug>/",
        views.interactive_whole_page_view,
        name="interactive"
    ),
    # the redirect for /further-information/interactives.html is in /general/urls.py
    # eg: redirect /interactives/binary-cards/index.html to /interactives/binary-cards/
    path(
        "<interactive_slug>/index.html/",
        RedirectView.as_view(
            permanent=True,
            pattern_name="interactives:interactive",
            query_string=True
        ),
    ),
    # eg: redirect /interactives/mips-assembler/index.php to /interactives/mips-assembler/
    path(
        "<interactive_slug>/index.php/",
        RedirectView.as_view(
            permanent=True,
            pattern_name="interactives:interactive",
            query_string=True
        ),
    ),
]
