"""URL routing for the interactives application."""

from django.conf.urls import url
from django.conf import settings

from . import views

app_name = "interactives"
urlpatterns = []

# Define URL pattern before whole page interactive URL
if settings.DEBUG:  # pragma: no cover
    urlpatterns += [
        # eg: /interactives/thumbnail-json/
        url(
            r"^thumbnail-json/$",
            views.thumbnail_json
        )
    ]

urlpatterns += [
    # eg: /interactives/
    url(
        r"^$",
        views.IndexView.as_view(),
        name="index"
    ),
    # eg: /interactives/iframe/sorting-algorithms/
    url(
        r"^iframe/(?P<interactive_slug>[-\w]+)/$",
        views.interactive_iframe_view,
        name="iframe_interactive"
    ),
    url(
        r"^centered/(?P<interactive_slug>[-\w]+)/$",
        views.interactive_centered_view,
        name="centered_interactive"
    ),
    # eg: /interactives/sorting-algorithms/
    url(
        r"^(?P<interactive_slug>[-\w]+)/$",
        views.interactive_whole_page_view,
        name="interactive"
    ),
]
