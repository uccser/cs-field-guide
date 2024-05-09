"""URL configuration for testing general appendix model."""

from django.urls import path, include


urlpatterns = [
    path(
        "",
        # Force to use 'appendices:' namespace.
        include(
            (
                [
                    path("/appendix-1", lambda: True, name="appendix-1"),
                ],
                "appendices",
            )
        ),
    ),
]
