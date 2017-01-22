import json
import os

from flask import Flask, render_template, request
from flask_cors import CORS
from database import from_gsheet
from utils import title_case_species, human_readable_traits

app = Flask(__name__)
CORS(app)


db, trait_codings = from_gsheet(os.getenv("OSTRACOD_VIEWER_JSON"),
                                "Ostracod Trait Matrix")


def substr_search(items, substr=""):
    matches = {species: traits
               for species, traits in items
               if substr.lower() in species}
    return matches


def trait_value_search(items, trait_name, selected_values):
    selected_values = [v for v in selected_values]
    if selected_values:
        matches = {species: traits
                   for species, traits in items
                   if traits[trait_name.lower()]["value"] in selected_values}
    else:
        matches = dict(items)
    return matches

@app.route("/filter")
def filter():
    name = request.args.get("name", "")
    try:
        traits = [(t, v) for t, v in json.loads(request.args.get("traits")).items() if v is not None]
    except TypeError:
        traits = []
    matches = substr_search(db.items(), name)
    for trait_name, selected_values in traits:
        matches = trait_value_search(matches.items(),
                                     trait_name,
                                     selected_values)
    longform_traits = {species: human_readable_traits(traits, trait_codings)
                       for species, traits in matches.items()}
    title_cased = title_case_species(longform_traits)
    sorted_matches = sorted(list(title_cased.items()))
    records = [
        {"name": name,
         "traits": sorted(traits, key=lambda x: x["name"])}
        for name, traits in sorted_matches
    ]
    return json.dumps(records)

@app.route("/trait_codings")
def get_trait_codings():
    records = [{"name": name, "info": info}
               for name, info in trait_codings.items()]
    return json.dumps(sorted(records, key=lambda x: x["name"]))
