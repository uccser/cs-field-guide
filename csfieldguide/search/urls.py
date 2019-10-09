"""URL routing for the search feature."""

from django.urls import path
from . import views

app_name = "search"
urlpatterns = [
    # eg: /search/
    path(
        "",
        views.CustomSearchView.as_view(),
        name="index"
    ),
]
