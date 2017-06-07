"""URL routing for the topics application."""

from django.conf.urls import url

from . import views

app_name = "topics"
urlpatterns = [
    # eg: /topics/
    url(r"^$", views.IndexView.as_view(), name="index")
]
