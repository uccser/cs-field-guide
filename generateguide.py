""" CSFG Guide Generator
AUTHOR: Jack Morgan
REQUIRES: Python >= 3.4.1
"""

"""Check and install dependencies if needed"""
import pip
# Update pip if needed
#pip.main(['install', '--upgrade', 'pip>=7.0.3'])
# Check dependencies
#pip.main(['install', '-r', 'generator/dependencies.conf'])

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
            #self.process_sections()
            #self.write_html_files()
            self.traverse_files(getattr(self, "process_section"))
            self.setup_html_output()
            self.traverse_files(getattr(self, "write_html_file"))


    def process_section(self, file_node):
        """Process the Section files
        Sets: - Section numbers
              - Converts raw into HTML
              - Adds Section's required files to Guide's required files
        """
        print(file_node.filename)
        file_node.section.parse_markdown_content(self.html_templates)
        for file_type,file_data in file_node.section.required_files.items():
            self.required_files[file_type] += file_data
        # section_number = 1
        # for group in self.structure.children:
        #     for section in group.children:
        #         if self.guide_settings[group.title].getboolean('Numbered'):
        #             section.set_number(section_number)
        #         if section.data.markdown_text:
        #             section.data.parse_markdown_content(self.html_templates)
        #         for file_type,file_data in section.data.required_files.items():
        #             self.required_files[file_type] += file_data
        #         if self.guide_settings[group.title].getboolean('Numbered'):
        #             section_number += 1


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
        #TODO: Needs to be extended to include assesment guides/different levels,temporary solution atm


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
        """BFS of structure tree, visits file nodes, and calls given function """
        folder_queue = [self.structure]
        while len(folder_queue) > 0:
            cur_folder = folder_queue.pop(0)
            folder_queue += cur_folder.folders
            for file in cur_folder.files:
                process_file_function(file)


    def read_content(self, file_node):
        text_root = 'text'
        template = self.generator_settings['Source']['Text Filename Template']
        file_path = template.format(folder_path=file_node.parent.path,
                                    title=file_node.filename,
                                    language=self.language)
        file_path = os.path.join(text_root, file_path)
        print('READING CONTENT FROM: ', file_path)
        """reads markdown from file and adds this to file node"""
        if file_exists(file_path):
            with open(file_path, 'r', encoding='utf8') as source_file:
                data = source_file.read()
                file_node.generate_section(data)


    # def create_file_path(self, title, group, language):
    #     template = self.generator_settings['Source']['Text Filename Template']
    #     file_name = template.format(title=title.replace(' ', '-').lower(), language=language)
    #     if group == 'Chapters':
    #         folder_name = title.replace(' ', '-').lower()
    #         path = os.path.join(self.generator_settings['Source']['Chapters'],
    #                             folder_name,
    #                             file_name)
    #     elif group == 'Appendices':
    #         path = os.path.join(self.generator_settings['Source']['Appendices'],
    #                             file_name)
    #     return path
    #

    def setup_html_output(self):
        base_folder = self.generator_settings['Output']['Folder'].format(language=self.language,
                                                                         version=self.version)
        image_source_folder = self.generator_settings['Source']['Images']
        image_output_folder = os.path.join(base_folder, self.generator_settings['Output']['Images'])
        # Create necessary folders
        os.makedirs(base_folder, exist_ok=True)
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
        """Writes the necessary HTML files
        Writes: - Chapter files
        """


        # TODO: Find best place for this type of function

        # for group in self.structure.children:
        #     for section in group.children:
        #         file_name = self.generator_settings['Output']['File'].format(file_name=section.title.replace(' ', '-').lower())
        #         section.link = os.path.join(base_folder, file_name)

        # top_menu_bar = []
        # for child in self.structure.children[0].return_children(1):
        #     top_menu_bar.append((child.title, child.link))

        # TODO: Add writing of Appendices
        body_html= ''
        section_template = 'website_chapter' #TODO: placeholder FIX THIS - > self.generator_settings['HTML'][group.title]

        if file.section.mathjax_required:
            body_html += '<script type="text/javascript"  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>'

        for section_content in file.section.html_content:
            body_html += section_content
        context = {'page_title':file.title, 'body_html':body_html)#, 'top_menu_bar':top_menu_bar}
        html = self.website_generator.render_template(section_template, context)
        try:
            with open(file.link, 'w', encoding='utf8') as output_file:
                output_file.write(html)
        except:
            logging.critical("Cannot write file {0}".format(file_name))




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
        folder_node = FolderNode(folder_name, parent=self)
        self.folders.append(folder_node)
        self.folders_dict[folder_name] = len(self.folders) - 1

    def add_file(self, file_name):
        file_node = FileNode(file_name, parent=self)
        self.files.append(file_node)
        self.files_dict[file_name] = len(self.files) - 1

    def get_folder(self, name):
        return self.folders[self.folders_dict[name]]

    def get_file(self, name):
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
        self.section = Section(self, markdown_data) #TODO: needs rest of arguments


class NumberGenerator:
    """Used to allocate numbers throughout guide"""
    def __init__(self):
        self.number_list = [None, 0]
        self.cur_level = 1

    def __str__(self):
        return '.'.join(str(num) for num in self.number_list[1:])

    def next(self, level):
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


# class Structure:
#     """Node object for storing guide structure data"""
#     def __init__(self, title, number=None, link=None, paginated_link=None, heading_level=None, data=None):
#         self.title = title
#         self.number = number
#         self.link = link
#         self.paginated_link = paginated_link
#         self.heading_level = heading_level
#         self.data = data
#         self.children = []
#
#     def return_children(self, depth):
#         children_list = []
#         for child in self.children:
#             children_list.append(child)
#             if depth > 1:
#                 children_list.append(child.return_children(depth - 1))
#         return children_list
#
#     def add_child(self, title, link=None, paginated_link=None, heading_level=None):
#         if self.number:
#             parent = self.find_parent_for_child(heading_level - 1)
#             child_number = parent.next_child_number()
#             child = Structure(title, link=link, paginated_link=paginated_link, number=child_number, heading_level=heading_level)
#             parent.children.append(child)
#         else:
#             child = Structure(title, link=link, paginated_link=paginated_link, heading_level=heading_level)
#             self.children.append(child)
#         return child
#
#     def set_number(self, number):
#         """Sets the number for the section"""
#         self.number = [number, 0, 0, 0, 0, 0]
#
#     def find_parent_for_child(self, depth):
#         """Returns the parent for a new child node"""
#         if depth > 1 and len(self.children) > 0:
#             return self.children[-1].find_parent_for_child(depth - 1)
#         else:
#             return self
#
#     def next_child_number(self):
#         number = list(self.number)
#         number[number.index(0)] = len(self.children) + 1
#         return number
#
#     def format_section_number(self):
#         """Return a nicely formatted version of the section number"""
#         if self.number:
#             formatted_number = ('.'.join(str(num) for num in self.number))
#             formatted_number = formatted_number[:formatted_number.find('0')]
#         else:
#             formatted_number = "No number assigned"
#         return formatted_number
#
#     def __str__(self, depth=1):
#         """Function used for debugging to visualise structure tree"""
#         string_template = "{} (Number: {}, Link: {}, Paginated Link: {} Data: {}, Num Children: {})\n"
#         string = string_template.format(self.title, self.format_section_number(), self.link, self.paginated_link, self.data, len(self.children))
#         if len(self.children) > 0:
#             for child in self.children:
#                 string += "--" * depth + child.__str__(depth+1)
#         return string


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
