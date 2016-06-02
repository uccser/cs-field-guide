import os
import os.path
import requests
import shutil
import hashlib

class PrintRenderer(object):

    def __init__(self, generator_settings):
        self.generator_settings = generator_settings
        self.math_image_filename = 'math-image-{hash}.png'
        self.math_cache_folder = self.generator_settings['PDF']['Math Cache Folder'].strip()
        self.create_cache_folder()


    def render_math(self, formula):
        """Renders the given formula as an image"""
        filename = self.math_image_filename.format(hash=hashlib.sha1(formula.encode('utf-8')).hexdigest())
        file_location = os.path.join(self.math_cache_folder, filename)
        if not os.path.isfile(file_location):
            formula = formula.replace('\n', ' ')
            request = requests.get( 'http://latex.codecogs.com/png.latex?\dpi{{120}} {formula}'.format(formula=formula))
            image = open(file_location, 'wb')
            image.write(request.content)
            image.close()
            print('Created {} from {}'.format(filename, formula))
        else:
            print('Found existing image {} for {}'.format(file_location, formula))
        return file_location


    def create_cache_folder(self):
        """Creates the folder for creating and caching print media"""
        os.makedirs(self.math_cache_folder, exist_ok=True)
