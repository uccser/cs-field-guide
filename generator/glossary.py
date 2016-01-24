import os.path
import logging
import generator.systemfunctions as systemfunctions

GLOSSARY_PATH_TO_ROOT = '..'

class Glossary:
    def __init__(self, guide):
        self.items = {}
        self.guide = guide
        self.html_path_to_root = GLOSSARY_PATH_TO_ROOT

    def __contains__(self, term):
        return systemfunctions.to_kebab_case(term) in self.items.keys()

    def add_item(self, term, definition, back_link, match):
        term_id = systemfunctions.to_kebab_case(term)
        if term_id in self.items.keys():
            # Already defined
            self.guide.regex_functions['glossary definition'].log("{} already defined in glossary".format(term), self, match.group(0))
        else:
            glossary_item = GlossaryItem(self, term, definition, back_link)
            self.items[term_id] = glossary_item

    def add_back_link(self, term, back_permalink, text, match):
        term_id = systemfunctions.to_kebab_case(term)
        if term_id in self.items.keys():
            self.items[term_id].add_back_link(back_permalink, text)
        else:
            self.guide.regex_functions['glossary definition'].log("'{} not defined in glossary".format(term), self, match.group(0))



class GlossaryItem:
    def __init__(self, glossary, term, definition, back_permalink):
        self.glossary = glossary
        self.term_id = systemfunctions.to_kebab_case(term)
        self.displayed_term = term
        self.definition = definition
        self.back_permalink = back_permalink
        self.other_occurences = []


    def add_back_link(self, back_permalink, text):
        self.other_occurences.append((back_permalink, text))


    def to_html(self):
        template = self.glossary.guide.html_templates['glossary_item']
        link_template = self.glossary.guide.html_templates['glossary_backwards_link']
        occurences_template = self.glossary.guide.html_templates['glossary_other_occurences']
        backwards_links = ''
        if len(self.other_occurences) >= 1:
            for link, text in self.other_occurences[:-1]:
                link_html = ' href="{}"'.format(link)
                backwards_links += '{}, '.format(link_template.format(link_html=link_html,
                                                 id_html='',
                                                 content=text).strip())
            backwards_links += 'and ' if len(self.other_occurences) > 1 else ''
            link, text = self.other_occurences[-1]
            link_html = ' href="{}"'.format(link)
            backwards_links += link_template.format(link_html=link_html,
                                                    id_html='',
                                                    content=text)
            backwards_links = occurences_template.format(other_links=backwards_links)

        return template.format(term=self.displayed_term, term_id=self.term_id, back_permalink=self.back_permalink, definition=self.definition, other_links=backwards_links)
