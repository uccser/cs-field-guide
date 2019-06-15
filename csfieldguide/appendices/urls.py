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
