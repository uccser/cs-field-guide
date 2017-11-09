"""URL routing for the interactives application."""

from django.conf.urls import url

from . import views

app_name = "interactives"
urlpatterns = [
	# eg: /interactives/
    url(
        r"^$",
        views.IndexView.as_view(),
        name="home"
    ),
    # eg: /interactives/sorting-algorithms/
    url(
        r"^interactives/(?P<interactive_slug>[-\w]+)/$",
        views.InteractiveView.as_view(),
        name="interactive"
    ),
]


