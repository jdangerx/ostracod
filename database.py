# coding: utf-8
import openpyxl
from functools import reduce


def clean(string):
    return string.lower().strip()


def make_dicts_from_rows(headers, rows):
    headers_clean = [clean(h) for h in headers]
    return {clean(row[0]): dict(zip(headers_clean[1:], row[1:])) for row in rows}


def merge_dicts(dict_of_dicts):
    all_keys = reduce(lambda m, n: m & n,
                      (set(d.keys()) for d in dict_of_dicts.values()))
    return {key: {clean(dict_name): dict_val.get(key, None)
                  for dict_name, dict_val in dict_of_dicts.items()} for key in all_keys}


def from_xlsx(filepath):
    wb = openpyxl.load_workbook(filepath)

    traits_sheet = wb.get_sheet_by_name("Traits")
    comments_sheet = wb.get_sheet_by_name("Comments")

    trait_names, *species_info = [[c.value for c in r]
                                  for r in traits_sheet["A3":"U{:d}".format(traits_sheet.max_row)]]
    comment_trait_names, *species_comments = [[c.value for c in r]
                                              for r in comments_sheet["A3":"U{:d}".format(comments_sheet.max_row)]]
    traits = make_dicts_from_rows(trait_names, species_info)
    comments = make_dicts_from_rows(comment_trait_names, species_comments)

    species = {s: merge_dicts({"value": traits[s], "comments": comments[s]}) for s in traits}
    return species
