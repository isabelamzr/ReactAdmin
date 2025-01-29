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

def criar_unidade(conexao, dados):
    if not conexao:
        return jsonify({"message": "Erro ao conectar ao banco"}), 500

    cursor = conexao.cursor()
    query = "INSERT INTO unidade (nome, telefone, endereco, bairro, cidade, UF) VALUES (%s, %s, %s, %s, %s, %s)"
    valores = (dados['nome'], dados['telefone'], dados['endereco'], dados['bairro'], 
               dados['cidade'], dados['UF'])

    try:
        cursor.execute(query, valores)
        conexao.commit()
        return jsonify({"message": "Unidade criada com sucesso!"}), 201
    except Exception as e:
        return jsonify({"message": f"Erro ao criar unidade: {str(e)}"}), 500
    finally:
        cursor.close()
        conexao.close()

def obter_unidades(conexao):
    if conexao is None:
        return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500

    try:
        cursor = conexao.cursor(dictionary=True)
        query = "SELECT * FROM unidade WHERE ativo = 1"
        cursor.execute(query)
        resultado = cursor.fetchall()
        return resultado
    except Exception as e:
        return jsonify({"error": f"Erro ao executar a consulta SQL: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def atualizar_unidade(conexao, id, dados):
    if not conexao:
        return jsonify({"message": "Erro ao conectar ao banco"}), 500

    cursor = conexao.cursor()
    query = "UPDATE unidade SET nome = %s, telefone = %s, endereco = %s, bairro = %s, cidade = %s, UF = %s WHERE id = %s"
    valores = (dados['nome'], dados['telefone'], dados['endereco'], 
            dados['bairro'], dados['cidade'], dados['UF'], id)

    try:
        cursor.execute(query, valores)
        conexao.commit()
        return jsonify({"message": "Unidade atualizada com sucesso!"})
    except Exception as e:
        return jsonify({"message": f"Erro ao atualizar unidade: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def soft_delete_unidade(id):
    conexao = conectar_db()
    if not conexao:
        return jsonify({"message": "Erro ao conectar ao banco"}), 500

    cursor = conexao.cursor()
    query = "UPDATE unidade SET ativo = 0 WHERE id = %s"

    try:
        cursor.execute(query, (id,))
        conexao.commit()
        return jsonify({"message": "Unidade marcada como excluída com sucesso!"}), 200
    except Exception as e:
        return jsonify({"message": f"Erro ao marcar unidade como excluída: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def excluir_unidade_permanente(conexao, id):
    try:
        with conexao.cursor() as cursor:
            cursor.execute("DELETE FROM unidade WHERE id = %s", (id,))
            conexao.commit()
            return True
    except Exception as e:
        conexao.rollback()
        raise ValueError(f"Erro ao excluir unidade: {e}")

def listar_unidades_inativas(conexao):
    try:
        with conexao.cursor(dictionary=True) as cursor:
            query = "SELECT * FROM unidade WHERE ativo = 0"
            cursor.execute(query)
            return cursor.fetchall()
    except Exception as e:
        raise ValueError(f"Erro ao listar unidades inativas: {e}")

def restaurar_unidade(id, conexao):
    if not conexao:
        raise ValueError("Erro ao conectar ao banco de dados.")
    
    cursor = conexao.cursor()
    query = "UPDATE unidade SET ativo = 1 WHERE id = %s"

    try:
        cursor.execute(query, (id,))
        conexao.commit()
    except Exception as e:
        raise RuntimeError(f"Erro ao restaurar unidade: {e}")
    finally:
      cursor.close()