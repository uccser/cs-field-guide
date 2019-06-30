"""URL routing for the appendices application."""

from django.conf.urls import url
from django.views.generic.base import RedirectView

from . import views

urlpatterns = [
    # e.g. /appendices/
    url(
        r"^$",
        views.AppendicesList.as_view(),
        name="appendices"
    ),
    url(
        r"^about/$",
        views.AboutView.as_view(),
        name="about"
    ),
    url(
        r"^contributors/$",
        views.ContributorsView.as_view(),
        name="contributors"
    ),
    url(
        r"^sitemap/$",
        views.SitemapView.as_view(),
        name="sitemap"
    ),
    # eg: redirect /appendices/curriculum-guides/ to /curriculum-guides/
    url(
        r"^curriculum-guides/$",
        RedirectView.as_view(permanent=True, pattern_name="curriculum_guides:index")
    ),
    # eg: redirect /appendices/curriculum-guides/ncea/ to /curriculum-guides/ncea/
    url(
        r"^curriculum-guides/(?P<curriculum_guide_slug>[-\w]+)/$",
        RedirectView.as_view(permanent=True, pattern_name="curriculum_guides:curriculum_guide")
    ),
]
