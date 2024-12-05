from flask import jsonify, request
import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

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
        return jsonify({"message": f"Erro ao criar coordenador: {str(e)}"}), 500
    finally:
        cursor.close()
        conexao.close()

def obter_coordenadores(conexao):
    if conexao is None:
        return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500

    try:
        cursor = conexao.cursor(dictionary=True)
        query = "SELECT * FROM coordenador WHERE ativo = 1"
        cursor.execute(query)
        resultado = cursor.fetchall()
        return resultado
    except Exception as e:
        return jsonify({"error": f"Erro ao executar a consulta SQL: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def atualizar_coordenador(conexao, id, dados):
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
        return jsonify({"message": f"Erro ao atualizar coordenador: {e}"}), 500
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
        return jsonify({"message": f"Erro ao marcar coordenador como excluído: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def excluir_coordenador_permanente(conexao, id):
    try:
        with conexao.cursor() as cursor:
            cursor.execute("DELETE FROM coordenador WHERE id = %s", (id,))
            conexao.commit()
            return True
    except Exception as e:
        conexao.rollback()
        raise ValueError(f"Erro ao excluir coordenador: {e}")

def listar_coordenadores_inativos(conexao):
    try:
        with conexao.cursor(dictionary=True) as cursor:
            query = "SELECT * FROM coordenador WHERE ativo = 0"
            cursor.execute(query)
            return cursor.fetchall()
    except Exception as e:
        raise ValueError(f"Erro ao listar coordenadores inativos: {e}")

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
        return jsonify({"error": f"Erro ao buscar tarefas: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()