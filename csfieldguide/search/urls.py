"""URL routing for the search feature."""

from django.urls import path
from search import views

app_name = 'search'

urlpatterns = [
    # eg: /search/
    path(
        '',
        views.SearchView.as_view(),
        name="index"
    ),
]
