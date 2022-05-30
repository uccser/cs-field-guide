"""Module for the custom Django rebuild_search_indexes command."""

from os.path import join
from django.core import management
from django.db.models import Value
from django.contrib.postgres.search import SearchVector
from django.template.loader import render_to_string
from search.models import SearchItem
from search.settings import (
    SEARCH_CLASSES,
    SEARCH_MODEL_TYPES,
    SEARCH_RESULT_TEMPLATE_DIRECTORY,
)
from search.utils import get_search_model_id
from utils.language_utils import get_available_languages


class Command(management.base.BaseCommand):
    """Required command class for the custom Django rebuild_search_indexes command."""

    help = "Rebuild search indexes in database."

    def handle(self, *args, **options):
        """Automatically called when the command is given."""
        # Wipe all search indexes
        SearchItem.objects.all().delete()

        # Add items
        item_number = 1
        for model_data in SEARCH_CLASSES:
            model = model_data['class']

            if 'filter' in model_data:
                model_instances = model.objects.filter(**model_data['filter'])
            else:
                model_instances = model.objects.all()

            for instance in model_instances:
                self.index_instance(instance, item_number)
                item_number += 1

    def index_instance(self, instance, item_number):
        """Create search item for instance for searching.

        Args:
            instance (object): Object to be indexed.
        """
        object_type = get_search_model_id(instance)
        class_data = SEARCH_MODEL_TYPES[object_type]

        # Create index/result for each language
        for language in get_available_languages():

            # Get index contents
            if hasattr(instance, 'index_contents') and callable(getattr(instance, 'index_contents')):
                contents = instance.index_contents()
            else:
                raise Exception(f'{instance.__class__} is missing required method .index_contents().')

            search_vector_list = []
            for weight, text in contents.items():
                search_vector_list.append(
                    SearchVector(Value(text), weight=weight)
                )
            search_vectors = search_vector_list[0]
            for search_vector in search_vector_list[1:]:
                search_vectors += search_vector

            # Render result preview
            context = {'result': instance}
            template = join(SEARCH_RESULT_TEMPLATE_DIRECTORY, object_type + '.html')
            result_preview = render_to_string(template, context)

            SearchItem.objects.create(
                object_type=object_type,
                object_type_name=instance._meta.verbose_name,
                language=language,
                boost=class_data['boost'],
                result_preview=result_preview,
                order=item_number,
                search_vector=search_vectors,
            )

        print(f'Indexed {instance} for languages {get_available_languages()}.')
