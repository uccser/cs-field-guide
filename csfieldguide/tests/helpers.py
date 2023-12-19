"""Module for helper functions for test suite."""

from os.path import join, dirname
from django.conf import settings


def template_settings_for_test(test_folder):
    """Return custom settings for templates for test folder.

    Args:
        test_folder (str): Path to folder of templates.
                           Example: "tests/interactives/views/assets/templates/"

    Returns:
        Dictionary of custom settings used for overriding tests.
    """
    test_template_settings = settings.TEMPLATES
    default_path = test_template_settings[0]["DIRS"][0]
    new_path = join(dirname(default_path), test_folder)
    test_template_settings[0]["DIRS"].append(new_path)
    return test_template_settings


def bool_to_yes_no(value, error_on_invalid=False):
    """Convert value if boolean to yes or no.

    Args:
        boolean: Value to check.
        error_on_invalid: Boolean to state if an exception should be raised
            if the value isn't valid.

    Returns:
        "yes" if boolean is True, "no" if False,
        otherwise the value is returned.

    Raises:
        ValueError if value isn't "yes" or "no".
    """
    if type(value) is bool and value:
        return "yes"
    elif type(value) is bool:
        return "no"
    elif error_on_invalid:
        raise ValueError("Expected True or False.")
    else:
        return value


def query_string(values):
    """Create a GET query to append to a URL from the given values.

    Boolean values are changed to text to mimic forms.

    Args:
        values: A dictionary of keys/values of GET parameters.

    Returns:
        String of GET query.
    """
    string = "?"
    for index, (key, value) in enumerate(values):
        string += "{key}={value}".format(key=key, value=bool_to_yes_no(value))
        if index < len(values) - 1:
            string += "&"
    return string
