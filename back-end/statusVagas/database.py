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
        print(f"Unable to connect database: {err}")
        return None

def criar_status_vaga(conexao, dados):
    if not conexao:
        return jsonify({"message": "Unable to connect database"}), 500

    cursor = conexao.cursor()
    query = "INSERT INTO status_vaga (codigo_status, descricao) VALUES (%s, %s)"
    valores = (dados['codigo_status'], dados['descricao'])

    try:
        cursor.execute(query, valores)
        conexao.commit()
        return jsonify({"message": "Status de vaga criado com sucesso!"}), 201
    except Exception as e:
        return jsonify({"message": f"Erro ao criar status de vaga: {str(e)}"}), 500
    finally:
        cursor.close()
        conexao.close()

def obter_status_vagas(conexao):
    if conexao is None:
        return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500

    try:
        cursor = conexao.cursor(dictionary=True)
        query = "SELECT * FROM status_vaga WHERE ativo = 1"
        cursor.execute(query)
        resultado = cursor.fetchall()
        return resultado
    except Exception as e:
        return jsonify({"error": f"Erro ao executar a consulta SQL: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def atualizar_status_vaga(conexao, id, dados):
    if not conexao:
        return jsonify({"message": "Erro ao conectar ao banco"}), 500

    cursor = conexao.cursor()
    query = "UPDATE status_vaga SET codigo_status = %s, descricao = %s WHERE id = %s"
    valores = (dados['codigo_status'], dados['descricao'], id)

    try:
        cursor.execute(query, valores)
        conexao.commit()
        return jsonify({"message": "Status de vaga atualizado com sucesso!"})
    except Exception as e:
        return jsonify({"message": f"Erro ao atualizar status de vaga: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def soft_delete_status_vaga(id):
    conexao = conectar_db()
    if not conexao:
        return jsonify({"message": "Erro ao conectar ao banco"}), 500

    cursor = conexao.cursor()
    query = "UPDATE status_vaga SET ativo = 0 WHERE id = %s"

    try:
        cursor.execute(query, (id,))
        conexao.commit()
        return jsonify({"message": "Status de vaga marcado como excluído com sucesso!"}), 200
    except Exception as e:
        return jsonify({"message": f"Erro ao marcar status de vaga como excluído: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def excluir_status_vaga_permanente(conexao, id):
    try:
        with conexao.cursor() as cursor:
            cursor.execute("DELETE FROM status_vaga WHERE id = %s", (id,))
            conexao.commit()
            return True
    except Exception as e:
        conexao.rollback()
        raise ValueError(f"Erro ao excluir status de vaga: {e}")

def listar_status_vagas_inativos(conexao):
    try:
        with conexao.cursor(dictionary=True) as cursor:
            query = "SELECT * FROM status_vaga WHERE ativo = 0"
            cursor.execute(query)
            return cursor.fetchall()
    except Exception as e:
        raise ValueError(f"Erro ao listar status de vagas inativos: {e}")

def restaurar_status_vaga(id, conexao):
    if not conexao:
        raise ValueError("Erro ao conectar ao banco de dados.")
    
    cursor = conexao.cursor()
    query = "UPDATE status_vaga SET ativo = 1 WHERE id = %s"

    try:
        cursor.execute(query, (id,))
        conexao.commit()
    except Exception as e:
        raise RuntimeError(f"Erro ao restaurar status de vaga: {e}")
    finally:
      cursor.close()