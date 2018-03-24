import json
def generate():
    data_dict = {}
    for i in range(34):
        with open("../static/geometryProvince/"+str(i+1)+".json", "r") as rf:
            data_dict[i+1] = json.load(rf)

    with open("../static/countyData/data.json", "w") as wf:
        json.dump(data_dict, wf)

generate();