from flask import Flask, request, jsonify, session, send_from_directory
from flask_cors import CORS
import os
import openai
from datetime import datetime
from dotenv import load_dotenv
from database import buscar_resposta

# Carrega variáveis de ambiente do arquivo .env
load_dotenv()

# Define a chave da API a partir da variável de ambiente
openai.api_key = os.getenv("OPENAI_API_KEY")

# Define datas para controle de validade (exemplo do seu código)
DATA_LIMITE = datetime(2025, 1, 31)
hoje = datetime.now()

# Cria app Flask e define a pasta de arquivos estáticos (React build/)
app = Flask(__name__, static_folder="build", static_url_path="")

# Ativa CORS para todas as rotas
CORS(app)

# Rota raiz: serve o index.html da build do React
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

# Rota para servir outros arquivos estáticos da pasta build
@app.route('/<path:path>')
def serve_static(path):
    file_path = os.path.join(app.static_folder, path)
    if os.path.isfile(file_path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# Rota da API do chatbot
@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.get_json()
    message = data.get('message')
    contexto = buscar_resposta(message)

    prompt = f"""
    Use as informações abaixo para responder com precisão:

    {contexto}

    Pergunta do usuário: {message}
    """

    # Inicializa o histórico de mensagens (simula contexto do chat)
    session = [{"role": "system", "content": "Você é um assistente especializado em assuntos administrativos da Universidade de Pernambuco UPE. Você deve fornecer informações precisas e detalhadas sobre processos da universidade, documentação necessária, taxas, regimento interno e outros aspectos relacionados a universidade."}]
    
    if len(session) == 1 and session[0]['role'] == 'system':
        lmessages = [
            session[0],
            {"role": "user", "content": prompt}
        ]
    else:
        lmessages = [{"role": "user", "content": prompt}]
    
    # Chamada à API da OpenAI
    resp = openai.chat.completions.create(
        model="gpt-4-turbo",
        temperature=0,
        top_p=0.3,
        frequency_penalty=0.2,
        presence_penalty=0.2,
        seed=42,
        messages=lmessages
    )

    response = {"response": f"resposta: {resp.choices[0].message.content}"}
    print("Resposta: ", resp.choices[0].message.content)
    return jsonify(response)

# Executa o servidor usando a porta definida no Render
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Render define PORT dinamicamente
    app.run(host='0.0.0.0', port=port)
