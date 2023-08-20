from flask import Flask, request, jsonify
from flask_cors import CORS
import util
app = Flask(__name__)
cors = CORS(app)

@app.route('/hello')
def get_hello():
    return "hello"


@app.route('/predict', methods=['POST'])
def predict_spam():
    data = request.get_json()
    message = data['text']
    response = jsonify({
        'prediction': util.predict_spam(message)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    util.load_model()
    app.run()
