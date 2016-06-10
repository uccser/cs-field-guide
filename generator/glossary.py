import os.path
import logging
import generator.systemfunctions as systemfunctions
from generator.systemconstants import *

GLOSSARY_PATH_TO_ROOT = '..'

class Glossary:
    def __init__(self, guide):
        self.items = {}
        self.guide = guide
        self.html_path_to_guide_root = GLOSSARY_PATH_TO_ROOT

    def __contains__(self, term):
        return systemfunctions.to_kebab_case(term) in self.items.keys()

    def add_item(self, term, definition, back_permalink, match, section):
        term_id = systemfunctions.to_kebab_case(term)
        if term_id in self.items.keys():
            glossary_item = self.items[term_id]
            if glossary_item.defined == False:
                glossary_item.definition = definition
                glossary_item.back_permalink = back_permalink
                glossary_item.defined = True
            else:
                # Already defined
                section.regex_functions['glossary definition'].log("{} already defined in glossary".format(term), section, match.group(0))
        else:
            glossary_item = GlossaryItem(self, term, definition, back_permalink)
            self.items[term_id] = glossary_item

    def add_back_link(self, term, back_permalink, text, match, section):
        term_id = systemfunctions.to_kebab_case(term)
        if term_id not in self.items.keys():
            glossary_item = GlossaryItem(self, term, defined=False)
            self.items[term_id] = glossary_item
        self.items[term_id].add_back_link(back_permalink, text)

    def set_glossary_depth_for_print_html(self, depth):
        self.glossary_depth = depth


class GlossaryItem:
    def __init__(self, glossary, term, definition=None, back_permalink=None, defined=True):
        self.glossary = glossary
        self.term_id = systemfunctions.to_kebab_case(term)
        self.displayed_term = term
        self.definition = definition
        self.back_permalink = back_permalink
        self.other_occurences = []
        self.defined = defined

    def add_back_link(self, back_permalink, text):
        self.other_occurences.append((back_permalink, text))

    def to_html(self):
        if self.defined:
            template = self.glossary.guide.html_templates['glossary_item']
            link_template = self.glossary.guide.html_templates['glossary_backwards_link'].strip()
            occurences_template = self.glossary.guide.html_templates['glossary_other_occurences']
            backwards_links = ''
            if len(self.other_occurences) >= 1:
                for link, text in self.other_occurences[:-1]:
                    link_html = " href='{}'".format(link)
                    backwards_links += '{}, '.format(link_template.format(link_html=link_html,
                                                     id_html='',
                                                     content=text,
                                                     tag='span',
                                                     whitespace_before='',
                                                     whitespace_after=''))
                backwards_links += 'and ' if len(self.other_occurences) > 1 else ''
                link, text = self.other_occurences[-1]
                link_html = " href='{}'".format(link)
                backwards_links += link_template.format(link_html=link_html,
                                                        id_html='',
                                                        content=text,
                                                        tag='span',
                                                        whitespace_before='',
                                                        whitespace_after='')
                backwards_links = occurences_template.format(other_links=backwards_links)

            if self.glossary.guide.output_type == WEB:
                heading_level = 3
                extra_classes = ''
                term_id=self.term_id
            elif self.glossary.guide.output_type == PDF:
                heading_level = self.glossary.glossary_depth + 3
                extra_classes = ' print-heading-3'
                term_id= 'further-information-glossary-' + self.term_id

            return template.format(term=self.displayed_term, term_id=term_id, back_permalink=self.back_permalink, definition=self.definition, other_links=backwards_links, heading_level=heading_level, extra_classes=extra_classes)
        else:
            logging.error("No glossary definition of {} found".format(self.displayed_term))
            return ''
