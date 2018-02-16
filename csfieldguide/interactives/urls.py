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
    # eg: /interactives/sorting-algorithms/
    url(
        r"^iframe/(?P<interactive_slug>[-\w]+)/$",
        views.IFrameInteractiveView.as_view(),
        name="iframe_interactive"
    ),
    # eg: /interactives/sorting-algorithms/
    url(
        r"^(?P<interactive_slug>[-\w]+)/$",
        views.InteractiveView.as_view(),
        name="interactive"
    ),
]
