"""URL configuration for the Django system.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/dev/topics/http/urls/
"""

from django.conf import settings
from django.conf.urls.i18n import i18n_patterns
from django.http.response import HttpResponse
from django.urls import include, path

from . import views

urlpatterns = i18n_patterns(
    path("", include("general.urls", namespace="general")),
    path("interactives/", include("interactives.urls", namespace="interactives")),
    path("chapters/", include("chapters.urls", namespace="chapters")),
    path("curriculum-guides/", include("curriculum_guides.urls", namespace="curriculum_guides")),
    path("appendices/", include("appendices.urls", namespace="appendices")),
    path("search/", include("search.urls", namespace="search")),
)

urlpatterns += [
    path('healthcheck/', HttpResponse),
    path('status/', view=views.get_release_and_commit, name="get-release-and-commit")
]

if settings.DEBUG:  # pragma: no cover
    import debug_toolbar
    urlpatterns += [
        path("__debug__/", include(debug_toolbar.urls)),
    ]
    # These patterns allows these error pages to be debugged during development.
    from django.views import defaults
    urlpatterns += [
        path('400/', defaults.bad_request, kwargs={'exception': Exception("Bad request")}),
        path('403/', defaults.permission_denied, kwargs={'exception': Exception("Permissin denied")}),
        path('404/', defaults.page_not_found, kwargs={'exception': Exception("Page not found")}),
        path('500/', defaults.server_error),
    ]
