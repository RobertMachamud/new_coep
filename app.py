
import os
import random
from flask import (
    Flask, render_template,
    redirect, request, session, url_for)
from bson.objectid import ObjectId
from flask_pymongo import PyMongo
if os.path.exists("env.py"):
    import env


app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

mongo = PyMongo(app)


@app.route("/")
def index():
    produkte = list(mongo.db.cars.find())
    return render_template("index.html", produkte=produkte)


@app.route("/produkt/<produkt_id>")
def produkt(produkt_id):
    produkt = mongo.db.cars.find_one({"_id": ObjectId(produkt_id)})
    return render_template(
        "produkt.html", produkt=produkt)


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=False)
