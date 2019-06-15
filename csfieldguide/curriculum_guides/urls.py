"""URL routing for the curriculum guides application."""

from django.conf.urls import url
from django.views.generic.base import RedirectView

from . import views

app_name = "curriculum_guides"
urlpatterns = [
    # eg: /curriculum-guides/
    url(
        r"^$",
        views.IndexView.as_view(),
        name="index"
    ),
    # eg: /curriculum-guides/apcsp/
    url(
        r"^(?P<curriculum_guide_slug>[-\w]+)/$",
        views.CurriculumGuideView.as_view(),
        name="curriculum_guide"
    ),
    # eg: /curriculum-guides/apcsp/abstraction/
    url(
        r"^(?P<curriculum_guide_slug>[-\w]+)/(?P<curriculum_guide_section_slug>[-\w]+)/$",
        views.CurriculumGuideSectionView.as_view(),
        name="curriculum_guide_section"
    ),
    # eg: redirect /curriculum-guides/index.html to /curriculum-guides/
    url(
        r"^index.html$",
        RedirectView.as_view(permanent=True, url="/curriculum-guides/"),
    ),
    # eg: redirect /curriculum-guides/apcsp.html to /curriculum-guides/apcsp/
    url(
        r"^(?P<curriculum_guide_slug>[-\w]+).html$",
        RedirectView.as_view(permanent=True, pattern_name="curriculum_guides:curriculum_guide"),
    ),
    # eg: redirect /curriculum-guides/apcsp.html#abstraction to /curriculum-guides/apcsp/abstraction/
    url(
        r"^(?P<curriculum_guide_slug>[-\w]+).html#(?P<curriculum_guide_section_slug>[-\w]+)$",
        RedirectView.as_view(permanent=True, pattern_name="curriculum_guides:curriculum_guide:curriculum_guide_section"),
    ),
]
