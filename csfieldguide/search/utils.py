"""Search utility functions."""

import copy

CONTENT_NOT_FOUND_ERROR_MESSAGE = ("General page requires content wrapped in "
                                   "an element with ID 'general-page-content'")


def concat_field_values(*args):
    """Return string of field values for search indexing.

    Args:
        Any number of QuerySet objects, the result of value_list calls.

    Returns:
        String for search indexing.
    """
    field_names = []
    for queryset in args:
        for instance in queryset:
            for field in instance:
                field_names.append(str(field))
    return ' '.join(field_names)


def get_search_model_types(search_model_types_list):
    """Return dictionary of search model types.

    Args:
        search_model_types: List of dicts of search base data to
                            to be fleshed out into full dictionary.

    Return:
        Dictionary of search model types, keyed by search model ID.
    """
    model_types = dict()
    for model_data in search_model_types_list:
        model_types[get_search_model_id(model_data['class'])] = model_data
    return model_types


def get_search_model_id(model):
    """Return search ID for model.

    Args:
        model: Class to get search ID for.

    Returns:
        String identifying class.
    """
    module_name = model._meta.app_label.lower()
    class_name = model._meta.object_name.lower()
    return f'{module_name}.{class_name}'


def get_model_filter_options(search_model_types):
    """Return of model options for search type filter.

    Args:
        search_model_types (dict): Dictionary of search model type data.

    Return:
        List of dictionaries of model options.
    """
    options = []
    for (model_id, model_data) in search_model_types.items():
        options.append(
            {
                'name': model_data['class']._meta.verbose_name.capitalize(),
                'value': model_id,
                'selected': False,
            }
        )
    return options


def updated_model_filter_options(model_options, selected_options):
    """Update a set of model filters with selected options.

    Args:
        model_options (list): List of dictionaries of model options.
        selected_options (list): List of selected values.

    Returns:
        Updated list of dictionaries of model options.
    """
    model_options = copy.deepcopy(model_options)
    for model_option in model_options:
        if model_option['value'] in selected_options:
            model_option['selected'] = True
    return model_options
