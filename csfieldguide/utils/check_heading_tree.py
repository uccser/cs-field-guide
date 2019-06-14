"""Check for any duplicate headings in the heading tree."""

from utils.errors.DuplicateHeadingFoundInMarkdownFileError import DuplicateHeadingFoundInMarkdownFileError


def check_heading_tree(heading_tree, md_file_path):
    title_slugs = set()
    for node in heading_tree:
        traverse_node(node, title_slugs, md_file_path)


def traverse_node(node, title_slugs, md_file_path):
    if node.title_slug in title_slugs:
        raise DuplicateHeadingFoundInMarkdownFileError(md_file_path)
    else:
        title_slugs.add(node.title_slug)

    if node.children:
        for child_node in node.children:
            traverse_node(child_node, title_slugs, md_file_path)
