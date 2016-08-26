import unittest
from utils import title_case_species


class TitleSpeciesTestCase(unittest.TestCase):
    def test_title_case(self):
        fake_species_db = {
            "species": {
                "trait one": 1,
                "trait two": 0,
                "trait three": "hi ho",
                "trait four": None,
            }
        }
        title_cased = {
            "Species": {
                "Trait One": 1,
                "Trait Two": 0,
                "Trait Three": "Hi Ho",
                "Trait Four": None,
            }
        }
        self.assertEqual(title_case_species(fake_species_db), title_cased)

if __name__ == "__main__":
    unittest.main()
