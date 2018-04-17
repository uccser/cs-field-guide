"""URL routing for the general application."""

from django.conf.urls import url

from . import views

urlpatterns = [
    # e.g. csfieldguide.org.nz/
    url(
        r"^$",
        views.GeneralIndexView.as_view(),
        name="index"
    ),
    # e.g. /teacher/login/
    url(
        r"^teacher/login/$",
        views.set_teacher_mode,
        {"mode": True},
        name="teacher_mode_login"
    ),
    # e.g. /teacher/logout/
    url(
        r"^teacher/logout/$",
        views.set_teacher_mode,
        {"mode": False},
        name="teacher_mode_logout"
    ),
    # e.g. /appendices/about/
    url(
        r"^appendices/(?P<page_slug>[-\w]+)/$",
        views.GeneralPageView.as_view(),
        name="page"
    ),
    # e.g. /appendices/curriculum-guides/ncea/
    url(
        r"^appendices/(?P<page_slug>[-\w]+)/(?P<subpage_slug>[-\w]+)/$",
        views.GeneralSubpageView.as_view(),
        name="subpage"
    ),
]
