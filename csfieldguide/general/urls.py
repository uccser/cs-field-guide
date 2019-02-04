"""URL routing for the general application."""

from django.conf.urls import url
from . import views
from django.shortcuts import redirect
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
        r"^further-information/releases.html$",
        views.redirect_changelog,
        name="redirect_changelog"
    ),
    url(
        r"^further-information/(?P<appendix_slug>[-\w]+).html$",
        RedirectView.as_view(permanent=True, pattern_name="appendices:appendix"),
    ),
    # e.g redirect /curriculum-guides/ncea/index.html to /appendices/curriculum-guides/
    # TODO: Once the ncea and apcsp html templates are done change BOTH of the below 
    # redirects to use (?P<subappendix_slug>[-\w]+) in the regex instead of 'ncea' or 
    # 'apcsp' and change the pattern_name.
    # TODO: Remove '.*?' from BOTH regex expressions if we create more templates inside
    # of /ncea/ or /apcsp/
    url(
        r"^(?P<appendix_slug>[-\w]+)/ncea/.*?$",
        RedirectView.as_view(permanent=True, pattern_name="appendices:appendix"),
    ),
    url(
        r"^(?P<appendix_slug>[-\w]+)/apcsp/.*?$",
        RedirectView.as_view(permanent=True, pattern_name="appendices:appendix"),
    ),
]
