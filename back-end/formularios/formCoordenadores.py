#formCoordenadores.py

from flask import Flask, jsonify, request
from flask_cors import CORS  
import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)


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


def criar_coordenador(conexao, dados):
    dados = request.json
    print("Dados recebidos:", dados) 
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
        # return jsonify({"message": "Erro ao criar coordenador: {str(e)}"}), 500
        
    finally:
        cursor.close()
        conexao.close()


def obter_coordenadores(conexao):
    conexao = conectar_db()
    if conexao is None:
        print("Erro ao conectar ao banco de dados na rota /coordenadores/read")  # Log para erro de conexão
        return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500

    try:
        cursor = conexao.cursor(dictionary=True)
        query = "SELECT * FROM coordenador WHERE ativo = 1"
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


def soft_delete_coordenador(id):
    conexao = conectar_db()
    if not conexao:
        return jsonify({"message": "Erro ao conectar ao banco"}), 500

    cursor = conexao.cursor()
    query = "UPDATE coordenador SET ativo = 0 WHERE id = %s"

    try:
        cursor.execute(query, (id,))
        conexao.commit()
        return jsonify({"message": "Coordenador marcado como excluído com sucesso!"}), 200
    
    except Exception as e:
        print(f"Erro ao marcar coordenador como excluído: {e}")
        return jsonify({"message": "Erro ao marcar coordenador como excluído"}), 500
    
    finally:
        cursor.close()
        conexao.close()





def listar_coordenadores(conexao):
    try:
        with conexao.cursor(dictionary=True) as cursor:
            query = "SELECT * FROM coordenador"
            cursor.execute(query)
            return cursor.fetchall()
    except Exception as e:
        raise ValueError(f"Erro ao listar coordenadores: {e}")

def listar_coordenadores_inativos(conexao):
    try:
        with conexao.cursor(dictionary=True) as cursor:
            query = "SELECT * FROM coordenador WHERE ativo = 0"  # Corrigido para o nome correto da tabela
            cursor.execute(query)
            coordenadores_inativos = cursor.fetchall()
            print(f"Coordenadores inativos encontrados: {coordenadores_inativos}")
            return coordenadores_inativos
    except Exception as e:
        raise ValueError(f"Erro ao listar coordenadores inativos: {e}")

# def listar_coordenadores_inativos(conexao):
#     try:
#         with conexao.cursor(dictionary=True) as cursor:
#             query = "SELECT * FROM coordenador WHERE ativo = 0"
#             cursor.execute(query)
#             return cursor.fetchall()
#     except Exception as e:
#         raise ValueError(f"Erro ao listar coordenadores inativos: {e}")



def restaurar_coordenador(id, conexao):
    if not conexao:
        raise ValueError("Erro ao conectar ao banco de dados.")
    
    cursor = conexao.cursor()
    query = "UPDATE coordenador SET ativo = 1 WHERE id = %s"

    try:
        cursor.execute(query, (id,))
        conexao.commit()
    except Exception as e:
        raise RuntimeError(f"Erro ao restaurar coordenador: {e}")
    finally:
     cursor.close()





# def restaurar_coordenador(id):
#     conexao = conectar_db()
#     if not conexao:
#         return jsonify({"message": "Erro ao conectar ao banco"}), 500

#     cursor = conexao.cursor()
#     query = "UPDATE coordenador SET ativo = 1 WHERE id = %s"

#     try:
#         cursor.execute(query, (id,))
#         conexao.commit()
#         return jsonify({"message": "Coordenador restaurado com sucesso!"}), 200
    
#     except Exception as e:
#         print(f"Erro ao restaurar coordenador: {e}")
#         return jsonify({"message": "Erro ao restaurar coordenador"}), 500
    
#     finally:
#         cursor.close()
#         conexao.close()


def get_tarefas():
    conexao = conectar_db()
    if conexao is None:
        return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500

    try:
        cursor = conexao.cursor(dictionary=True)
        query = "SELECT nome_tarefa FROM tipo_tarefa"
        cursor.execute(query)
        tarefas = cursor.fetchall()

        return jsonify([tarefa['nome_tarefa'] for tarefa in tarefas])
    except Exception as e:
        print(f"Erro ao buscar tarefas: {e}")
        return jsonify({"error": "Erro ao buscar tarefas"}), 500
    finally:
        cursor.close()
        conexao.close()

if __name__ == '__main__':
    app.run(debug=True)