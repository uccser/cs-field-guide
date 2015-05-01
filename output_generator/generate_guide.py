import configparser
import collections
import logging
import os.path

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

OUTPUT_FOLDER = 'output/'

class Guide:
    def __init__(self):
        self.settings = self.read_settings()
        self.structure = self.parse_structure()
        self.language = self.parse_language()
        self.content = self.read_content(self.structure)
        
    def parse_language(self):
        """Returns language code for given setting"""
        # TODO: Handle all language names/codes
        language = self.settings['Main']['Language']
        if language.lower() in ['english', 'en']:
            return 'en'
        else:
            return 'en'

    def read_settings(self):
        """Read the setting file TODO: and handle errors"""
        settings = configparser.ConfigParser()
        settings.read(SETTINGS_FILE)
        return settings
        
    def parse_structure(self):
        """Create dictionary of guide structure"""
        structure = collections.defaultdict(list)
        for group in ['Chapters', 'Appendices']:
            order = self.settings[group]['Order']
            titles = order.split('\n')
            structure[group] = []
            for title in titles:
                stripped_title = title.strip()
                if stripped_title != '':
                    structure[group].append(stripped_title)
        return structure
            
    def read_content(self, structure):
        for group, titles in structure.items():
            for title in titles:
                file_path = self.create_file_path(title, group, self.language)
                print(file_path)
                if file_exists(file_path):
                    with open(file_path, "r", encoding='utf8') as source_file:
                        data = source_file.read()
                    source_file.close()               
                    print(data)
                    
    def create_file_path(self, title, group, language):
        file_name = FILE_NAME_TEMPLATE.format(title.replace(' ', '_').lower(), language)
        if group == 'Chapters':
            folder_name = title.replace(' ', '_').lower()
            path = os.path.join('..', PATH_CHAPTERS.format(folder_name), file_name)
        elif group == 'Appendices':
            path = os.path.join('..', PATH_APPENDICES, file_name)
        return path

    
class Section:
    def __init__(self, title, number, file_path):
        self.title = title
        self.file_path = file_path
        self.number = number
        self.raw_content = [] # List of lines
        self.html_content = [] # List of lines of lines


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
    input()
 
if __name__ == "__main__":  
    main()
