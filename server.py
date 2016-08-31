from flask import Flask, render_template, request
from database import from_xlsx
from utils import title_case_species
import json
app = Flask(__name__)


db = from_xlsx("Trait Matrix.xlsx")



@app.route("/")
def index():
    return render_template("index.html")


@app.route("/all")
def look_at_everything():
    return json.dumps(title_case_species(db))


# @app.route("/prefix/")
# @app.route("/prefix/<prefix>")
def prefix_search(items, prefix=""):
    matches = {species: traits
               for species, traits in items
               if species.startswith(prefix.lower())}
    return matches


# @app.route("/trait/<trait>/<value>")
def trait_value_search(items, trait, value):
    matches = {species: traits
               for species, traits in items
               if traits[trait.lower()]["value"] == value}
    return matches

@app.route("/filter")
def filter():
    name = request.args.get("name")
    try:
        traits = [(t, v) for t, v in json.loads(request.args.get("traits")).items() if v is not None]
    except TypeError:
        traits = []
    matches = prefix_search(db.items(), name)
    print(traits)
    for trait, value in traits:
        matches = trait_value_search(matches.items(), trait, int(value))
    return json.dumps(title_case_species(matches))
