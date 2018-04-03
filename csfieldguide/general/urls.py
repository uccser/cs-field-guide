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
        r"^teacher/login$",
        views.set_teacher_mode,
        {"mode": True},
        name="teacher_mode_login"
    ),
    # e.g. /teacher/logout/
    url(
        r"^teacher/logout$",
        views.set_teacher_mode,
        {"mode": False},
        name="teacher_mode_logout"
    ),
    # e.g. /about
    url(
        r"^about$",
        views.GeneralAboutView.as_view(),
        name="about"
    ),
    # e.g. /contributors
    url(
        r"^contributors$",
        views.GeneralContributorsView.as_view(),
        name="contributors"
    ),
    # e.g. /releases
    url(
        r"^releases$",
        views.GeneralReleasesView.as_view(),
        name="releases"
    )
]
