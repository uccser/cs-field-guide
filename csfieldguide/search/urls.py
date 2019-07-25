"""URL routing for the search feature."""

from django.conf.urls import url
from . import views

app_name = "search"
urlpatterns = [
    # eg: /search/
    url(
        r"^$",
        views.CustomSearchView.as_view(),
        name="index"
    ),
]
