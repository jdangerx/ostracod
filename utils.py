def title_case_species(d):
    title_d = {}
    try:
        dict_items = d.items()
    except AttributeError:
        try:
            return d.title()
        except AttributeError:
            return d
    for k, v in dict_items:
        title_v = title_case_species(v)
        if k not in ['value', 'comments']:
            k = k.title()
        title_d[k.replace("_", " ")] = title_v
    return title_d


def human_readable_traits(traits, codings):
    new_traits = []
    for name, info in traits.items():
        if name == 'source':
            new_traits.append({"name": name, "info": info})
        else:
            new_traits.append({
                "name": codings[name]["long name"],
                "info": {
                    "comments": info["comments"],
                    "value": codings[name].get(str(info["value"]))
                }
            })
    return new_traits
