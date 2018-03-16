"""URL routing for the interactives application."""

from django.conf.urls import url

from . import views

app_name = "interactives"
urlpatterns = [
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
    # eg: /interactives/sorting-algorithms/
    url(
        r"^(?P<interactive_slug>[-\w]+)/$",
        views.interactive_whole_page_view,
        name="interactive"
    ),
]
