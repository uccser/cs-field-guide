""" CSFG Guide Generator
AUTHOR: Jack Morgan
REQUIRES: Python >= 3.4.1
"""

import pip
import configparser
import collections
import logging
import os.path
import os
import re
from shutil import copy2
from markdownsection import Section

SETTINGS_CONF = 'settings.conf'
LOGFILE_CONF = 'logging.conf'
HTML_TEMPLATE_CONF = 'html-templates.conf'

# TODO: Determine which variables should be in settings file

FILE_NAME_TEMPLATE = '{0}_{1}.md'
PATH_CHAPTERS = 'text/{0}'
PATH_APPENDICES = 'text/appendices/'
PATH_STATIC_PAGES = 'text/static_pages/'
PATH_INTERACTIVES = 'interactives/'
PATH_FILES = 'files/'
TEXT_GROUPS = ['Chapters', 'Appendices'] # Order of sections

OUTPUT_FOLDER = '..\output\{0}\\' # {0 = language}
OUTPUT_FILE = '{0}.html' # {0 = file}


class Guide:
    def __init__(self):
        self.settings = self.read_settings()
        self.structure = self.parse_structure()
        self.language = self.parse_language()
        self.content = self.read_content(self.structure)
        # Dictionary of sets for images, interactives, and other_files
        self.required_files = {}
        self.html_templates = self.read_html_templates()

        if self.html_templates:
            self.process_sections()
            self.write_html_files()


    def process_sections(self):
        """Process the Section files
        Sets: - Section numbers
              - Converts raw into HTML
              - Adds required files to Guide's list
        """
        section_number = 1
        for group in TEXT_GROUPS:
            if self.settings[group].getboolean('Numbered'):
                for title in self.structure[group]:
                    section = self.content[title]
                    section.set_number(section_number)
                    if section.markdown_text != None:
                        section.parse_markdown_content(self.html_templates)
                    for file_type,file_names in section.required_files.items():
                        self.required_files[file_type] = self.required_files.get(file_type, set()).union(file_names)
                    section_number += 1


    def read_html_templates(self):
        """Read html templates from html-templates.conf into dictionary"""
        html_templates = {}
        try:
            with open(HTML_TEMPLATE_CONF, 'r', encoding='utf8') as source_file:
                data = source_file.readlines()
        except:
            logging.critical('Cannot find file {0}. Generation aborted.'.format(HTML_TEMPLATE_CONF))
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
        """Returns language code for given setting"""
        # TODO: Handle all language names/codes
        language = self.settings['Main']['Language']
        if language.lower() in ['english', 'en']:
            return 'en'
        else:
            return 'en'


    def read_settings(self):
        """Read the setting file
        Converts yes/no settings to True/False
        TODO: and handle errors
        """
        settings = configparser.ConfigParser()
        settings.read(SETTINGS_CONF)
        return settings


    def parse_structure(self):
        """Create dictionary of guide structure"""
        structure = collections.defaultdict(list)
        for group in TEXT_GROUPS:
            order = self.settings[group]['Order']
            titles = order.split('\n')
            structure[group] = []
            for title in titles:
                stripped_title = title.strip()
                if stripped_title != '':
                    structure[group].append(stripped_title)
        return structure


    def read_content(self, structure):
        """Returns a dictionary with titles as keys and section objects as
        values"""
        content = {}
        for group, titles in structure.items():
            for title in titles:
                file_path = self.create_file_path(title, group, self.language)
                if file_exists(file_path):
                    with open(file_path, 'r', encoding='utf8') as source_file:
                        data = source_file.read()
                else:
                    data = None
                content[title] = Section(title, data, file_path)
        return content


    def create_file_path(self, title, group, language):
        file_name = FILE_NAME_TEMPLATE.format(title.replace(' ', '_').lower(), language)
        if group == TEXT_GROUPS[0]:
            folder_name = title.replace(' ', '_').lower()
            path = os.path.join('..', PATH_CHAPTERS.format(folder_name), file_name)
        elif group == TEXT_GROUPS[1]:
            path = os.path.join('..', PATH_APPENDICES, file_name)
        return path


    def write_html_files(self):
        """Writes the necessary HTML files
        Writes: - Chapter files
        """
        for group in TEXT_GROUPS[:1]:
            for title in self.structure[group]:
                section = self.content[title]
                file_name = OUTPUT_FILE.format(section.title.replace(' ', '_').lower())
                folder = OUTPUT_FOLDER.format(self.language)
                path = os.path.join(folder, file_name)

                os.makedirs(folder, exist_ok=True)

                try:
                    # Clear file
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

        # TODO: Copy required files
        for file_type,file_names in self.required_files.items():
            if file_type == 'images':
                for file_name in file_names:
                    # TODO: Replace file copy procedure, currently proof of concept
                    folder = OUTPUT_FOLDER.format(self.language)
                    source = os.path.join('..', 'images', file_name)
                    destination = os.path.join(folder, 'images')
                    if not os.path.exists(destination):
                        os.makedirs(destination, exist_ok=True)
                    try:
                        copy2(source, destination)
                    except:
                        logging.exception("Image {0} could not be copied".format(file_name))


def file_exists(file_path):
    if os.path.exists(file_path):
        return True
    else:
        logging.error("File {0} does not exist".format(file_path))
        return False


def setup_logging():
    """Sets up the logger to write to a file"""
    logging.config.fileConfig(LOGFILE_CONF)


def check_dependencies():
    """Check and install dependencies if needed"""
    # Update pip if needed
    pip.main(['install', '--upgrade', 'pip'])
    # Check dependencies
    pip.main(['install', '-r', 'dependencies.txt'])


def main():
    """Creates a Guide object"""
    # Switch to current directory
    os.chdir(os.path.dirname(os.path.realpath(__file__)))
    check_dependencies()
    setup_logging()
    guide = Guide()
    logging.shutdown()


if __name__ == "__main__":
    main()
