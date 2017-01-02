from flask import Flask, render_template, request
from flask_cors import CORS
from database import from_xlsx
from utils import title_case_species
import json

app = Flask(__name__)
CORS(app)


db, trait_codings = from_xlsx("Trait Matrix.xlsx")


@app.route("/")
def index():
    return render_template("index.html", trait_codings=json.dumps(trait_codings))


@app.route("/all")
def look_at_everything():
    return json.dumps(title_case_species(db))


def substr_search(items, substr=""):
    matches = {species: traits
               for species, traits in items
               if substr.lower() in species}
    return matches


def trait_value_search(items, trait_name, selected_values):
    selected_values = [int(v) for v in selected_values]
    if selected_values:
        matches = {species: traits
                   for species, traits in items
                   if traits[trait_name.lower()]["value"] in selected_values}
    else:
        matches = dict(items)
    return matches

@app.route("/filter")
def filter():
    name = request.args.get("name")
    try:
        traits = [(t, v) for t, v in json.loads(request.args.get("traits")).items() if v is not None]
    except TypeError:
        traits = []
    matches = substr_search(db.items(), name)
    for trait_name, selected_values in traits:
        matches = trait_value_search(matches.items(),
                                     trait_name,
                                     selected_values)
    title_cased = title_case_species(matches)
    sorted_matches = sorted(list(title_cased.items()))
    records = [{"name": m[0], "traits": m[1]} for m in sorted_matches]
    return json.dumps(records)
