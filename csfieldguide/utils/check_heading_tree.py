"""Check for any duplicate headings in the heading tree."""

from utils.errors.DuplicateHeadingFoundInMarkdownFileError import DuplicateHeadingFoundInMarkdownFileError


def check_heading_tree(heading_tree, md_file_path):
    """Check all heading slugs are unique in tree.

    Args:
        heading_tree (NamedTuples): Tree of heading nodes.
        md_file_path (str): Path of file being processed.
    """
    title_slugs = set()
    for node in heading_tree:
        traverse_node(node, title_slugs, md_file_path)


def traverse_node(node, title_slugs, md_file_path):
    """Check all heading slugs are unique in tree.

    Args:
        node (NamedTuple): Node of heading tree.
        title_slugs (set): Set of encountered title slugs so far.
        md_file_path (str): Path of file being processed.

    Raises:
        DuplicateHeadingFoundInMarkdownFileError if title slug already used.
    """
    if node.title_slug in title_slugs:
        raise DuplicateHeadingFoundInMarkdownFileError(md_file_path)
    else:
        title_slugs.add(node.title_slug)

    if node.children:
        for child_node in node.children:
            traverse_node(child_node, title_slugs, md_file_path)
