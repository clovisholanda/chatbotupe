from flask import Flask, request, jsonify, session, send_from_directory
from flask_cors import CORS
import os 
import openai
from datetime import datetime
#import requests
from database import buscar_resposta
##
pia="" 
try:
    with open('config3.txt', 'r') as file:
       pia = file.readline().strip()  # Lê a primeira linha e remove espaços extras e quebras de linha
except FileNotFoundError:
        print("O arquivo não foi encontrado.")
except Exception as e:
        print(f"Erro ao ler o arquivo: {e}")

os.environ['OPENAI_API_KEY'] = pia
#
openai.api_key = os.getenv("OPENAI_API_KEY")
##
#
DATA_LIMITE = datetime(2025, 1, 31)  #
hoje = datetime.now()

#app = Flask(__name__, static_folder="build", static_url_path="")

#@app.route('/') 
#def serve_index():
#    return send_from_directory(app.static_folder, 'index.html')

#@app.route('/<path:path>')
#def serve_static(path):
 #   file_path = os.path.join(app.static_folder, path)
 #   if os.path.isfile(file_path):
 #       return send_from_directory(app.static_folder, path)
 #   else:
 #       return send_from_directory(app.static_folder, 'index.html')
##
app = Flask(__name__)
CORS(app)  # Permite CORS para todas as rotas

#@app.route('/')
#def home():
 #   return "Aplicação funcionando!"

##
@app.route('/send_message', methods=['POST'])
def send_message():
    ###
    data = request.get_json() # Recebe a mensagem do frontend
    message = data.get('message') 
    ###
    contexto = buscar_resposta(message)
    ###
    # Criar prompt com contexto recuperado
    prompt = f"""
    Use as informações abaixo para responder com precisão:

    {contexto}

    Pergunta do usuário: {message}
    """
    ###
    # 
    # client_ip = request.headers.get('X-Forwarded-For', request.remote_addr)
    # client_ip = request.remote_addr
    # print(f"IP do cliente: {client_ip}")
    # print("Pergunta: ",message)
    # 
   
    ##
    #
    # Processar message e gera uma resposta
    # Inicializa a sessão com a configuração inicial do papel system
    #
    session = [{"role": "system", "content": "Você é um assistente especializado em assuntos administrativos da Universidade de Pernambuco UPE. Você deve fornecer informações precisas e detalhadas sobre processos da universidade, documentação necessária, taxas, regimento interno e outros aspectos relacionados a universidade."}]
    if len(session) == 1 and session[0]['role'] == 'system': #1a vez
        # prepara variavel com system
        lmessages=[
        {"role": "system", "content": "Você é um assistente especializado em assuntos administrativos da Universidade de Pernambuco UPE. Você deve fornecer informações precisas e detalhadas sobre processos da universidade, documentação necessária, taxas, regimento interno e outros aspectos relacionados a universidade."},
        {"role": "user", "content": prompt}
    ]
    else: #2a vez em diante   
        # prepara variavel sem system
         lmessages=[
        {"role": "user", "content": prompt}
    ]
    #   
    resp = openai.chat.completions.create(
       model="gpt-4-turbo",
        temperature=0,
        top_p=0.3,
        frequency_penalty=0.2,
        presence_penalty=0.2,
        seed=42,
        messages=lmessages
        # max_tokens=50
      )
    #
    response = {"response": f"resposta: {resp.choices[0].message.content}"}
    print("Resposta: ",resp.choices[0].message.content)
    return jsonify(response) # Retorna a resposta para o frontend

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Porta usada pelo Render
    app.run(host='0.0.0.0', port=port)
    