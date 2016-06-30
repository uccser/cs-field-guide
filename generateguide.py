""" CSFG Guide Generator
AUTHORS: Jack Morgan, Jordan Griffiths
REQUIRES: Python >= 3.4.1
"""

import generator.systemfunctions as systemfunctions
from generator.systemconstants import *

LOG_FILE_PATH = 'output/log.txt'

cmd_args = systemfunctions.command_line_args()

import configparser
import logging.config
import os.path
import os
import re
from shutil import copy2
from distutils.dir_util import copy_tree
from generator.markdownsection import Section
from generator.websitegenerator import WebsiteGenerator
from generator.glossary import Glossary
from generator.files import setup_required_files
import generator.print_media as print_media
from scss.compiler import compile_string

class Guide:
    def __init__(self, generator_settings, language_code, version, html_generator, html_templates, regex_list, output_type=WEB,  teacher_version_present=False, pdf_version_present=False):

        # Alert user of creation process
        print('Creating CSFG - Language: {lang} - Version: {version} - Format: {output_type}'.format(lang=language_code, version=version, output_type=output_type))

        # Read settings
        self.generator_settings = generator_settings
        self.regex_list = regex_list
        self.permissions_location = PERMISSIONS_LOCATION
        self.files_with_permissions = set()
        self.html_generator = html_generator
        self.html_templates = html_templates

        self.language_code = language_code
        self.guide_settings = systemfunctions.read_settings(GUIDE_SETTINGS.format(language=self.language_code), 'yaml')
        self.language = self.guide_settings['language']
        self.translations = Translations(self.language_code, self.guide_settings['text_values'])
        self.version = version
        self.teacher_version_present = teacher_version_present
        self.pdf_version_present = pdf_version_present
        self.output_type = output_type
        self.setup_output_path()

        self.number_generator = NumberGenerator()
        self.glossary = Glossary(self)

        # Structure tree of guide
        self.structure = self.parse_structure()
        # Populates structure tree with markdown content
        self.traverse_files(self.structure, getattr(self, "read_content"))
        # Dictionary of sets for images, interactives, and other_files
        self.required_files = setup_required_files(self)

        if self.output_type == PDF:
            self.print_renderer = print_media.PrintRenderer(self.generator_settings)

        # Process sections
        self.traverse_files(self.structure, getattr(self, "process_section"))

        if self.output_type == WEB:
            self.setup_html_output()
            self.traverse_files(self.structure, getattr(self, "write_html_file"))
            self.copy_required_files()
        elif self.output_type == PDF:
            self.print_settings = {}
            self.pdf_html = ''
            self.setup_pdf_output()
            self.traverse_files(self.structure, getattr(self, "add_to_pdf_html"), True)
            self.generate_pdf()


    def setup_output_path(self):
        """Setup the path for output"""
        base_output_folder = os.path.join(self.generator_settings['Output']['Base Folder'], self.language_code)
        version_output_folder = self.generator_settings['Output'][self.version]
        self.output_folder = os.path.join(base_output_folder, version_output_folder)


    def parse_structure(self):
        """Create tree of guide structure using folder and file nodes"""
        root_folder = FolderNode('Home', guide=self)
        for content_data in self.guide_settings['structure']:
            content_type = list(content_data.keys())[0]
            content_settings = list(content_data.values())[0]
            for title_path in content_settings['source_files']:
                # Reset current folder to root
                current_folder = root_folder
                folder_path, file_name = os.path.split(title_path)
                folder_path = folder_path.split('/')
                # Navigate to correct folder
                while folder_path:
                    sub_folder_name = folder_path.pop(0)
                    if sub_folder_name:
                        # add_folder() ignores creation if folder exists
                        current_folder.add_folder(sub_folder_name)
                        current_folder = current_folder.get_folder(sub_folder_name)
                # Add file node if correct Markdown file exists
                text_root = self.generator_settings['Source']['Text Root'].format(language=self.language_code)
                file_path = os.path.join(text_root, current_folder.path, file_name)
                if file_exists(file_path):
                    current_folder.add_file(file_name, content_type, tracked=content_settings['listed'])
        return root_folder


    def traverse_files(self, start_node, process_file_function, index_page_first=False):
        """DFS of structure tree, visits file nodes, and calls given function
        on each file node found"""
        if index_page_first:
            for file in start_node.files:
                if file.filename == 'index':
                    process_file_function(file)
            for folder in start_node.folders:
                self.traverse_files(folder, process_file_function, index_page_first)
            for file in start_node.files:
                if not file.filename == 'index':
                    process_file_function(file)
        else:
            for folder in start_node.folders:
                self.traverse_files(folder, process_file_function, index_page_first)
            for file in start_node.files:
                process_file_function(file)


    def read_content(self, file_node):
        """Reads markdown file content into the section object of the
        file node.

        -   Reads markdown content from file using template
        -   Calls generate_section function of section object,
            passing through markdown contents
        """
        text_root = self.generator_settings['Source']['Text Root'].format(language=self.language_code)
        file_name = file_node.filename
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
            if not file_node.section.title:
                file_node.section.title = self.translations['project_title']
            if file_node.filename == self.permissions_location:
                for line in file_node.section.original_text:
                    if line.startswith('####'):
                        for word in line.split()[1:]:
                            self.files_with_permissions.add(word.lower().strip(','))


    def compile_scss_file(self, file_name):
        """Read given SCSS file, and compile to CSS"""
        scss_source_folder = self.generator_settings['Source']['SCSS']
        scss_source_file = os.path.join(scss_source_folder, file_name)
        try:
            with open(scss_source_file, 'r', encoding='utf8') as scss_file:
                scss_data = scss_file.read()
        except:
            logging.critical('Cannot find SCSS file {0}.'.format(file_name))
        else:
            # Add variables at start of SCSS data
            scss_data = '$version: "{}";\n{}'.format(self.version, scss_data)
            scss_data = '$title: "{}";\n{}'.format(self.translations['project_title'], scss_data)
            scss_data = '$website: "{}";\n{}'.format(self.guide_settings['website'], scss_data)
            scss_data = '$version_number: "{}";\n{}'.format(self.generator_settings['General']['Version Number'], scss_data)
            if self.output_type == WEB:
                font_path_prefix = '..'
            elif self.output_type == PDF:
                font_path_prefix = 'generator'
            scss_data = '$font-path-prefix: "{}";\n{}'.format(font_path_prefix, scss_data)

            # This lists all subfolders of SCSS source folder, this may cause issues
            # later, but is an effective solution for the moment
            scss_source_folders = [x[0] for x in os.walk(scss_source_folder)]
            compiled_css = compile_string(scss_data, search_path=scss_source_folders, output_style='compressed')
            return compiled_css


    def load_required_files(self, items):
        """Load website requried files"""
        for file_type,all_file_names in items:
            file_names = all_file_names.strip().split('\n')
            for file_name in file_names:
                if file_type == "SCSS":
                    css_string = self.compile_scss_file(file_name)
                    file_name = file_name.replace(".scss", ".css")
                    self.required_files["CSS"].add(file_name, css_string)
                else:
                    self.required_files[file_type].add(file_name)


    def copy_required_files(self):
        """Copy all required files"""
        for file_type,file_data in self.required_files.items():
            # Create folder for files
            file_output_folder = os.path.join(self.output_folder, self.generator_settings['Output'][file_type])
            os.makedirs(file_output_folder, exist_ok=True)
            # Copy files
            for file_object in file_data.filenames:
                file_name = file_object.filename
                # Checks if file is listed within permissions file
                file_name_tail = os.path.split(file_name.lower())[-1]
                if file_name_tail not in self.files_with_permissions and not file_type == 'Interactive':
                    logging.warning("No permissions information listed for {} {}".format(file_type, file_name_tail))

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
                                # Check if subfolders need to be created, as file may be contained in subfolder
                                # See 'Font' files as an example
                                if '/' in output_location:
                                    output_folder = os.path.split(output_location)[0]
                                    if not os.path.exists(output_folder):
                                        os.makedirs(output_folder, exist_ok=True)
                                copy2(source_location, output_location)

                        except:
                            logging.error("{file_type} {file_name} could not be copied".format(file_type=file_type, file_name=file_name))
                    else:
                        logging.error("{file_type} {file_name} could not be found".format(file_type=file_type,file_name=file_name))


    def setup_html_output(self):
        """Preliminary setup, called before html files are written.
        -   Load website required files
        -   Copy required files
        """
        # Create output folder
        os.makedirs(self.output_folder, exist_ok=True)

        # Load required files
        self.load_required_files(self.generator_settings['Website-Required-Files'].items())


    def write_html_file(self, file):
        """Writes the HTML file for a given file node"""
        # TODO:
        # -   Support all section templates (currently hardcoded)
        # -   Restructure with helper functions to allow for various
        #     components to be created in jinja2

        body_html= ''
        section_template = self.generator_settings['HTML'][file.group_type]

        if file.section:
            output_folder = os.path.join(self.output_folder, file.parent.path)

            path_to_guide_root = file.section.html_path_to_guide_root
            output_depth = 2 if self.version == 'teacher' else 1
            path_to_output_folder = output_depth * '../' + path_to_guide_root

            if file.section.mathjax_required:
                path_to_folder = os.path.join(file.section.html_path_to_guide_root, 'js')
                file.section.add_page_script(self.html_templates['mathjax'].format(path_to_folder=path_to_folder, mathjax_config=self.html_templates['mathjax-screen-config']))

            for section_content in file.section.html_content:
                body_html += section_content

            version_number = self.generator_settings['General']['Version Number']
            if 'alpha' in version_number:
                text = self.translations['pre-release-text']
                template = self.html_templates['pre-release-notice']
                prerelease_html = template.format(text=text)
            else:
                prerelease_html = ''

            if self.version == 'teacher':
                file_name = '{file_name}.html'.format(file_name=file.filename_without_extension)
                path_to_student_page = os.path.join('../', path_to_guide_root, file.parent.path, file_name)
                version_link_text = self.translations['teacher_link_to_student_text']
                template = self.html_templates['version_link_html']
                version_link_html = template.format(text=version_link_text,
                                                    path_to_student_page=path_to_student_page)
            else:
                version_link_html = ''

            ## If homepage
            if file in self.structure.files and file.filename == 'index.md':
                if self.version == 'teacher':
                    subtitle = '<h3>Teacher Version</h3>'
                else:
                    subtitle = ''
                page_heading = self.html_templates['website_homepage_header'].format(subtitle=subtitle)
                if self.pdf_version_present:
                    filename = self.generator_settings['PDF']['Output File'].strip().format(self.version.capitalize())
                    output_path = os.path.join(self.output_folder, filename)
                    filesize = os.path.getsize(output_path) / 1024 / 1024
                    pdf_button = self.html_templates['website_homepage_pdf_button'].format(filesize=filesize, path_to_pdf=filename)
                else:
                    pdf_button = ''
                body_html = self.html_templates['website_homepage_content'].format(path_to_guide_root=file.section.html_path_to_guide_root, prerelease_notice=prerelease_html, pdf_button=pdf_button)
            else:
                page_heading = file.section.heading.to_html()

            if os.sep in file.path:
                current_folder = file.path.split(os.sep)[0]
            else:
                current_folder = None

            context = {'page_title': file.section.title,
                       'page_heading': page_heading,
                       'body_html': body_html,
                       'path_to_guide_root': path_to_guide_root,
                       'path_to_output_root': path_to_output_folder,
                       'project_title': self.translations['project_title'],
                       'project_title_abbreviation': self.translations['project_title_abbreviation'],
                       'translations': self.translations,
                       'root_folder': self.structure,
                       'heading_root': file.section.heading,
                       'language_code': self.language_code,
                       'page_scripts': file.section.page_scripts,
                       'current_page': file.path,
                       'current_folder': current_folder,
                       'analytics_code': self.generator_settings['General']['Google Analytics Code'],
                       'version': self.version,
                       'version_number': version_number,
                       'prerelease_notice': prerelease_html,
                       'version_link_html': version_link_html,
                       'contributors_path': path_to_guide_root + 'further-information/contributors.html'
                      }
            write_html_file(self.html_generator, output_folder, file.filename_without_extension, section_template, context)

    def convert_to_print_link(self, path, is_anchor=False):
        """Converts a path used for WEB media to a single string (for either anchor
        or link) for use in PDF media."""
        path = path.replace('/', '-').replace('#', '')
        if path.endswith('.html'):
            path = path[:-5]
        else:
            path = path.replace('.html', '-')
        if is_anchor:
            path = '#' + path
        return path



    def setup_pdf_output(self):
        """Preliminary setup for output, called before pdf file is written
        - Creates output folder
        """
        # Create output folder
        os.makedirs(self.output_folder, exist_ok=True)

        if self.version == 'teacher':
            subtitle = '\n<p class="print-second-subtitle">Teacher Version</p>'
        else:
            subtitle = ''
        self.pdf_html += self.html_templates['print_title_page'].format(subtitle=subtitle, version_number=self.generator_settings['General']['Version Number'])
        context = {
            'path_to_guide_root': '',
            'version_number': self.generator_settings['General']['Version Number'],
            'contributors_path': '#further-information-contributors'
            }
        self.pdf_html += self.html_generator.render_template( 'website_footer', context)


    def add_to_pdf_html(self, file):
        """Adds HTML contents of a give file node to guide's PDF html string"""
        mathjax_required = False
        if file.tracked or (file.filename == 'index' and not file in self.structure.files):
            # Add page heading
            self.pdf_html += file.section.heading.to_html()
            # Add page id link
            self.pdf_html += self.html_templates['link'].format(link_url=self.convert_to_print_link(file.path), link_text='')
            # Add page content
            for section_content in file.section.html_content:
                self.pdf_html += section_content


    def generate_pdf(self):
        """Creates a PDF file of the CSFG"""
        from weasyprint import HTML, CSS
        filename = self.generator_settings['PDF']['Output File'].strip().format(self.version.capitalize())
        # Wrap print HTML within classed div
        self.pdf_html = self.html_templates['print_html'].format(html=self.pdf_html)
        output_path = os.path.join(self.output_folder, filename)
        base_url = ''
        stylesheets = [CSS(string=self.compile_scss_file('website.scss'))]
        HTML(string=self.pdf_html, base_url=base_url).write_pdf(output_path, stylesheets=stylesheets)


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
        self.title = self.name


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
    def __init__(self, filename, group_type, parent, tracked):
        self.filename = filename
        self.filename_without_extension = self.filename.rsplit('.', 1)[0]
        self.group_type = group_type
        self.parent = parent
        self.section = None
        self.tracked = tracked
        self.depth = (parent.depth + 1)
        self.path = os.path.join(self.parent.path, self.filename_without_extension)
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


class Translations(dict):
    """Translations dictionary that automatically logs error if
    key not found"""
    def __init__(self, language_code, *args, **kwargs):
        self.language_code = language_code
        self.update(*args, **kwargs)

    def __getitem__(self, text):
        """Returns a text translation for the given key. If the key is not found, an error is logged and an empty string is returned."""
        try:
            value = dict.__getitem__(self, text)
        except KeyError:
            logging.error("Cannot find '{}' text translation for '{}'".format(self.language_code, text))
            return ''
        else:
            return value


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


def start_logging():
    """Sets up the logger to write to a file"""
    logging.config.fileConfig(LOGFILE_SETTINGS)


def finish_logging():
    """Closes the logging file and displays summary"""
    logging.shutdown()

    log_file = open(LOG_FILE_PATH)
    log_message = log_file.readlines()
    log_file.close()

    log_levels = {}
    for message in log_message:
        level = message.split(' ')[2]
        log_levels[level] = log_levels.get(level, 0) + 1

    print('\nGeneration completed successfully!\n\nOutput summary:')

    for (level, count) in sorted(log_levels.items()):
        print('- {level}: {count} issues'.format(level=level.capitalize(), count=count))

    print('\nSee output file ({path}) for more details.'.format(path=LOG_FILE_PATH))

def file_exists(file_path):
    if os.path.exists(file_path):
        return True
    else:
        logging.error("File {0} does not exist".format(file_path))
        return False


def read_html_templates(generator_settings):
    """Read html templates from html-templates.conf into dictionary"""
    html_templates = {}
    html_template_file = generator_settings['Source']['HTML Templates']
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
                    html_templates[template_name] = template_text.strip()
                    template_text = ''
                elif not reading_template and search.group('template_name'):
                    reading_template = True
                    template_name = search.group('template_name')
            elif reading_template:
                template_text += line
    return html_templates


def write_html_file(html_generator, output_folder, filename, template, context):
    """ Write a given HTML file"""
    # Create output folder
    if output_folder:
        os.makedirs(output_folder, exist_ok=True)

    # Create full output path
    file_name = '{file_name}.html'.format(file_name=filename)
    path = os.path.join(output_folder, file_name)

    # Write HTML
    html = html_generator.render_template(template, context)
    try:
        with open(path, 'w', encoding='utf8') as output_file:
            output_file.write(html)
    except:
        logging.critical("Cannot write file {0}".format(path))


def create_landing_page(outputted_languages, html_generator, generator_settings):
    """Create and write landing page with language list"""
    context = {'project_title': 'Computer Science Field Guide',
        'language_code': outputted_languages[0][0],
        'languages': outputted_languages,
        'path_to_guide_root': outputted_languages[0][0] + '/',
        'analytics_code': generator_settings['General']['Google Analytics Code'],
        'version_number': generator_settings['General']['Version Number']
        }
    output_folder = generator_settings['Output']['Base Folder']
    write_html_file(html_generator, output_folder, 'index', 'website_page_landing', context)


def main():
    """Creates a Guide object"""
    start_logging()
    generator_settings = systemfunctions.read_settings(GENERATOR_SETTINGS)
    regex_list = systemfunctions.read_settings(REGEX_LIST)
    html_templates = read_html_templates(generator_settings)
    html_generator = WebsiteGenerator(html_templates)

    # Calculate versions to create
    versions = ['student']
    if cmd_args.teacher_output:
        versions.append('teacher')

    outputted_languages = []

    # Create all specified CSFG
    for language in cmd_args.languages:
        for version in versions:
            if cmd_args.include_pdf or cmd_args.pdf_only:
                pdf_guide = Guide(generator_settings=generator_settings, language_code=language, version=version, output_type=PDF, html_generator=html_generator, html_templates=html_templates, regex_list=regex_list)
            if not cmd_args.pdf_only:
                guide = Guide(generator_settings=generator_settings, language_code=language, version=version, html_generator=html_generator, html_templates=html_templates, regex_list=regex_list, teacher_version_present=cmd_args.teacher_output, pdf_version_present=cmd_args.include_pdf)
                outputted_languages.append((guide.language_code, guide.language))

    # Create landing page if website required
    if not cmd_args.pdf_only:
        create_landing_page(outputted_languages, html_generator, generator_settings)

    finish_logging()


if __name__ == "__main__":
    main()
