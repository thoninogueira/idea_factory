from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv
import os

load_dotenv()  # Carrega variáveis de ambiente do arquivo .env

app = Flask(__name__)

API_KEY = os.getenv("API_KEY")  # Obtém a chave da API do ambiente

def gerar_ideia_chatgpt(startup_input):
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }
    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": f"Crie uma ideia de startup com base na seguinte entrada: {startup_input}"}],
        "max_tokens": 100,
    }
    
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return response.json()['choices'][0]['message']['content']
    else:
        return "Erro ao acessar a API."

@app.route('/gerar_ideia', methods=['POST'])
def gerar_ideia():
    dados = request.get_json()
    ideia = gerar_ideia_chatgpt(dados['input'])
    return jsonify({'ideia': ideia})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)