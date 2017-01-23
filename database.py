# coding: utf-8
from functools import reduce
import time

import gspread
from oauth2client.service_account import ServiceAccountCredentials


class Database:
    def __init__(self, keyfile_path, sheet_name, interval):
        self.keyfile_path = keyfile_path
        self.sheet_name = sheet_name
        self.interval = interval
        self.update_from_google()

    def update_from_google(self):
        species, trait_codings = from_gsheet(self.keyfile_path,
                                             self.sheet_name)
        self.species = species
        self.trait_codings = trait_codings

    def run(self):
        while True:
            try:
                self.update_from_google()
            except Exception as e:
                print("Update from Google Sheet failed: {}".format(e.msg))
            time.sleep(self.interval)


def clean(string):
    if string == '' or string is None:
        return None
    return str(string).lower().strip()


def make_dict_from_cells(cells):
    headers, *rows = cells
    return make_dicts_from_rows(headers, rows)


def make_dicts_from_rows(headers, rows):
    headers_clean = [clean(h) for h in headers]
    rows_clean = [[clean(c) for c in r] for r in rows]
    return {clean(row[0]): dict(zip(headers_clean[1:], row[1:]))
            for row in rows_clean}


def merge_dicts(dict_of_dicts):
    all_keys = reduce(lambda m, n: m & n,
                      (set(d.keys()) for d in dict_of_dicts.values()))
    return {key: {clean(dict_name): dict_val.get(key, None)
                  for dict_name, dict_val in dict_of_dicts.items()} for key in all_keys}


def munge_species(traits, comments):
    species = {s: merge_dicts({"value": traits[s],
                               "comments": comments[s]})
               for s in traits}
    return species

def from_gsheet(keyfile_path, sheet_name):
    scope = ['https://spreadsheets.google.com/feeds']
    creds = ServiceAccountCredentials.from_json_keyfile_name(keyfile_path, scope)
    gc = gspread.authorize(creds)
    spreadsheet = gc.open(sheet_name)
    traits = spreadsheet.worksheet('Traits').get_all_values()
    comments = spreadsheet.worksheet('Comments').get_all_values()
    trait_codings = spreadsheet.worksheet('Trait codings').get_all_values()
    species = munge_species(
        make_dict_from_cells(traits),
        make_dict_from_cells(comments))
    return species, make_dict_from_cells(trait_codings)
