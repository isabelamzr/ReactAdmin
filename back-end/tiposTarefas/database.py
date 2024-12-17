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

def criar_tipo_tarefa(conexao, dados):
    if not conexao:
        return jsonify({"message": "Erro ao conectar ao banco"}), 500

    cursor = conexao.cursor()
    query = "INSERT INTO tipo_tarefa (nome_tarefa, descricao) VALUES (%s, %s)"
    valores = (dados['nome_tarefa'], dados['descricao'])

    try:
        cursor.execute(query, valores)
        conexao.commit()
        return jsonify({"message": "Tipo de tarefa criado com sucesso!"}), 201
    except Exception as e:
        conexao.rollback()
        return jsonify({"message": f"Erro ao criar tipo de tarefa: {str(e)}"}), 500
    finally:
        cursor.close()

def obter_tipos_tarefas(conexao):
    if conexao is None:
        return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500

    try:
        cursor = conexao.cursor(dictionary=True)
        query = "SELECT * FROM tipo_tarefa WHERE ativo = 1"
        cursor.execute(query)
        resultado = cursor.fetchall()
        return resultado
    except Exception as e:
        return jsonify({"error": f"Erro ao executar a consulta SQL: {e}"}), 500
    finally:
        cursor.close()

def atualizar_tipo_tarefa(conexao, id, dados):
    if not conexao:
        return jsonify({"message": "Erro ao conectar ao banco"}), 500

    cursor = conexao.cursor()
    query = "UPDATE tipo_tarefa SET nome_tarefa = %s, descricao = %s WHERE id = %s"
    valores = (dados['nome_tarefa'], dados['descricao'], id)

    try:
        cursor.execute(query, valores)
        conexao.commit()
        return jsonify({"message": "Tipo de tarefa atualizado com sucesso!"})
    except Exception as e:
        return jsonify({"message": f"Erro ao atualizar tipo de tarefa: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def soft_delete_tipo_tarefa(id):
    conexao = conectar_db()
    if not conexao:
        return jsonify({"message": "Erro ao conectar ao banco"}), 500

    cursor = conexao.cursor()
    query = "UPDATE tipo_tarefa SET ativo = 0 WHERE id = %s"

    try:
        cursor.execute(query, (id,))
        conexao.commit()
        return jsonify({"message": "Tipo de tarefa marcado como excluído com sucesso!"}), 200
    except Exception as e:
        return jsonify({"message": f"Erro ao marcar tipo de tarefa como excluído: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def excluir_tipo_tarefa_permanente(conexao, id):
    try:
        with conexao.cursor() as cursor:
            cursor.execute("DELETE FROM tipo_tarefa WHERE id = %s", (id,))
            conexao.commit()
            return True
    except Exception as e:
        conexao.rollback()
        raise ValueError(f"Erro ao excluir tipo de tarefa: {e}")

def listar_tipos_tarefas_inativos(conexao):
    try:
        with conexao.cursor(dictionary=True) as cursor:
            query = "SELECT * FROM tipo_tarefa WHERE ativo = 0"
            cursor.execute(query)
            return cursor.fetchall()
    except Exception as e:
        raise ValueError(f"Erro ao listar tipos de tarefas inativos: {e}")

def restaurar_tipo_tarefa(id, conexao):
    if not conexao:
        raise ValueError("Erro ao conectar ao banco de dados.")
    
    cursor = conexao.cursor()
    query = "UPDATE tipo_tarefa SET ativo = 1 WHERE id = %s"

    try:
        cursor.execute(query, (id,))
        conexao.commit()
    except Exception as e:
        raise RuntimeError(f"Erro ao restaurar tipo de tarefa: {e}")
    finally:
      cursor.close()