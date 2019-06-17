"""URL routing for the general application."""

from django.conf.urls import url
from . import views
from django.views.generic.base import RedirectView


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
    url(
        r"^further-information/glossary.html$",
        RedirectView.as_view(permanent=True, pattern_name="chapters:glossary"),
    ),
    url(
        r"^further-information/interactives.html$",
        RedirectView.as_view(permanent=True, pattern_name="interactives:index"),
    ),
    url(
        r"^further-information/contributors.html$",
        RedirectView.as_view(permanent=True, pattern_name="appendices:contributors"),
    ),
    url(
        r"^further-information/releases.html$",
        RedirectView.as_view(permanent=True, url="https://cs-field-guide.readthedocs.io/en/latest/changelog.html"),
    ),
]
