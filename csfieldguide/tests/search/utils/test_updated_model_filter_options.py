from tests.BaseTest import BaseTest
from search.utils import updated_model_filter_options


class UpdatedModelFilterOptionsTest(BaseTest):

    def test_updated_model_filter_options_single_selected(self):
        model_options = [
            {
                'name': 'Model A',
                'value': 'test.model_a',
                'selected': False,
            },
            {
                'name': 'Model B',
                'value': 'test.model_b',
                'selected': False,
            },
            {
                'name': 'Model C',
                'value': 'test.model_c',
                'selected': False,
            },
        ]
        selected_options = ['test.model_b']
        result = updated_model_filter_options(model_options, selected_options)
        expected = [
            {
                'name': 'Model A',
                'value': 'test.model_a',
                'selected': False,
            },
            {
                'name': 'Model B',
                'value': 'test.model_b',
                'selected': True,
            },
            {
                'name': 'Model C',
                'value': 'test.model_c',
                'selected': False,
            },
        ]
        self.assertListEqual(result, expected)
        for i in range(0, len(expected)):
            self.assertDictEqual(result[i], expected[i])

    def test_updated_model_filter_options_multiple_selected(self):
        model_options = [
            {
                'name': 'Model A',
                'value': 'test.model_a',
                'selected': False,
            },
            {
                'name': 'Model B',
                'value': 'test.model_b',
                'selected': False,
            },
            {
                'name': 'Model C',
                'value': 'test.model_c',
                'selected': False,
            },
        ]
        selected_options = ['test.model_b', 'test.model_c']
        result = updated_model_filter_options(model_options, selected_options)
        expected = [
            {
                'name': 'Model A',
                'value': 'test.model_a',
                'selected': False,
            },
            {
                'name': 'Model B',
                'value': 'test.model_b',
                'selected': True,
            },
            {
                'name': 'Model C',
                'value': 'test.model_c',
                'selected': True,
            },
        ]
        self.assertListEqual(result, expected)
        for i in range(0, len(expected)):
            self.assertDictEqual(result[i], expected[i])

    def test_updated_model_filter_options_none_selected(self):
        model_options = [
            {
                'name': 'Model A',
                'value': 'test.model_a',
                'selected': False,
            },
            {
                'name': 'Model B',
                'value': 'test.model_b',
                'selected': False,
            },
            {
                'name': 'Model C',
                'value': 'test.model_c',
                'selected': False,
            },
        ]
        selected_options = []
        result = updated_model_filter_options(model_options, selected_options)
        expected = [
            {
                'name': 'Model A',
                'value': 'test.model_a',
                'selected': False,
            },
            {
                'name': 'Model B',
                'value': 'test.model_b',
                'selected': False,
            },
            {
                'name': 'Model C',
                'value': 'test.model_c',
                'selected': False,
            },
        ]
        self.assertListEqual(result, expected)
        for i in range(0, len(expected)):
            self.assertDictEqual(result[i], expected[i])
