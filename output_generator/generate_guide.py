import configparser

SETTINGS_FILE = 'settings.ini'

class Guide:
    def __init__(self):
        self.settings = read_settings()
    
def read_settings():
    """Read the setting file TODO: and handle errors"""
    settings = configparser.ConfigParser()
    settings.read(SETTINGS_FILE)
    return settings

def main():
    """Creates a Guide object"""
    guide = Guide()
 
if __name__ == "__main__":  
    main()