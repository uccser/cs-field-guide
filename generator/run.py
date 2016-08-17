import json
import os
import mdx_math
import markdown
import sys
from collections import defaultdict
import shutil
import kordac.csfg_extension as csfg_ext

PAGE_TEMPLATE = "generator/page_template.html"

class Page(object):
    def __init__(self, src, lang, num):
        assert os.path.exists(src)
        with open(src) as f:
            self.raw = f.read()
        with open(PAGE_TEMPLATE) as f:
            self.template = f.read()

        self.lang = lang
        self.num = num
        self.title = None
        self.mdx = csfg_ext.CSFGExtension()
        self.required_files = {}

    def parse(self):
        html = markdown.markdown(self.raw, extensions=[
            'markdown.extensions.fenced_code',
            'markdown.extensions.codehilite',
            'markdown.extensions.sane_lists',
            mdx_math.MathExtension(enable_dollar_delimiter=True),
            self.mdx
        ])
        self.title = self.mdx.page_heading
        self.required_files = self.mdx.required_files
        return html

class Guide(object):
    def __init__(self, structure):
        self.structure = structure
        self.required_files = defaultdict(set)

    def generate(self):
        for name, translations in self.structure['chapters'].items():
            for language, params in translations.items():
                page = Page(
                    src=os.path.join("text", language, "chapters", "{}.md".format(name)),
                    lang=["language"],
                    num=params["page_number"]
                )
                html = page.parse()
                params["title"] = page.title
                path = os.path.join("output", "templates", "chapter", language, "{}.html".format(name))
                if not os.path.exists(os.path.dirname(path)):
                    os.makedirs(os.path.dirname(path))
                with open(path, 'w') as f:
                    f.write(html)
                for filetype, filenames in page.required_files.items():
                    self.required_files[filetype] |= filenames


        self.copy_static_files()

        with(open(os.path.join("output", "structure.json"), 'w')) as f:
            json.dump(self.structure, f, indent=4)

    def copy_static_files(self):
        outdir = 'output/static/main/images'
        if not os.path.exists(outdir):
            os.makedirs(outdir)

        for filename in self.required_files['images']:
            shutil.copy(os.path.join('images', filename), outdir)

        outdir = 'output/static/main/files'
        if not os.path.exists(outdir):
            os.makedirs(outdir)


        templatesdir = os.path.join('output/templates/interactive')
        staticdir = os.path.join('output/static/interactive')
        if not os.path.exists(templatesdir):
            os.makedirs(templatesdir)
        if not os.path.exists(staticdir):
            os.makedirs(staticdir)

        for iname in self.required_files['interactives']:
            shutil.copytree(os.path.join('interactives', iname), os.path.join(staticdir, iname))
            os.makedirs(os.path.join(templatesdir, iname))
            shutil.move(os.path.join(staticdir, iname, 'index.html'), os.path.join(templatesdir, iname))
            try:
                shutil.move(os.path.join(staticdir, iname, 'scripts.html'), os.path.join(templatesdir, iname))
            except:
                open(os.path.join(templatesdir, iname, 'scripts.html'), 'a').close()



def run():
    if os.path.exists('output'):
        shutil.rmtree('output')
    with open('generator/structure.json') as f:
        structure = json.load(f)
    guide = Guide(structure=structure)
    guide.generate()
