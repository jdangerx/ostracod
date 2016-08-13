from flask import Flask
import json
app = Flask(__name__)


with open("traits.json") as j:
    db = json.loads(j.read())


def title_case_species(d):
    title_d = {}
    for k, v in d.items():
        try:
            title_v = v.title().replace("_", " ")
        except:
            title_v = title_case_species(v)
        title_d[k.title().replace("_", " ")] = title_v
    return title_d


@app.route("/")
def look_at_everything():
    return json.dumps(db)


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
