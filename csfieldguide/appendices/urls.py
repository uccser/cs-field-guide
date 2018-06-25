"""URL routing for the appendices application."""

from django.conf.urls import url

from . import views

urlpatterns = [
    # e.g. /appendices/
    url(
        r"^$",
        views.AppendicesList.as_view(),
        name="appendices"
    ),
    # e.g. /appendices/curriculum-guides/
    url(
        r"^(?P<appendix_slug>[-\w]+)/$",
        views.AppendixView.as_view(),
        name="appendix"
    ),
    # e.g. /appendices/curriculum-guides/ncea/
    url(
        r"^(?P<appendix_slug>[-\w]+)/(?P<subappendix_slug>[-\w]+)/$",
        views.SubappendixView.as_view(),
        name="subappendix"
    ),
]
