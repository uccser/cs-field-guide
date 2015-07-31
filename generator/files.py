import os.path

class FileType:
    """Object for containing information about a required file for output
    Current types include images, files, CSS, JS and interactives"""
    def __init__(self, file_type, source_location, output_location):
        self.file_type = file_type
        self.source_location = source_location
        self.output_location = output_location
        self.filenames = set()

    def add(self, filename):
        """Adds a given filename to list, ignores duplicates"""
        self.filenames.add(filename)

    def __add__(self, other):
        """Handles adding two File objects together"""
        # TODO: Could raise exception if other attributes don't match
        self.filenames = self.filenames.union(other.filenames)
        return self


def setup_required_files(guide):
    """Sets up list of required file objects (class File)"""
    required_files = dict()
    file_types = guide.generator_settings['Source']['Required File Types'].strip().split('\n')
    base_output_folder = guide.generator_settings['Output']['Folder'].format(language=guide.language_code, version=guide.version)
    for file_type in file_types:
        source_location = guide.generator_settings['Source'][file_type]
        output_location = os.path.join(base_output_folder, guide.generator_settings['Output'][file_type])
        required_files[file_type] = FileType(file_type, source_location, output_location)
    return required_files
