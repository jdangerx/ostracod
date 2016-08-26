from flask import Flask
from database import from_xlsx
from utils import title_case_species
import json
app = Flask(__name__)


db = from_xlsx("Trait Matrix.xlsx")


@app.route("/")
def look_at_everything():
    return json.dumps(title_case_species(db))


@app.route("/prefix/<prefix>")
def prefix_search(prefix):
    matches = {species: traits
               for species, traits in db.items()
               if species.startswith(prefix.lower())}
    return json.dumps(title_case_species(matches))


@app.route("/trait/<trait>/<value>")
def trait_value_search(trait, value):
    matches = {species: traits
               for species, traits in db.items()
               if traits[trait.lower()] == value.lower()}
    return json.dumps(title_case_species(matches))
