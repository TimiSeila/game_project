from flask import Flask, abort
import json

app = Flask(__name__)

def read_level(id):
    with open("levels.json", "r") as file:
        data = json.load(file)
    for level in data:
        if level["id"] == id:
            return level
    return abort(404)

@app.route("/")
def status():
    return "Running"

@app.route("/level/<id>", methods=["GET"])
def level(id):
    return read_level(id)

if __name__ == "__main__":
    app.run()
