import os
from datetime import datetime
from bson import ObjectId
from dotenv import load_dotenv

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient

# =========================
# Load Environment
# =========================
load_dotenv()

app = Flask(__name__)
CORS(app)

# =========================
# MongoDB Config
# =========================
MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise ValueError("MONGO_URI not set")

client = MongoClient(MONGO_URI)
db = client.get_default_database()

users_collection = db.users
locations_collection = db.locations
reviews_collection = db.reviews
likes_collection = db.review_likes

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET", "supersecretkey")

bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# =========================
# Helper
# =========================
def serialize(doc):
    doc["_id"] = str(doc["_id"])
    return doc

# =========================
# Auth Routes
# =========================

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.json

    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email and password required"}), 400

    if users_collection.find_one({"email": data["email"]}):
        return jsonify({"error": "User already exists"}), 400

    hashed_pw = bcrypt.generate_password_hash(data["password"]).decode("utf-8")

    user = {
        "name": data.get("name", ""),
        "email": data["email"],
        "password_hash": hashed_pw,
        "created_at": datetime.utcnow()
    }

    result = users_collection.insert_one(user)

    return jsonify({"message": "User created", "user_id": str(result.inserted_id)}), 201


@app.route("/api/login", methods=["POST"])
def login():
    data = request.json

    user = users_collection.find_one({"email": data["email"]})
    if user and bcrypt.check_password_hash(user["password_hash"], data["password"]):
        token = create_access_token(identity=str(user["_id"]))
        return jsonify({"access_token": token})

    return jsonify({"error": "Invalid credentials"}), 401


# =========================
# Location Routes
# =========================

@app.route("/api/locations", methods=["GET"])
def get_locations():
    locations = list(locations_collection.find())
    return jsonify([serialize(l) for l in locations])


@app.route("/api/locations", methods=["POST"])
def add_location():
    data = request.json

    location = {
        "name": data["name"],
        "slug": data["slug"],
        "description": data.get("description", ""),
        "created_at": datetime.utcnow()
    }

    result = locations_collection.insert_one(location)

    return jsonify({"message": "Location added", "id": str(result.inserted_id)}), 201


# =========================
# Review Routes
# =========================

@app.route("/api/locations/<location_id>/reviews", methods=["GET"])
def get_reviews(location_id):
    reviews = list(reviews_collection.find({"location_id": location_id}))
    return jsonify([serialize(r) for r in reviews])


@app.route("/api/locations/<location_id>/reviews", methods=["POST"])
@jwt_required()
def add_review(location_id):
    user_id = get_jwt_identity()
    data = request.json

    review = {
        "location_id": location_id,
        "user_id": user_id,
        "text": data["text"],
        "overall": data["overall"],
        "lighting": data["lighting"],
        "transport": data["transport"],
        "crowd": data["crowd"],
        "security": data["security"],
        "verified": False,
        "created_at": datetime.utcnow()
    }

    result = reviews_collection.insert_one(review)

    return jsonify({"message": "Review added", "id": str(result.inserted_id)}), 201


@app.route("/api/reviews/<review_id>/like", methods=["POST"])
@jwt_required()
def like_review(review_id):
    user_id = get_jwt_identity()

    if likes_collection.find_one({"review_id": review_id, "user_id": user_id}):
        return jsonify({"message": "Already liked"}), 400

    like = {
        "review_id": review_id,
        "user_id": user_id,
        "created_at": datetime.utcnow()
    }

    likes_collection.insert_one(like)

    return jsonify({"message": "Review liked"}), 201


# =========================
# Health Check
# =========================

@app.route("/")
def home():
    return jsonify({"message": "HERA Backend Running (MongoDB)"})

# =========================
# Run
# =========================

if __name__ == "__main__":
    app.run(debug=True)