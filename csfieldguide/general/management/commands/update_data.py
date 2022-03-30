"""Module for the custom Django update_data command."""

from django.core import management


class Command(management.base.BaseCommand):
    """Required command class for the custom Django update_data command."""

    help = "Update all data from content folders for all applications"

    def handle(self, *args, **options):
        """Automatically called when the update_data command is given."""
        management.call_command("flush", interactive=False)
        management.call_command("loadappendices")
        management.call_command("loadinteractives")
        management.call_command("loadchapters")
        management.call_command("loadcurriculumguides")
