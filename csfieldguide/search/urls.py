"""URL routing for the search feature."""

from django.conf.urls import url
from . import views

urlpatterns = [
    # eg: /search/
    url(
        r"^$",
        views.CustomSearchView.as_view(),
        name="index"
    ),
]
