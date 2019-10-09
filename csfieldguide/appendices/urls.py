"""URL routing for the appendices application."""

from django.urls import path
from django.views.generic.base import RedirectView

from . import views

app_name = "appendices"
urlpatterns = [
    # e.g. /appendices/
    path(
        "",
        views.AppendicesList.as_view(),
        name="appendices"
    ),
    path(
        "about/",
        views.AboutView.as_view(),
        name="about"
    ),
    path(
        "contributors/",
        views.ContributorsView.as_view(),
        name="contributors"
    ),
    path(
        "sitemap/",
        views.SitemapView.as_view(),
        name="sitemap"
    ),
    # eg: redirect /appendices/curriculum-guides/ to /curriculum-guides/
    path(
        "curriculum-guides/",
        RedirectView.as_view(permanent=True, pattern_name="curriculum_guides:index")
    ),
    # eg: redirect /appendices/curriculum-guides/ncea/ to /curriculum-guides/ncea/
    path(
        "curriculum-guides/<curriculum_guide_slug>/",
        RedirectView.as_view(permanent=True, pattern_name="curriculum_guides:curriculum_guide")
    ),
]
