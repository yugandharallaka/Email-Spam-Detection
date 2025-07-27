import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from React frontend

# Load the model and vectorizer
model = pickle.load(open("Email_Spam_Detection.pkl", "rb"))
vectorizer = pickle.load(open("TFIDF_Vectorizer.pkl", "rb"))

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json.get("text", "")
    if not data:
        return jsonify({"error": "No text provided"}), 400

    # Transform text using the TF-IDF vectorizer
    transformed_text = vectorizer.transform([data])
    
    # Predict (0 = Ham, 1 = Spam)
    prediction = model.predict(transformed_text)[0]
    result = "Spam" if prediction == 1 else "Not Spam"

    return jsonify({"prediction": result})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
