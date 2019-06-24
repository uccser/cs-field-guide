"""URL routing for the appendices application."""

from django.conf.urls import url

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
        r"^curriculum-guides/$",
        views.CurriculumGuidesView.as_view(),
        name="curriculum-guides"
    ),
    url(
        r"^curriculum-guides/ncea/$",
        views.NceaView.as_view(),
        name="ncea"
    ),
    url(
        r"^curriculum-guides/apcsp/$",
        views.ApcspView.as_view(),
        name="apcsp"
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
]
