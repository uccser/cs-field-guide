"""URL routing for the chapters application."""

from django.conf.urls import url

from . import views

app_name = "chapters"
urlpatterns = [
    # eg: /chapters/
    url(r"^$",
    	views.IndexView.as_view(),
    	name="index"
    ),
    # eg: /topics/algorithms/
    url(
        r"^(?P<chapter_slug>[-\w]+)/$",
        views.ChapterView.as_view(),
        name="chapter"
    ),
]
