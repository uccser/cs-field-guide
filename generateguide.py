""" CSFG Guide Generator
AUTHOR: Jack Morgan
REQUIRES: Python >= 3.4.1
"""

"""Check and install dependencies if needed"""
import pip
# Update pip if needed
pip.main(['install', '--upgrade', 'pip'])
# Check dependencies
pip.main(['install', '-r', 'generator/dependencies.conf'])

import configparser
import collections
import logging
import os.path
import os
import re
from shutil import copy2
from generator.markdownsection import Section
from generator.files import setup_required_files

GUIDE_SETTINGS = 'guide-settings.conf'
GENERATOR_SETTINGS = 'generator/generator-settings.conf'
REGEX_LIST = 'generator/regex-list.conf'
LOGFILE_SETTINGS = 'generator/logging.conf'

class Guide:
    def __init__(self):
        # Read settings
        self.guide_settings = self.read_settings(GUIDE_SETTINGS)
        self.generator_settings = self.read_settings(GENERATOR_SETTINGS)
        self.regex_list = self.read_settings(REGEX_LIST)

        self.language = self.parse_language()
        self.version = self.parse_version()

        self.structure = self.parse_structure()
        self.content = self.read_content()
        # Dictionary of sets for images, interactives, and other_files
        self.required_files = setup_required_files(self)
        self.html_templates = self.read_html_templates()

        if self.html_templates:
            self.process_sections()
            self.write_html_files()


    def process_sections(self):
        """Process the Section files
        Sets: - Section numbers
              - Converts raw into HTML
              - Adds Section's required files to Guide's required files
        """
        section_number = 1
        group_order = self.generator_settings['Source']['Text Order'].split()
        for group in group_order:
            for title in self.structure[group]:
                section = self.content[title]
                if self.guide_settings[group].getboolean('Numbered'):
                    section.set_number(section_number)
                if section.markdown_text:
                    section.parse_markdown_content(self.html_templates)
                for file_type,file_data in section.required_files.items():
                    self.required_files[file_type] += file_data
                if self.guide_settings[group].getboolean('Numbered'):
                    section_number += 1


    def read_html_templates(self):
        """Read html templates from html-templates.conf into dictionary"""
        html_templates = {}
        html_template_file = self.generator_settings['Source']['HTML Templates']
        try:
            with open(html_template_file, 'r', encoding='utf8') as source_file:
                data = source_file.readlines()
        except:
            logging.critical('Cannot find file {0}. Generation aborted.'.format(html_template_file))
        else:
            template_name = ''
            template_text = ''
            reading_template = False
            for line in data:
                search = re.search('^\{(?P<template_name>[^ }]+(?P<end> end)?)', line, re.MULTILINE)
                if search:
                    if search.group('end'):
                        reading_template = False
                        html_templates[template_name] = template_text
                        template_text = ''
                    elif search.group('template_name'):
                        reading_template = True
                        template_name = search.group('template_name')
                elif reading_template:
                    template_text += line
        return html_templates


    def parse_language(self):
        """Returns ISO 639-1 language code for given setting"""
        # TODO: Handle all language names/codes
        language = self.guide_settings['Main']['Language']
        if language.lower() in ['english', 'en']:
            return 'en'
        else:
            return 'en'


    def parse_version(self):
        version = self.guide_settings['Main']['Version'].lower()
        if not version == 'teacher':
            version = 'student'
        return version


    def read_settings(self, settings_location):
        """Read the given setting file
        and return the configparser
        """
        settings = configparser.ConfigParser()
        settings.read(settings_location)
        return settings

    def parse_structure(self):
        """Create dictionary of guide structure"""
        structure = collections.defaultdict(list)
        group_order = self.generator_settings['Source']['Text Order'].split()
        for group in group_order:
            order = self.guide_settings[group]['Order']
            titles = order.split('\n')
            structure[group] = []
            for title in titles:
                stripped_title = title.strip()
                if stripped_title != '':
                    structure[group].append(stripped_title)
        return structure


    def read_content(self):
        """Returns a dictionary with titles as keys and section objects as
        values"""
        content = {}
        for group, titles in self.structure.items():
            for title in titles:
                file_path = self.create_file_path(title, group, self.language)
                if file_exists(file_path):
                    with open(file_path, 'r', encoding='utf8') as source_file:
                        data = source_file.read()
                else:
                    data = None
                content[title] = Section(title, data, file_path, self)
        return content


    def create_file_path(self, title, group, language):
        template = self.generator_settings['Source']['Text Filename Template']
        file_name = template.format(title=title.replace(' ', '-').lower(), language=language)
        if group == 'Chapters':
            folder_name = title.replace(' ', '-').lower()
            path = os.path.join(self.generator_settings['Source']['Chapters'],
                                folder_name,
                                file_name)
        elif group == 'Appendices':
            path = os.path.join(self.generator_settings['Source']['Appendices'],
                                file_name)
        return path


    def write_html_files(self):
        """Writes the necessary HTML files
        Writes: - Chapter files
        """
        base_folder = self.generator_settings['Output']['Folder'].format(language=self.language,
                                                                         version=self.version)
        image_source_folder = self.generator_settings['Source']['Images']
        image_output_folder = os.path.join(base_folder, self.generator_settings['Output']['Images'])
        # Create necessary folders
        os.makedirs(base_folder, exist_ok=True)
        os.makedirs(image_output_folder, exist_ok=True)

        # TODO: Add writing of Appendices
        for group in ['Chapters']:
            for title in self.structure[group]:
                section = self.content[title]
                file_name = self.generator_settings['Output']['File'].format(file_name=section.title.replace(' ', '-').lower())
                path = os.path.join(base_folder, file_name)

                try:
                    # Clear existing file
                    open(path, 'w').close()

                    # Write HTML
                    with open(path, 'a', encoding='utf8') as output_file:
                        if section.mathjax_required:
                            output_file.write('<script type="text/javascript"  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>\n\n')

                        output_file.write('<link rel="stylesheet" href="http://cdn.foundation5.zurb.com/foundation.css" />\n<div class="row">\n')

                        for section_content in section.html_content:
                            output_file.write(section_content)

                        output_file.write('</div>')
                except:
                    logging.critical("Cannot write file {0}".format(file_name))

        # Copy all required files
        for file_type,file_data in self.required_files.items():
            for filename in file_data.filenames:
                source_location = os.path.join(file_data.source_location, filename)
                output_location = os.path.join(file_data.output_location, filename)
                if os.path.exists(source_location):
                    try:
                        copy2(source_location, output_location)
                    except:
                        logging.exception("{file_type} {filename} could not be copied".format(file_type=file_type[:-1],
                                                                                              filename=filename))
                else:
                    logging.error("{file_type} {filename} could not be found".format(file_type=file_type[:-1],
                                                                                     filename=filename))


def setup_logging():
    """Sets up the logger to write to a file"""
    logging.config.fileConfig(LOGFILE_SETTINGS)


def file_exists(file_path):
    if os.path.exists(file_path):
        return True
    else:
        logging.error("File {0} does not exist".format(file_path))
        return False


def main():
    """Creates a Guide object"""
    # Switch to current directory
    setup_logging()
    guide = Guide()
    logging.shutdown()


if __name__ == "__main__":
    main()
