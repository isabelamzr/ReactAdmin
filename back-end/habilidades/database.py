import mysql.connector
import os
from dotenv import load_dotenv
from flask import jsonify

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

def criar_habilidade(conexao, dados):
    if not conexao:
        return jsonify({"message": "Erro ao conectar ao banco"}), 500

    cursor = conexao.cursor()
    query = "INSERT INTO habilidades (descricao, talentos) VALUES (%s, %s)"
    valores = (dados['descricao'], dados['talentos'])

    try:
        cursor.execute(query, valores)
        conexao.commit()
        return jsonify({"message": "Habilidade criada com sucesso!"}), 201
    except Exception as e:
        return jsonify({"message": f"Erro ao criar habilidade: {str(e)}"}), 500
    finally:
        cursor.close()
        conexao.close()

def obter_habilidades(conexao):
    if conexao is None:
        return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500

    try:
        cursor = conexao.cursor(dictionary=True)
        query = "SELECT * FROM habilidades WHERE ativo = 1"
        cursor.execute(query)
        resultado = cursor.fetchall()
        return resultado
    except Exception as e:
        return jsonify({"error": f"Erro ao executar a consulta SQL: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def atualizar_habilidade(conexao, id, dados):
    if not conexao:
        return jsonify({"message": "Erro ao conectar ao banco"}), 500

    cursor = conexao.cursor()
    query = "UPDATE habilidades SET descricao = %s, talentos = %s WHERE id = %s"
    valores = (dados['descricao'], dados['talentos'], id)

    try:
        cursor.execute(query, valores)
        conexao.commit()
        return jsonify({"message": "Habilidade atualizada com sucesso!"})
    except Exception as e:
        return jsonify({"message": f"Erro ao atualizar habilidade: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def soft_delete_habilidade(id):
    conexao = conectar_db()
    if not conexao:
        return jsonify({"message": "Erro ao conectar ao banco"}), 500

    cursor = conexao.cursor()
    query = "UPDATE habilidades SET ativo = 0 WHERE id = %s"

    try:
        cursor.execute(query, (id,))
        conexao.commit()
        return jsonify({"message": "Habilidade marcada como excluída com sucesso!"}), 200
    except Exception as e:
        return jsonify({"message": f"Erro ao marcar habilidade como excluída: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def excluir_habilidade_permanente(conexao, id):
    try:
        with conexao.cursor() as cursor:
            cursor.execute("DELETE FROM habilidades WHERE id = %s", (id,))
            conexao.commit()
            return True
    except Exception as e:
        conexao.rollback()
        raise ValueError(f"Erro ao excluir habilidade: {e}")

def listar_habilidades_inativas(conexao):
    try:
        with conexao.cursor(dictionary=True) as cursor:
            query = "SELECT * FROM habilidades WHERE ativo = 0"
            cursor.execute(query)
            return cursor.fetchall()
    except Exception as e:
        raise ValueError(f"Erro ao listar habilidades inativas: {e}")

def restaurar_habilidade(id, conexao):
    if not conexao:
        raise ValueError("Erro ao conectar ao banco de dados.")
    
    cursor = conexao.cursor()
    query = "UPDATE habilidades SET ativo = 1 WHERE id = %s"

    try:
        cursor.execute(query, (id,))
        conexao.commit()
    except Exception as e:
        raise RuntimeError(f"Erro ao restaurar habilidade: {e}")
    finally:
      cursor.close()