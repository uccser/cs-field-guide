"""URL routing for the chapters application."""

from django.urls import path
from django.views.generic.base import RedirectView

from . import views

app_name = "chapters"
urlpatterns = [
    # eg: /chapters/
    path(
        "",
        views.IndexView.as_view(),
        name="index"
    ),
    # eg: /chapters/glossary/
    path(
        "glossary/",
        views.GlossaryList.as_view(),
        name="glossary"
    ),
    # eg: /chapters/glossary/json/
    path(
        "glossary/json/",
        views.glossary_json,
        name="glossary_json"
    ),
    # eg: /chapters/algorithms/
    path(
        r"<chapter_slug>/",
        views.ChapterView.as_view(),
        name="chapter"
    ),
    # eg: /chapters/algorithms/searching/
    path(
        "<chapter_slug>/<chapter_section_slug>/",
        views.ChapterSectionView.as_view(),
        name="chapter_section"
    ),
    # eg: redirect /chapters/index.html to /chapters/
    path(
        "index.html",
        RedirectView.as_view(permanent=True, pattern_name="chapters:index"),
    ),
    # eg: redirect /chapters/algorithms.html to /chapters/algorithms/
    path(
        r"<chapter_slug>.html",
        RedirectView.as_view(permanent=True, pattern_name="chapters:chapter"),
    ),
]
