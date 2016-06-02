import os
import os.path
import requests
import shutil

class PrintRenderer(object):

    def __init__(self, generator_settings):
        self.generator_settings = generator_settings
        self.math_image_number = 1
        self.math_temporary_folder = self.generator_settings['PDF']['Math Temporary Folder'].strip()
        self.math_temporary_filename = 'math-image-{num}.png'
        self.create_temp_folder()

    def render_math(self, formula):
        """Renders the given formula as an image"""
        filename = self.math_temporary_filename.format(num=self.math_image_number)
        file_location = os.path.join(self.math_temporary_folder, filename)
        self.math_image_number += 1

        formula = formula.replace('\n', ' ')
        request = requests.get( 'http://latex.codecogs.com/png.latex?\dpi{{300}} {formula}'.format(formula=formula))
        image = open(file_location, 'wb')
        image.write(request.content)
        image.close()
        print('Create {} from {}'.format(filename, formula))
        return file_location

    def create_temp_folder(self):
        os.makedirs(self.math_temporary_folder, exist_ok=True)

    def delete_temp_folder(self):
        shutil.rmtree(self.math_temporary_folder)
