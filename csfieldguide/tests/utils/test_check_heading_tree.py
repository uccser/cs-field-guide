"""Test class for check_heading_tree module."""

from collections import namedtuple
from utils.check_heading_tree import check_heading_tree
from utils.errors.DuplicateHeadingFoundInMarkdownFileError import DuplicateHeadingFoundInMarkdownFileError
from tests.BaseTestWithDB import BaseTestWithDB


class CheckHeadingTreeTest(BaseTestWithDB):
    """Test class for check_heading_tree module."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.HeadingNode = namedtuple('HeadingNode', 'title, title_slug, level, children')

    def test_single_node_valid(self):
        heading_tree = (
            self.HeadingNode(
                title='H1',
                title_slug='h1',
                level=1,
                children=()
            ),
        )
        check_heading_tree(heading_tree, "md file path")

    def test_multiple_nodes_valid(self):
        heading_tree = (
            self.HeadingNode(
                title='One',
                title_slug='one',
                level=1,
                children=()
            ),
            self.HeadingNode(
                title='Two',
                title_slug='two',
                level=1,
                children=()
            ),
            self.HeadingNode(
                title='Three',
                title_slug='three',
                level=1,
                children=()
            ),
        )
        check_heading_tree(heading_tree, "md file path")

    def test_multiple_nodes_invalid(self):
        heading_tree = (
            self.HeadingNode(
                title='One',
                title_slug='one',
                level=1,
                children=()
            ),
            self.HeadingNode(
                title='One',
                title_slug='one',
                level=1,
                children=()
            ),
            self.HeadingNode(
                title='One',
                title_slug='one',
                level=1,
                children=()
            ),
        )
        self.assertRaises(
            DuplicateHeadingFoundInMarkdownFileError,
            check_heading_tree,
            heading_tree,
            "md file path",
        )

    def test_children_nodes_valid(self):
        heading_tree = (
            self.HeadingNode(
                title='H1',
                title_slug='h1',
                level=1,
                children=(
                    self.HeadingNode(
                        title='H2',
                        title_slug='h2',
                        level=2,
                        children=(
                            self.HeadingNode(
                                title='H6',
                                title_slug='h6',
                                level=6,
                                children=()
                            ),
                        )
                    ),
                )
            ),
        )
        check_heading_tree(heading_tree, "md file path")

    def test_children_nodes_invalid(self):
        heading_tree = (
            self.HeadingNode(
                title='H1',
                title_slug='h1',
                level=1,
                children=(
                    self.HeadingNode(
                        title='H2',
                        title_slug='h2',
                        level=2,
                        children=(
                            self.HeadingNode(
                                title='H1',
                                title_slug='h1',
                                level=6,
                                children=()
                            ),
                        )
                    ),
                )
            ),
        )
        self.assertRaises(
            DuplicateHeadingFoundInMarkdownFileError,
            check_heading_tree,
            heading_tree,
            "md file path",
        )
