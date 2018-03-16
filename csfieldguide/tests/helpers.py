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
