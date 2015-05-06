""" CSFG Guide Generator
AUTHOR: Jack Morgan
"""

import configparser
import collections
import logging
import os.path
from markdown_parser import parse 

SETTINGS_FILE = 'settings.ini'
LOGFILE_NAME = 'log.txt'
LOGFILE_FOLDER = '../output/'
# TODO: Determine which variables should be in settings file

FILE_NAME_TEMPLATE = '{0}_{1}.md'
PATH_CHAPTERS = 'text/{0}'
PATH_APPENDICES = 'text/appendices/'
PATH_STATIC_PAGES = 'text/static_pages/'
PATH_INTERACTIVES = 'interactives/'
PATH_FILES = 'files/'
TEXT_GROUPS = ['Chapters', 'Appendices'] # Order of sections

OUTPUT_FOLDER = 'output/'


class Guide:
    def __init__(self):
        self.settings = self.read_settings()
        self.structure = self.parse_structure()
        self.language = self.parse_language()
        self.content = self.read_content(self.structure)
        self.required_files = {} # Dictionary of tuples (type, name)
        
        self.process_sections()
    
    
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
                    section.number = section_number
                    section.parse_raw_data(section.raw_content)
                    self.required_files.update(section.required_files)
                    section_number += 1
                    
        
        
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
        settings.read(SETTINGS_FILE)
        
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
                    with open(file_path, "r", encoding='utf8') as source_file:
                        data = source_file.read()
                    source_file.close()               
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
    
    
class Section:
    def __init__(self, title, data, file_path):
        self.title = title
        self.raw_content = data
        self.file_path = file_path
        self.html_content = [] # List of lines of lines
        self.required_files = {}


    def number(self, number):
        self.number = number
       
    
    def parse_raw_data(self, raw):
        """Converts the raw data into HTML using the parser
        TODO: Handle if data doesn't exist
        """
        if raw != None:
            self.html_content = parse(raw)


def file_exists(file_path):
    if os.path.exists(file_path):
        return True
    else:
        logging.error("File {0} does not exist".format(file_path))
        return False


def setup_logging():
    """Sets up the logger to write to a file"""
    logging.basicConfig(level=logging.DEBUG,
                        filename=os.path.join(LOGFILE_FOLDER, LOGFILE_NAME),
                        filemode="w",
                        format="%(asctime)-15s %(levelname)-8s %(message)s")  


def main():
    """Creates a Guide object"""
    setup_logging()
    guide = Guide()
    logging.shutdown()
 
 
if __name__ == "__main__":  
    main()
