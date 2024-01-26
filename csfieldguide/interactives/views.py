"""Views for the interactives application."""

from django.db.models import Prefetch
from django.views import generic
from django.http import HttpResponse, JsonResponse
from django.urls import reverse
from django.shortcuts import redirect
from django.conf import settings
from django.utils import translation
from django.views.decorators.clickjacking import xframe_options_exempt
from interactives.models import Interactive
from chapters.models import Chapter
from config.templatetags.render_interactive_in_page import render_interactive_html
from interactives.utils.get_thumbnail import get_thumbnail_static_path_for_interactive


class IndexView(generic.ListView):
    """View for the interactives application homepage."""

    template_name = "interactives/index.html"
    context_object_name = "interactives"

    def get_queryset(self):
        """Get queryset of all interactives.

        Returns:
            Queryset of Interactive objects.
        """
        return Interactive.objects.all()

    def get_context_data(self, **kwargs):
        """Provide the context data for the interactives view.

        Returns:
            Dictionary of context data.
        """
        context = super(IndexView, self).get_context_data(**kwargs)
        context["chapters"] = Chapter.objects.prefetch_related(
             Prefetch(
                 'interactives',
                 queryset=Interactive.objects.filter(is_interactive=True))
        )
        return context


def interactive_whole_page_view(request, interactive_slug):
    """View for a interactive in whole page mode.

    Args:
        request (Request): Object of request.
        interactive_slug (str): Slug of interactive.

    Returns:
        HTTP response of rendered interactive.
    """
    return HttpResponse(render_interactive_html(interactive_slug, "whole-page", request))


@xframe_options_exempt
def interactive_iframe_view(request, interactive_slug):
    """View for a interactive in iframe mode.

    Args:
        request (Request): Object of request.
        interactive_slug (str): Slug of interactive.

    Returns:
        HTTP response of rendered interactive.
    """
    return HttpResponse(render_interactive_html(interactive_slug, "iframe", request))


def interactive_centered_view(request, interactive_slug):
    """View for a interactive in centered mode.

    Args:
        request (Request): Object of request.
        interactive_slug (str): Slug of interactive.

    Returns:
        HTTP response of rendered interactive.
    """
    return HttpResponse(render_interactive_html(interactive_slug, "centered", request))


def thumbnail_json(request, **kwargs):
    """Provide JSON data for creating thumbnails.

    Args:
        request: The HTTP request.

    Returns:
        JSON response is sent containing data for thumbnails.
    """
    data = list()

    if request.GET.get("all_languages", False):
        languages = settings.DEFAULT_LANGUAGES
    elif request.GET.get("language", False):
        languages = [(request.GET.get("language"), "")]
    else:
        languages = [("en", "")]

    for language_code, _ in sorted(languages):
        with translation.override(language_code):
            for interactive in Interactive.objects.order_by("slug"):
                url = reverse("interactives:centered_interactive", args=[interactive.slug])
                data.append(
                    [
                        interactive.slug,
                        language_code,
                        url,
                        get_thumbnail_static_path_for_interactive(interactive),
                        interactive.is_interactive,
                        interactive.use_large_thumbnail,
                    ]
                )
    return JsonResponse(data, safe=False)


def redirect_to_cfg_parsing_challenge(request):
    """Redirect request to renamed interactive.

    Returns a 301 permanent redirect HTTP response.
    """
    return redirect(
        reverse(
            "interactives:interactive",
            kwargs={'interactive_slug': 'cfg-parsing-challenge'},
        ) + f"?{request.GET.urlencode()}",
        permanent=True,
    )


def redirect_to_trainsylvania_map_blank(request):
    """Redirect request to renamed interactive.

    Returns a 301 permanent redirect HTTP response.
    """
    return redirect(
        reverse(
            "interactives:interactive",
            kwargs={'interactive_slug': 'trainsylvania-map'},
        ),
        permanent=True,
    )


def redirect_to_trainsylvania_map_complete(request):
    """Redirect request to renamed interactive.

    Returns a 301 permanent redirect HTTP response.
    """
    return redirect(
        reverse(
            "interactives:interactive",
            kwargs={'interactive_slug': 'trainsylvania-map'},
        )+"?complete",
        permanent=True,
    )
