"""Module for the custom Django makepdf command."""

import os
import os.path
from urllib.parse import urlencode
from django.core.management.base import BaseCommand
from django.http.request import QueryDict
from django.conf import settings
from django.utils import translation
from chapters.models import Chapter


class Command(BaseCommand):
    """Required command class for the custom Django makepdf command."""

    help = "Creates static PDF file of CSFG content."

    def add_arguments(self, parser):
        """Add optional parameter to makeresources command."""
        parser.add_argument(
            "version",
            nargs="?",
            default=None,
            help="The version to generate (student/teacher)",
        )
        parser.add_argument(
            "language",
            nargs="?",
            default=None,
            help="The language to generate the PDF in",
        )

    def handle(self, *args, **options):
        """Automatically called when the makepdf command is given."""
        base_path = settings.PDF_GENERATION_LOCATION

        # TODO: Create different versions at a later stage
        # if options["version"]:
        #     versions = (options["version"], )
        # else:
        #     versions = ("student", "teacher")

        if options["language"]:
            generation_languages = [options["language"]]
        else:
            generation_languages = []
            for language_code, _ in settings.LANGUAGES:
                if language_code not in settings.INCONTEXT_L10N_PSEUDOLANGUAGES:
                    generation_languages.append(language_code)

        print("Creating {} version:".format(version))

        for language_code in generation_languages:
            print("  - Creating PDF in '{}'".format(language_code))
            with translation.override(language_code):
                if resource.copies:
                    combination["copies"] = settings.RESOURCE_COPY_AMOUNT
                requested_options = QueryDict(urlencode(combination, doseq=True))
                generator = get_resource_generator(resource.generator_module, requested_options)
                (pdf_file, filename) = generator.pdf(resource.name)

                pdf_directory = os.path.join(base_path, resource.slug, language_code)
                if not os.path.exists(pdf_directory):
                    os.makedirs(pdf_directory)

                filename = "{}.pdf".format(filename)
                pdf_file_output = open(os.path.join(pdf_directory, filename), "wb")
                pdf_file_output.write(pdf_file)
                pdf_file_output.close()

    def get_html(self):
        html = ""


    def render_pdf(self):
        # Only import weasyprint when required as production
        # environment does not have it installed.
        from weasyprint import HTML, CSS
        context = dict()
        context["html"] = html
        context["paper_size"] = "a4"

        filename = "{} ({})".format(resource_name, self.subtitle)
        context["filename"] = filename

        pdf_html = render_to_string("resources/base-resource-pdf.html", context)
        html = HTML(string=pdf_html, base_url=settings.BUILD_ROOT)
        css_file = finders.find("css/print-resource-pdf.css")
        css_string = open(css_file, encoding="UTF-8").read()
        base_css = CSS(string=css_string)
        return (html.write_pdf(stylesheets=[base_css]), filename)

    def django_url_fetcher(url):
        """Load file:// paths directly from disk.

        Method based on https://github.com/fdemmer/django-weasyprint/blob/master/django_weasyprint/utils.py"""
        # Only import weasyprint when required as production
        # environment does not have it installed.
        from weasyprint import default_url_fetcher
        if url.startswith('file:'):
            mime_type, encoding = mimetypes.guess_type(url)
            url_path = urlparse(url).path

            if url_path.startswith(settings.STATIC_URL):
                path = url_path.replace(settings.STATIC_URL, '')
                data = {
                    "mime_type": mime_type,
                    "encoding": encoding,
                    "filename": basename(url_path),
                    "file_obj": open(find(path), 'rb'),
                }
                return data

        # fall back to weasyprint default fetcher
        return default_url_fetcher(url)
