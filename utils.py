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
