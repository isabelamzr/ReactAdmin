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

def criar_voluntario(conexao, dados):
    if not conexao:
        return jsonify({"message": "Erro ao conectar ao banco de dados"}), 500

    cursor = conexao.cursor()
    query = """
    INSERT INTO voluntarios 
    (nome, telefone, email, endereco, habilidades_id, tarefa_id, unidade_id, observacoes, termo_assinado) 
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    valores = (
        dados['nome'], dados['telefone'], dados['email'], 
        dados['endereco'], dados['habilidades_id'], dados['tarefa_id'], 
        dados['unidade_id'], dados['observacoes'], dados['termo_assinado']
    )

    try:
        cursor.execute(query, valores)
        conexao.commit()
        return jsonify({"message": "Voluntário criado com sucesso!"}), 201
    except Exception as e:
        return jsonify({"message": f"Erro ao criar voluntário: {str(e)}"}), 500
    finally:
        cursor.close()
        conexao.close()

def obter_voluntarios(conexao):
    if conexao is None:
        return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500

    try:
        cursor = conexao.cursor(dictionary=True)
        query = "SELECT * FROM voluntario_detalhada WHERE ativo = 1"
        cursor.execute(query)
        resultado = cursor.fetchall()
        return resultado
    except Exception as e:
        return jsonify({"error": f"Erro ao executar a consulta SQL: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def atualizar_voluntario(conexao, id, dados):
    if not conexao:
        return jsonify({"message": "Erro ao conectar ao banco de dados"}), 500

    cursor = conexao.cursor()
    query = """
    UPDATE voluntarios 
    SET nome = %s, telefone = %s, email = %s, endereco = %s, 
    habilidades_id = %s, tarefa_id = %s, unidade_id = %s, 
    observacoes = %s, termo_assinado = %s 
    WHERE id = %s
    """
    valores = (
        dados['nome'], dados['telefone'], dados['email'], 
        dados['endereco'], dados['habilidades_id'], dados['tarefa_id'], 
        dados['unidade_id'], dados['observacoes'], dados['termo_assinado'], id
    )

    try:
        cursor.execute(query, valores)
        conexao.commit()
        return jsonify({"message": "Voluntário atualizado com sucesso!"})
    except Exception as e:
        return jsonify({"message": f"Erro ao atualizar voluntário: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def soft_delete_voluntario(id):
    conexao = conectar_db()
    if not conexao:
        return jsonify({"message": "Erro ao conectar ao banco"}), 500

    cursor = conexao.cursor()
    query = "UPDATE voluntarios SET ativo = 0 WHERE id = %s"

    try:
        cursor.execute(query, (id,))
        conexao.commit()
        return jsonify({"message": "Voluntário marcado como excluído com sucesso!"}), 200
    except Exception as e:
        return jsonify({"message": f"Erro ao marcar voluntário como excluído: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def excluir_voluntario_permanente(conexao, id):
    try:
        with conexao.cursor() as cursor:
            cursor.execute("DELETE FROM voluntarios WHERE id = %s", (id,))
            conexao.commit()
            return True
    except Exception as e:
        conexao.rollback()
        raise ValueError(f"Erro ao excluir voluntário: {e}")

def listar_voluntarios_inativos(conexao):
    try:
        with conexao.cursor(dictionary=True) as cursor:
            query = "SELECT * FROM voluntarios WHERE ativo = 0"
            cursor.execute(query)
            return cursor.fetchall()
    except Exception as e:
        raise ValueError(f"Erro ao listar voluntários inativos: {e}")

def restaurar_voluntario(id, conexao):
    if not conexao:
        raise ValueError("Erro ao conectar ao banco de dados.")
    
    cursor = conexao.cursor()
    query = "UPDATE voluntarios SET ativo = 1 WHERE id = %s"

    try:
        cursor.execute(query, (id,))
        conexao.commit()
    except Exception as e:
        raise RuntimeError(f"Erro ao restaurar voluntário: {e}")
    finally:
        cursor.close()