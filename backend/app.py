from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permite CORS para todas as rotas

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.get_json() # Recebe a mensagem do frontend
    message = data.get('message')
    #
    # Processar a mensagem e gerar uma resposta
    # AQUI escrever o código para usar o modelo de linguagem e colocar na variavel message
    #
    response = {"response": f"Você disse: {message}"}

    return jsonify(response) # Retorna a resposta para o frontend

if __name__ == '__main__':
    app.run(debug=True)
