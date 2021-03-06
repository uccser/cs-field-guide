"""URL routing for the curriculum guides application."""

from django.urls import path
from django.views.generic.base import RedirectView

from . import views

app_name = "curriculum_guides"
urlpatterns = [
    # eg: /curriculum-guides/
    path(
        "",
        views.IndexView.as_view(),
        name="index"
    ),
    # eg: /curriculum-guides/apcsp/
    path(
        "<curriculum_guide_slug>/",
        views.CurriculumGuideView.as_view(),
        name="curriculum_guide"
    ),
    # eg: /curriculum-guides/apcsp/abstraction/
    path(
        "<curriculum_guide_slug>/<curriculum_guide_section_slug>/",
        views.CurriculumGuideSectionView.as_view(),
        name="curriculum_guide_section"
    ),
    # eg: redirect any subpage of /ncea/ to NCEA homepage
    path(
        "ncea/",
        views.NCEARedirectView.as_view(),
    ),
    # eg: redirect /curriculum-guides/index.html to /curriculum-guides/
    path(
        "index.html",
        RedirectView.as_view(permanent=True, pattern_name="curriculum_guides:index"),
    ),
    # eg: redirect /curriculum-guides/apcsp/index.html to /curriculum-guides/apcsp/
    path(
        "<curriculum_guide_slug>/index.html",
        RedirectView.as_view(permanent=True, pattern_name="curriculum_guides:curriculum_guide"),
    ),
]
