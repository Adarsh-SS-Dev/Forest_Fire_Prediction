from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)
CORS(app)
model = joblib.load('rf_model.pkl')
month_encoder = LabelEncoder()
month_encoder.fit(['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'])
day_encoder = LabelEncoder()
day_encoder.fit(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'])

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print(f"Received data: {data}")  
        day_encoded = day_encoder.transform([data['day']])[0]
        is_weekend = 1 if data['day'].lower() in ['sat', 'sun'] else 0
        features = [
            float(data['X']), float(data['Y']),  float(data['month']), day_encoded, is_weekend,
            float(data['FFMC']), float(data['DMC']), float(data['DC']), 
            float(data['ISI']), float(data['temp']), float(data['RH']), 
            float(data['wind']), float(data['rain'])
        ]
        features = np.array(features).reshape(1, -1)
        prediction = model.predict(features)[0]
        print(f"Prediction: {prediction}")  
        return jsonify({'prediction': float(prediction)})

    except Exception as e:
        print(f"Error: {str(e)}")  
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
