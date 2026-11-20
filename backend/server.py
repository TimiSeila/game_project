from flask import Flask, jsonify
import json

app = Flask(__name__)

def read_level(level_id):
    with open("levels.json", "r") as file:
        data = json.load(file)
    for level in data:
        if level["level_id"] == level_id:
            return level
    return jsonify({"error": "level not found"}), 404

def read_dialogue(level_id):
    with open("dialogues.json", "r") as file:
        data = json.load(file)
    for dialogue in data:
        if dialogue["level_id"] == level_id:
            return dialogue
    return jsonify({"error": "dialogue not found"}), 404

def read_cutscene(cutscene_id):
    with open("cutscenes.json", "r") as file:
        data = json.load(file)
    for cutscene in data:
        if cutscene["cutscene_id"] == cutscene_id:
            return cutscene
    return jsonify({"error": "cutscene not found"}), 404

@app.route("/")
def status():
    return "Running"

@app.route("/level/<level_id>", methods=["GET"])
def level(level_id):
    return read_level(level_id)

@app.route("/dialogue/<level_id>", methods=["GET"])
def dialogue(level_id):
    return read_dialogue(level_id)

@app.route("/cutscene/<cutscene_id>", methods=["GET"])
def cutscene(cutscene_id):
    return read_cutscene(cutscene_id)

if __name__ == "__main__":
    app.run()
