import os.path
import logging

GLOSSARY_PATH_TO_ROOT = '..'

class Glossary:
    def __init__(self, guide):
        self.items = {}
        self.guide = guide
        self.html_path_to_root = GLOSSARY_PATH_TO_ROOT

    def add_item(self, word, definition, permalink):
        if word.lower() in self.items.keys():
            #already defined
            logging.error('{} already defined in glossary'.format(word))
        else:
            glossary_item = GlossaryItem(self, word, definition, permalink)
            self.items[word.lower()] = glossary_item

    def add_reverse_link(self, word, permalink, text):
        if word.lower() in self.items.keys():
            self.items[word.lower()].add_reverse_link(permalink, text)
        else:
            logging.error('{} not defined in glossary'.format(word))



class GlossaryItem:
    def __init__(self, glossary, word, definition, permalink):
        self.glossary = glossary
        self.word = word.lower()
        self.displayed_word = word
        self.definition = definition
        self.permalink = permalink
        self.other_occurences = []


    def add_reverse_link(self, permalink, text):
        self.other_occurences.append((permalink, text))


    def to_html(self):
        template = self.glossary.guide.html_templates['glossary_item']
        link_template = self.glossary.guide.html_templates['glossary_backwards_link']
        occurences_template = self.glossary.guide.html_templates['glossary_other_occurences']
        backwards_links = ''
        if len(self.other_occurences) >= 1:
            for link, text in self.other_occurences[:-1]:
                backwards_links += '{}, '.format(link_template.format(permalink=link, text=text))
            backwards_links += 'and ' if len(self.other_occurences) > 1 else ''
            link, text = self.other_occurences[-1]
            backwards_links +=link_template.format(permalink=link, text=text)
            backwards_links = occurences_template.format(other_links=backwards_links)

        return template.format(word=self.displayed_word, lower_word = self.word, permalink=self.permalink, definition=self.definition, other_links=backwards_links)
