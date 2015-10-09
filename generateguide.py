""" CSFG Guide Generator
AUTHORS: Jack Morgan, Jordan Griffiths
REQUIRES: Python >= 3.4.1
"""

import generator.systemfunctions as systemfunctions
from generator.systemconstants import *


cmd_args = systemfunctions.command_line_args()
if cmd_args.install_dependencies:
    systemfunctions.install_dependencies()

import configparser
import logging
import os.path
import os
import re
import generator.languages
from shutil import copy2
from distutils.dir_util import copy_tree
from generator.markdownsection import Section
from generator.websitegenerator import WebsiteGenerator
from generator.files import setup_required_files
from scss.compiler import compile_string

class Guide:
    def __init__(self, guide_settings, language_code, version, output_type=WEB):
        # Read settings
        self.guide_settings = guide_settings
        self.generator_settings = systemfunctions.read_settings(GENERATOR_SETTINGS)
        self.regex_list = systemfunctions.read_settings(REGEX_LIST)
        self.translations = systemfunctions.read_settings(TRANSLATIONS_LOCATION)
        self.permissions = systemfunctions.read_settings(PERMISSIONS_LOCATION)

        self.language_code = language_code
        self.language = self.parse_language()
        self.version = version
        self.output_type = output_type

        self.number_generator = NumberGenerator()

        # Structure tree of guide
        self.structure = self.parse_structure()
        # Populates structure tree with markdown content
        self.traverse_files(self.structure, getattr(self, "read_content"))
        # Dictionary of sets for images, interactives, and other_files
        self.required_files = setup_required_files(self)
        self.html_templates = self.read_html_templates()

        self.traverse_files(self.structure, getattr(self, "process_section"))
        if self.output_type == WEB:
            self.setup_html_output()
            self.traverse_files(self.structure, getattr(self, "write_html_file"))
        elif self.output_type == PDF:
            self.pdf_html = ''
            self.traverse_files(self.structure, getattr(self, "add_to_pdf_html"))
            self.generate_pdf() #TODO: implement generate_pdf()


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
                if search and ((reading_template and search.group('end')) or not reading_template):
                    if search.group('end'):
                        reading_template = False
                        html_templates[template_name] = template_text
                        template_text = ''
                    elif not reading_template and search.group('template_name'):
                        reading_template = True
                        template_name = search.group('template_name')
                elif reading_template:
                    template_text += line
        return html_templates


    def parse_language(self):
        """Returns language name from ISO 639-1 language code"""
        try:
            language_name = generator.languages.language_names[self.language_code]
        except KeyError:
            logging.error('Language code {} not found, please check list at https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes'.format(self.language_code))
            # Default to English
            return 'en'
        else:
            return language_name



    def parse_structure(self):
        """Create tree of guide structure using folder and file nodes"""
        root_folder = FolderNode('root', guide=self)
        content_types = [('tracked', True), ('untracked', False)] #TODO: Find better location for this data
        for content_name,is_tracked in content_types:
            group_order = self.generator_settings['Source'][content_name].split()
            # For each group in order, create folder nodes and file nodes
            for group in group_order:
                group_root_folder = self.generator_settings['Source'][group]
                title_paths = self.guide_settings['Guide Structure'][group].strip().split('\n')
                for title_path in title_paths:
                    current_folder = root_folder # Reset current folder to root
                    full_title_path = os.path.join(group_root_folder, title_path)
                    folder_path, title = os.path.split(full_title_path)
                    folder_path = folder_path.split('/')
                    # Navigate to correct folder
                    while folder_path:
                        sub_folder_name = folder_path.pop(0)
                        if sub_folder_name:
                            # add_folder ignores creation if folder exists
                            current_folder.add_folder(sub_folder_name)
                            current_folder = current_folder.get_folder(sub_folder_name)
                    #Add file node if correct markdown file exists
                    text_root = self.generator_settings['Source']['text']
                    file_template = self.generator_settings['Source']['Text Filename Template']
                    file_name = file_template.format(title=title, language=self.language_code)
                    file_path = os.path.join(text_root, current_folder.path, file_name)
                    if file_exists(file_path):
                        current_folder.add_file(title, group, tracked=is_tracked)
        # Visualise folder structure for restructuring
        #print(root_folder)
        return root_folder


    def traverse_files(self, start_node, process_file_function):
        """DFS of structure tree, visits file nodes, and calls given function
        on each file node found"""
        for folder in start_node.folders:
            self.traverse_files(folder, process_file_function)
        for file in start_node.files:
            process_file_function(file)


    def read_content(self, file_node):
        """Reads markdown file content into the section object of the
        file node.

        -   Reads markdown content from file using template
        -   Calls generate_section function of section object,
            passing through markdown contents
        """
        text_root = self.generator_settings['Source']['text']
        file_template = self.generator_settings['Source']['Text Filename Template']
        file_name = file_template.format(title=file_node.filename, language=self.language_code)
        file_path = os.path.join(text_root, file_node.parent.path, file_name)

        # Reads markdown from file and adds this to file node
        if file_exists(file_path):
            with open(file_path, 'r', encoding='utf8') as source_file:
                raw_data = source_file.read()
                file_node.generate_section(raw_data)


    def process_section(self, file_node):
        """Process a section file
        Sets: - Section numbers
              - Converts raw into HTML
              - Adds Section's required files to Guide's required files
        """
        if file_node.section:
            file_node.section.parse_markdown_content(self.html_templates)
            for file_type,file_data in file_node.section.required_files.items():
                self.required_files[file_type] += file_data


    def compile_scss_file(self, file_name):
        """Read given SCSS file, and compile to CSS,
        store in file object, and add to required CSS files
        """
        scss_source_folder = self.generator_settings['Source']['SCSS']
        scss_source_file = os.path.join(scss_source_folder, file_name)
        try:
            with open(scss_source_file, 'r', encoding='utf8') as scss_file:
                scss_data = scss_file.read()
        except:
            logging.critical('Cannot find SCSS file {0}.'.format(file_name))
        else:
            # This lists all subfolders of SCSS source folder, this may cause issues
            # later, but is an effective solution for the moment
            scss_source_folders = [x[0] for x in os.walk(scss_source_folder)]
            compiled_css = compile_string(scss_data, search_path=scss_source_folders, output_style='compressed')
            return compiled_css


    def setup_html_output(self):
        """Preliminary setup, called before html files are written.
        -   Create output folder
        -   Set up WebsiteGenerator
        -   Load website required files
        -   Copy required files
        """
        # Create output folder
        self.output_folder = self.generator_settings['Output']['Folder'].format(language=self.language_code, version=self.version)
        os.makedirs(self.output_folder, exist_ok=True)

        # Create website generator
        self.website_generator = WebsiteGenerator(self.html_templates)

        # Load website requried files
        for file_type,all_file_names in self.generator_settings['Website Required Files'].items():
            file_names = all_file_names.strip().split('\n')
            for file_name in file_names:
                if file_type == "SCSS":
                    css_string = self.compile_scss_file(file_name)
                    file_name = file_name.replace(".scss", ".css")
                    self.required_files["CSS"].add(file_name, css_string)
                else:
                    self.required_files[file_type].add(file_name)

        # Copy all required files
        for file_type,file_data in self.required_files.items():
            # Create folder for files
            file_output_folder = os.path.join(self.output_folder, self.generator_settings['Output'][file_type])
            os.makedirs(file_output_folder, exist_ok=True)
            # Copy files
            for file_object in file_data.filenames:
                file_name = file_object.filename
                if file_type in self.permissions.sections() and not (file_name in self.permissions[file_type]):
                    logging.warning("No permissions information exists for {} {}!".format(file_type, file_name))

                output_location = os.path.join(file_output_folder, file_name)
                # If data exists in file object, write file
                if file_object.file_data:
                    try:
                        with open(output_location, 'w', encoding='utf8') as output_file:
                            output_file.write(file_object.file_data)
                    except:
                        logging.critical("Cannot write file {0}".format(file_name))
                else:
                    source_location = os.path.join(file_data.source_location, file_name)
                    if os.path.exists(source_location):
                        try:
                            # If folder, copy folder
                            if os.path.isdir(source_location):
                                copy_tree(source_location, output_location)
                            # If file, copy file
                            else:
                                copy2(source_location, output_location)

                        except:
                            logging.error("{file_type} {file_name} could not be copied".format(file_type=file_type, file_name=file_name))
                    else:
                        logging.error("{file_type} {file_name} could not be found".format(file_type=file_type,file_name=file_name))


    def write_html_file(self, file):
        """Writes the HTML file for a given file node
        (Temporary Solution)
        """
        # TODO:
        # -   Support all section templates (currently hardcoded)
        # -   Restructure with helper functions to allow for various
        #     components to be created in jinja2

        file_name = self.generator_settings['Output']['HTML File'].format(file_name=file.filename)
        directory = os.path.join(self.output_folder, file.parent.path)
        os.makedirs(directory, exist_ok=True)
        path = os.path.join(directory, file_name)

        body_html= ''
        section_template = self.generator_settings['HTML'][file.group_type]

        if file.section:
            if file.section.mathjax_required:
                file.section.page_scripts.add(self.html_templates['mathjax'])

            for section_content in file.section.html_content:
                body_html += section_content
            context = {'page_title':file.section.title,
                       'body_html':body_html,
                       'path_to_root': file.section.html_path_to_root,
                       'project_title': self.translations['title'][self.language_code],
                       'root_folder': self.structure,
                       'heading_root': file.section.heading,
                       'language_code': self.language_code,
                       'page_scripts': list(file.section.page_scripts)
                      }
            html = self.website_generator.render_template(section_template, context)
            try:
                with open(path, 'w', encoding='utf8') as output_file:
                    output_file.write(html)
            except:
                logging.critical("Cannot write file {0}".format(path))

    def add_to_pdf_html(self, file):
        '''Adds HTML contents of a give file node to guide's
        PDF html string'''
        if file.tracked:
            for section_content in file.section.html_content:
                self.pdf_html += section_content

    def generate_pdf(self):
        '''Placeholder - pdf generation function'''
        pass

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
        self.path = os.path.join(self.parent.path, self.name) if self.parent else ''
        self.guide = self.parent.guide if parent else guide
        self.english_title = systemfunctions.from_kebab_case(self.name)
        if self.parent:
            self.title = self.guide.translations[self.english_title.lower()][self.guide.language_code]
        else:
            #Folder is root folder, name is not important
            self.title = self.english_title


    def add_folder(self, folder_name):
        """Add sub-folder to folders list. Updates dictionary
        of index references
        """
        if not folder_name in self.folders_dict:
            folder_node = FolderNode(folder_name, parent=self)
            self.folders.append(folder_node)
            self.folders_dict[folder_name] = len(self.folders) - 1

    def add_file(self, file_name, group_type, tracked=True):
        """Add file to files list. Updates dictionary
        of index references
        """
        file_node = FileNode(file_name, group_type, parent=self, tracked=tracked)
        self.files.append(file_node)
        self.files_dict[file_name] = len(self.files) - 1

    def get_folder(self, name):
        """return reference to sub-folder with given name"""
        if name:
            return self.folders[self.folders_dict[name]]
        else:
            return self

    def get_file(self, name):
        """return reference to contained file with given name"""
        return self.files[self.files_dict[name]]

    def __str__(self):
        """Function used for debugging to visualise structure tree"""
        string_template = "{indent}FOLDER: {} (Depth: {}, Path: {})\n"
        indent = (self.depth + 1) * '--'
        string = string_template.format(self.name, self.depth, self.path, indent=indent)
        for file in self.files:
            string += file.__str__()
        for folder in self.folders:
            string += folder.__str__()
        return string


class FileNode:
    """Node object for storing file details in structure tree"""
    def __init__(self, name, group_type, parent, tracked):
        self.filename = name
        self.group_type = group_type
        self.parent = parent
        self.section = None
        self.tracked = tracked
        self.depth = (parent.depth + 1)
        self.path = os.path.join(self.parent.path, self.filename)
        self.guide = self.parent.guide

    def generate_section(self, markdown_data):
        """Creates section object with given markdown data"""
        self.section = Section(self, markdown_data)

    def __str__(self):
        """Function used for debugging to visualise structure tree"""
        string_template = "{indent}FILE: {} (Depth: {}, Path: {}, Tracked: {})\n"
        indent = (self.depth + 1) * '--'
        string = string_template.format(self.filename, self.depth, self.path, self.tracked, indent=indent)
        return string


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
    guide_settings = systemfunctions.read_settings(GUIDE_SETTINGS)
    languages = guide_settings['Main']['Languages'].split()
    versions = guide_settings['Main']['Versions'].split()
    for language in languages:
        for version in versions:
            guide = Guide(guide_settings=guide_settings, language_code=language, version=version)
            if cmd_args.include_pdf:
                    pdf_guide = Guide(guide_settings=guide_settings, language_code=language, version=version, output_type=PDF)
    logging.shutdown()


if __name__ == "__main__":
    main()
