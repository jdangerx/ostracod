import json
import os
from threading import Thread
import time

from flask import Flask, request
from flask_cors import CORS
from database import Database
from utils import human_readable_traits

app = Flask(__name__)
CORS(app)

# interval is in seconds
db = Database(keyfile_path=os.getenv("OSTRACOD_VIEWER_JSON"),
              sheet_name="Ostracod Trait Matrix",
              interval=300)
Thread(target=db.run).start()


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
    matches = substr_search(db.species.items(), name)
    for trait_name, selected_values in traits:
        matches = trait_value_search(matches.items(),
                                     trait_name,
                                     selected_values)
    longform_traits = {species: human_readable_traits(traits, db.trait_codings)
                       for species, traits in matches.items()}
    sorted_matches = sorted(list(longform_traits.items()))
    records = [
        {"name": name,
         "traits": sorted(traits, key=lambda x: x["name"])}
        for name, traits in sorted_matches
    ]
    return json.dumps(records)


@app.route("/trait_codings")
def get_trait_codings():
    records = [{"name": name, "info": info}
               for name, info in db.trait_codings.items()]
    return json.dumps(sorted(records, key=lambda x: x["info"]["long name"]))

