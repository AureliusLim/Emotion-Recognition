from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from PIL import Image
import io
import tensorflow as tf

 
# Initializing flask app
app = Flask(__name__)
model = tf.keras.models.load_model('ml-model.h5')
CORS(app)
# Route for making predictions
@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['file']
    if not file:
        return jsonify({'error': 'No file uploaded'}), 400

    # Preprocess the image
    img = Image.open(io.BytesIO(file.read()))
    # Convert image to RGB if it has an alpha channel
    if img.mode == 'RGBA' or img.mode == 'L':
        img = img.convert('RGB')
    img = img.resize((150, 150))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # Get the prediction from the model
    predictions = model.predict(img_array)
    percentages = (predictions[0] * 100).tolist()

    return jsonify({
        'emotion_angry': percentages[0],
        'emotion_happy': percentages[1],
        'emotion_sad': percentages[2]
    })

# Running app
if __name__ == '__main__':
    app.run(debug=True, port=4000, use_reloader=False)