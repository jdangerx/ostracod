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
        title_d[k.title().replace("_", " ")] = title_v
    return title_d

