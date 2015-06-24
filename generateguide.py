""" CSFG Guide Generator
AUTHORS: Jack Morgan, Jordan Griffiths
REQUIRES: Python >= 3.4.1
"""

"""Check and install dependencies if needed"""
import pip
# Pip commands currently disabled due to workstation issues
# Will test installing to user directory
# Update pip if needed
#pip.main(['install', '--upgrade', '--user', 'pip>=7.0.3'])
# Check dependencies
#pip.main(['install',  '--user', '-r', 'generator/dependencies.conf'])

import configparser
import logging
import os.path
import os
import re
from shutil import copy2
from generator.markdownsection import Section
from generator.websitegenerator import WebsiteGenerator
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

        self.number_generator = NumberGenerator()

        # Structure tree of guide
        self.structure = self.parse_structure()
        # Populates structure tree with markdown content
        self.traverse_files(getattr(self, "read_content"))
        # Dictionary of sets for images, interactives, and other_files
        self.required_files = setup_required_files(self)
        self.html_templates = self.read_html_templates()

        if self.html_templates:
            self.traverse_files(getattr(self, "process_section"))
            self.setup_html_output()
            self.traverse_files(getattr(self, "write_html_file"))


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
                search = re.search('^\{(?P<template_name>[^%{# }]+(?P<end> end)?)\}', line, re.MULTILINE)
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
        """Create tree of guide structure using folder and file nodes"""
        #TODO:
        #-  Needs to be extended to include assesment guides/different
        #   levels,temporary solution
        #-  Traverse directories perhaps?

        root_folder = FolderNode('root', guide=self)
        group_order = self.generator_settings['Source']['Text Order'].split()
        for group in group_order:
            root_folder.add_folder(group)
            cur_folder = root_folder.get_folder(group)
            titles = self.guide_settings[group]['Order'].strip().split('\n')
            for title in titles:
                cur_folder.add_file(title)

        for page in self.guide_settings['static-pages']['Order'].split():
            path_list = page.split('/')
            cur_folder = root_folder
            while len(path_list) > 1:
                cur_folder = cur_folder.get_folder(path_list.pop(0))
            cur_folder.add_file(path_list[0]) #TODO: need to decide whether to include .md

        return root_folder


    def traverse_files(self, process_file_function):
        """BFS of structure tree, visits file nodes, and calls given function
        on each file node found"""
        folder_queue = [self.structure]
        while len(folder_queue) > 0:
            cur_folder = folder_queue.pop(0)
            folder_queue += cur_folder.folders
            for file in cur_folder.files:
                process_file_function(file)


    def read_content(self, file_node):
        """Reads markdown file content into the section object of the
        file node.

        -   Reads markdown content from file using template
        -   Calls generate_section function of section object,
            passing through markdown contents
        """
        text_root = 'text'
        template = self.generator_settings['Source']['Text Filename Template']
        file_path = template.format(folder_path=file_node.parent.path,
                                    title=file_node.filename,
                                    language=self.language)
        file_path = os.path.join(text_root, file_path)

        """reads markdown from file and adds this to file node"""
        if file_exists(file_path):
            with open(file_path, 'r', encoding='utf8') as source_file:
                data = source_file.read()
                file_node.generate_section(data)


    def process_section(self, file_node):
        """Process a section file
        Sets: - Section numbers
              - Converts raw into HTML
              - Adds Section's required files to Guide's required files
        """
        print(file_node.filename)
        file_node.section.parse_markdown_content(self.html_templates)
        for file_type,file_data in file_node.section.required_files.items():
            self.required_files[file_type] += file_data


    def setup_html_output(self):
        """Preliminary setup, called before html files are written.

        -   Create output folder
        -   Set up WebsiteGenerator
        -   Copy required files
        """
        self.output_folder = self.generator_settings['Output']['Folder'].format(language=self.language,
                                                                         version=self.version)
        image_source_folder = self.generator_settings['Source']['Images']
        image_output_folder = os.path.join(self.output_folder, self.generator_settings['Output']['Images'])
        # Create necessary folders
        os.makedirs(self.output_folder, exist_ok=True)
        os.makedirs(image_output_folder, exist_ok=True)

        self.website_generator = WebsiteGenerator(self.html_templates)

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
    def write_html_file(self, file):
        """Writes the HTML file for a given file node
        (Temporary Solution)
        """
        # TODO:
        # -   Support all section templates (currently hardcoded)
        # -   Restructure with helper functions to allow for various
        #     components to be created in jinja2


        file_name = self.generator_settings['Output']['File'].format(file_name=file.filename)
        directory = os.path.join(self.output_folder, file.parent.path)
        os.makedirs(directory, exist_ok=True)
        path = os.path.join(directory, file_name)

        body_html= ''
        section_template = 'website_chapter' #TODO: placeholder FIX THIS - > self.generator_settings['HTML'][group.title]

        if file.section.mathjax_required:
            body_html += '<script type="text/javascript"  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>'

        for section_content in file.section.html_content:
            body_html += section_content
        context = {'page_title':file.section.title, 'body_html':body_html}#, 'top_menu_bar':top_menu_bar}
        html = self.website_generator.render_template(section_template, context)
        try:
            with open(path, 'w', encoding='utf8') as output_file:
                output_file.write(html)
        except:
            logging.critical("Cannot write file {0}".format(path))




class FolderNode:
    """Node object for storing folder details in structure tree"""
    def __init__(self, name, parent=None, guide=None):
        self.name = name
        self.parent = parent
        self.folders = []
        self.files = []
        self.folders_dict = {}
        self.files_dict = {}
        self.depth = (parent.depth + 1) if parent else -1
        self.path = '{}{}/'.format(self.parent.path, self.name) if self.parent else ''
        self.guide = self.parent.guide if parent else guide

    def add_folder(self, folder_name):
        """Add sub-folder to folders list. Updates dictionary
        of index references
        """
        folder_node = FolderNode(folder_name, parent=self)
        self.folders.append(folder_node)
        self.folders_dict[folder_name] = len(self.folders) - 1

    def add_file(self, file_name):
        """Add file to files list. Updates dictionary
        of index references
        """
        file_node = FileNode(file_name, parent=self)
        self.files.append(file_node)
        self.files_dict[file_name] = len(self.files) - 1

    def get_folder(self, name):
        """return reference to sub-folder with given name"""
        return self.folders[self.folders_dict[name]]

    def get_file(self, name):
        """return reference to contained file with given name"""
        return self.files[self.files_dict[name]]


class FileNode:
    """Node object for storing file details in structure tree"""
    def __init__(self, name, parent):
        self.filename = name
        self.parent = parent
        self.section = None
        self.depth = (parent.depth + 1)
        self.path = '{}{}'.format(self.parent.path, self.filename)
        self.guide = self.parent.guide

    def generate_section(self, markdown_data):
        """Creates section object with given markdown data"""
        self.section = Section(self, markdown_data)


class NumberGenerator:
    """Used to allocate numbers throughout guide"""
    def __init__(self):
        self.number_list = [None, 0]
        self.cur_level = 1

    def __str__(self):
        """Return formatted number eg. "1.5.6.2"
        """
        return '.'.join(str(num) for num in self.number_list[1:]) + '.'

    def next(self, level):
        """Returns next number for a given level.
        Numbers must be generated in order.
        -   For higher levels, 1 values are appended until
            desired level reached
        -   For lower levels, values popped from list until
            desired level reached, then incrememnted by 1
        """
        if level > self.cur_level:
            while level > self.cur_level:
                self.number_list.append(1)
                self.cur_level += 1
        else:
            while self.cur_level > level:
                self.number_list.pop()
                self.cur_level -= 1
            self.number_list[-1] += 1
        return str(self)


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
