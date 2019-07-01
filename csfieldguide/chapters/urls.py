"""URL routing for the chapters application."""

from django.conf.urls import url
from django.views.generic.base import RedirectView

from . import views

app_name = "chapters"
urlpatterns = [
    # eg: /chapters/
    url(
        r"^$",
        views.IndexView.as_view(),
        name="index"
    ),
    # eg: /chapters/glossary/
    url(
        r"^glossary/$",
        views.GlossaryList.as_view(),
        name="glossary"
    ),
    # eg: /chapters/glossary/json/
    url(
        r"^glossary/json/$",
        views.glossary_json,
        name="glossary_json"
    ),
    # eg: /chapters/algorithms/
    url(
        r"^(?P<chapter_slug>[-\w]+)/$",
        views.ChapterView.as_view(),
        name="chapter"
    ),
    # eg: /chapters/algorithms/searching/
    url(
        r"^(?P<chapter_slug>[-\w]+)/(?P<chapter_section_slug>[-\w]+)/$",
        views.ChapterSectionView.as_view(),
        name="chapter_section"
    ),
    # eg: redirect /chapters/index.html to /chapters/
    url(
        r"^index.html$",
        RedirectView.as_view(permanent=True, pattern_name="chapters:index"),
    ),
    # eg: redirect /chapters/algorithms.html to /chapters/algorithms/
    url(
        r"^(?P<chapter_slug>[-\w]+).html$",
        RedirectView.as_view(permanent=True, pattern_name="chapters:chapter"),
    ),
    # eg: redirect /chapters/algorithms.html#searching to /chapters/algorithms/searching/
    url(
        r"^(?P<chapter_slug>[-\w]+).html#(?P<chapter_section_slug>[-\w]+)$",
        RedirectView.as_view(permanent=True, pattern_name="chapters:chapter_section"),
    ),
]
