# database.py
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

def criar_vaga(conexao, dados):
    if not conexao:
        return jsonify({"message": "Erro ao conectar ao banco"}), 500

    cursor = conexao.cursor()
    query = "INSERT INTO vagas (tarefa_id, vagas, unidade_id, dia, horario, coordenador_id, data, status_vaga_id, descricao) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
    valores = ( dados['tarefa_id'], dados['vagas'], dados['unidade_id'], dados['dia'], 
    dados['horario'], dados['coordenador_id'], dados['data'], dados['status_vaga_id'], dados['descricao'])

    try:
        cursor.execute(query, valores)
        conexao.commit()
        return jsonify({"message": "Vaga criada com sucesso!"}), 201
    except Exception as e:
        return jsonify({"message": f"Erro ao criar vaga: {str(e)}"}), 500
    finally:
        cursor.close()
        conexao.close()

def obter_vagas(conexao):
    if conexao is None:
        return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500

    try:
        cursor = conexao.cursor(dictionary=True)
        query = "SELECT * FROM vaga_detalhada WHERE ativo = 1"
        cursor.execute(query)
        resultado = cursor.fetchall()
        print("Consulta bem-sucedida:", resultado) #Debug
        print(f"Total de registros: {len(resultado)}")
        print(f"Primeiro registro: {resultado[0] if resultado else 'Vazio'}")
        return resultado
    except Exception as e:
        print("Erro ao executar a consulta:", str(e)) #Debug
        return jsonify({"error": f"Erro ao executar a consulta SQL: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def atualizar_vaga(conexao, id, dados):
    if not conexao:
        return jsonify({"message": "Erro ao conectar ao banco de dados"}), 500

    cursor = conexao.cursor()
    query = "UPDATE vagas SET tarefa_id = %s, vagas = %s, unidade_id = %s, dia = %s, horario = %s, coordenador_id = %s, data = %s, status_vaga_id = %s, descricao = %s WHERE id = %s"
    valores = ( dados['tarefa_id'], dados['vagas'], dados['unidade_id'], dados['dia'], dados['horario'], 
        dados['coordenador_id'], dados['data'], dados['status_vaga_id'], dados['descricao'], id)

    try:
        cursor.execute(query, valores)
        conexao.commit()
        return jsonify({"message": "Vaga atualizada com sucesso!"})
    except Exception as e:
        return jsonify({"message": f"Erro ao atualizar vaga: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def soft_delete_vaga(id):
    conexao = conectar_db()
    if not conexao:
        return jsonify({"message": "Erro ao conectar ao banco de dados"}), 500

    cursor = conexao.cursor()
    query = "UPDATE vagas SET ativo = 0 WHERE id = %s"

    try:
        cursor.execute(query, (id,))
        conexao.commit()
        return jsonify({"message": "Vaga marcada como excluída com sucesso!"}), 200
    except Exception as e:
        return jsonify({"message": f"Erro ao marcar vaga como excluída: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def excluir_vaga_permanente(conexao, id):
    try:
        with conexao.cursor() as cursor:
            cursor.execute("DELETE FROM vagas WHERE id = %s", (id,))
            conexao.commit()
            return True
    except Exception as e:
        conexao.rollback()
        raise ValueError(f"Erro ao excluir vaga: {e}")

def listar_vagas_inativas(conexao):
    try:
        with conexao.cursor(dictionary=True) as cursor:
            query = "SELECT * FROM vagas WHERE ativo = 0"
            cursor.execute(query)
            return cursor.fetchall()
    except Exception as e:
        raise ValueError(f"Erro ao listar vagas inativas: {e}")

def restaurar_vaga(id, conexao):
    if not conexao:
        raise ValueError("Erro ao conectar ao banco de dados.")
    
    cursor = conexao.cursor()
    query = "UPDATE vagas SET ativo = 1 WHERE id = %s"

    try:
        cursor.execute(query, (id,))
        conexao.commit()
    except Exception as e:
        raise RuntimeError(f"Erro ao restaurar vaga: {e}")
    finally:
        cursor.close()