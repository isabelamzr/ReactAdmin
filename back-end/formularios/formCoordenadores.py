#formCoordenadores.py

from flask import Flask, jsonify, request
from flask_cors import CORS  
import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv

app = Flask(__name__)
CORS(app)  # Habilita o CORS, se necessário

# Função para conexão com o banco de dados MySQL
def conectar_db():
    try:
        return mysql.connector.connect(
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PWD"), 
            database=os.getenv("DB_NAME")
        )
    except mysql.connector.Error as err:
        print(f"Erro ao conectar ao banco de dados: {err}")
        return None  

# Rota para criar um coordenador
@app.route('/coordenadores', methods=['POST'])

def criar_coordenador(conexao, dados):
    dados = request.json
    print("Dados recebidos:", dados)  # Log dos dados recebidos
    conexao = conectar_db()
    if not conexao:
        return jsonify({"message": "Erro ao conectar ao banco"}), 500

    cursor = conexao.cursor()
    query = "INSERT INTO coordenador (nome, telefone, email, genero) VALUES (%s, %s, %s, %s)"
    valores = (dados['nome'], dados['telefone'], dados['email'], dados['genero'])

    try:
        cursor.execute(query, valores)
        conexao.commit()
        return jsonify({"message": "Coordenador criado com sucesso!"}), 201
    except Exception as e:
        print(f"Erro ao inserir coordenador: {e}")
        raise
        # return jsonify({"message": "Erro ao criar coordenador"}), 500
        
    finally:
        cursor.close()
        conexao.close()

@app.route('/coordenadores/read', methods=['GET'])
def obter_coordenadores(conexao):
    conexao = conectar_db()
    if conexao is None:
        print("Erro ao conectar ao banco de dados na rota /coordenadores/read")  # Log para erro de conexão
        return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500

    try:
        cursor = conexao.cursor(dictionary=True)
        query = "SELECT * FROM coordenador"
        cursor.execute(query)
        resultado = cursor.fetchall()
        print("Dados recuperados:", resultado)  # Log para verificar os dados retornados
        return resultado
    
    except Exception as e:
        print(f"Erro ao executar a consulta SQL: {e}")
        return jsonify({"error": "Erro ao executar a consulta SQL"}), 500
    finally:
        cursor.close()
        conexao.close()

# Rota para atualizar um coordenador
@app.route('/coordenadores/update/<int:id>', methods=['PUT'])
def atualizar_coordenador(id):
    dados = request.json
    conexao = conectar_db()
    if not conexao:
        return jsonify({"message": "Erro ao conectar ao banco"}), 500

    cursor = conexao.cursor()
    query = "UPDATE coordenador SET nome = %s, telefone = %s, email = %s, genero = %s WHERE id = %s"
    valores = (dados['nome'], dados['telefone'], dados['email'], dados['genero'], id)

    try:
        cursor.execute(query, valores)
        conexao.commit()
        return jsonify({"message": "Coordenador atualizado com sucesso!"})
    except Exception as e:
        print(f"Erro ao atualizar coordenador: {e}")
        return jsonify({"message": "Erro ao atualizar coordenador"}), 500
    finally:
        cursor.close()
        conexao.close()

# Rota para deletar um coordenador
@app.route('/coordenadores/delete/<int:id>', methods=['DELETE'])
def deletar_coordenador(id):
    conexao = conectar_db()
    if not conexao:
        return jsonify({"message": "Erro ao conectar ao banco"}), 500

    cursor = conexao.cursor()
    query = "DELETE FROM coordenador WHERE id = %s"

    try:
        cursor.execute(query, (id,))
        conexao.commit()
        return jsonify({"message": "Coordenador deletado com sucesso!"})
    except Exception as e:
        print(f"Erro ao deletar coordenador: {e}")
        return jsonify({"message": "Erro ao deletar coordenador"}), 500
    finally:
        cursor.close()
        conexao.close()

# Rota para obter tarefas para o dropdown de tarefas
@app.route('/tarefas', methods=['GET'])
def get_tarefas():
    conexao = conectar_db()
    if conexao is None:
        return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500

    try:
        cursor = conexao.cursor(dictionary=True)
        query = "SELECT nome_tarefa FROM tipo_tarefa"
        cursor.execute(query)
        tarefas = cursor.fetchall()

        # Retorna apenas os nomes das tarefas
        return jsonify([tarefa['nome_tarefa'] for tarefa in tarefas])
    except Exception as e:
        print(f"Erro ao buscar tarefas: {e}")
        return jsonify({"error": "Erro ao buscar tarefas"}), 500
    finally:
        cursor.close()
        conexao.close()

# Iniciar o aplicativo Flask
if __name__ == '__main__':
    app.run(debug=True)