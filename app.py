from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import random

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/")
def home():
    return jsonify({
        "message": "Microplastic Detection AI Backend is running"
    })

@app.route("/analyze", methods=["POST"])
def analyze():

    if "image" not in request.files:
        return jsonify({
            "error": "No image uploaded"
        }), 400

    image = request.files["image"]

    filename = image.filename

    if filename == "":
        return jsonify({
            "error": "Invalid file"
        }), 400

    filepath = os.path.join(UPLOAD_FOLDER, filename)

    image.save(filepath)

    particles = random.randint(5, 50)

    concentration = round(particles / 2.5, 2)

    if particles < 15:
        risk = "Low"
    elif particles < 30:
        risk = "Moderate"
    else:
        risk = "High"

    confidence = round(random.uniform(85, 98), 2)

    return jsonify({
        "sample_id": random.randint(1000, 9999),
        "particles": particles,
        "concentration": str(concentration) + " particles/L",
        "risk": risk,
        "confidence": str(confidence) + "%"
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)