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
    
    cursor = conexao.cursor(dictionary=True)

    try:
        print("DADOS RECEBIDOS:", dados)
 
        # conversão dos ids
        if isinstance(dados['tarefa_id'], str):
            cursor.execute("SELECT id FROM tarefa WHERE nome_tarefa = %s", (dados['tarefa_id'],))
            tarefa = cursor.fetchone()
            if not tarefa:
                return jsonify({"message": f"Tarefa não encontrada: {dados['tarefa_id']}"}), 400
            dados['tarefa_id'] = tarefa['id']

        if isinstance(dados['unidade_id'], str):
            cursor.execute("SELECT id FROM unidade WHERE nome = %s", (dados['unidade_id'].strip(),))
            unidade = cursor.fetchone()
            if not unidade:
                return jsonify({"message": f"Unidade não encontrada: {dados['unidade_id']}"}), 400
            dados['unidade_id'] = unidade['id']

        if isinstance(dados['coordenador_id'], str):
            cursor.execute("SELECT id FROM coordenador WHERE nome = %s", (dados['coordenador_id'].strip(),))
            coordenador = cursor.fetchone()
            if not coordenador:
                return jsonify({"message": f"Coordenador não encontrado: {dados['coordenador_id']}"}), 400
            dados['coordenador_id'] = coordenador['id']

        if isinstance(dados['status_vaga_id'], (str, int)):
            cursor.execute("SELECT id FROM status_vaga WHERE id = %s", (dados['status_vaga_id'],))
            status = cursor.fetchone()
            if not status:
                return jsonify({"message": f"Status não encontrado: {dados['status_vaga_id']}"}), 400
            dados['status_vaga_id'] = status['id']

        # validação campos obrigatórios
        campos_obrigatorios = ['tarefa_id', 'vagas', 'unidade_id', 'dia', 'horario', 'coordenador_id', 'data', 'status_vaga_id', 'descricao']
        for campo in campos_obrigatorios:
            if campo not in dados or not dados[campo]:
                return jsonify({"message": f"Campo obrigatório ausente: {campo}"}), 400

        query = """INSERT INTO vagas 
                  (tarefa_id, vagas, unidade_id, dia, horario, coordenador_id, data, status_vaga_id, descricao) 
                  VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"""
        valores = (
            dados['tarefa_id'], dados['vagas'], dados['unidade_id'], 
            dados['dia'], dados['horario'], dados['coordenador_id'], 
            dados['data'], dados['status_vaga_id'], dados['descricao']
        )
        
        cursor.execute(query, valores)
        conexao.commit()
        return jsonify({"message": "Vaga criada com sucesso!"}), 201
    
    except Exception as e:
        print(f"Erro ao criar vaga: {str(e)}")
        conexao.rollback()
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
        
        for row in resultado:
            if 'tarefa_id' not in row:
                row['tarefa_id'] = row.get('id')
        print("Dados recuperados:", resultado)
        return resultado
    
    except Exception as e:
        return jsonify({"error": f"Erro ao executar a consulta SQL: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def atualizar_vaga(conexao, id, dados):
    if not conexao:
        return jsonify({"message": "Erro ao conectar ao banco de dados"}), 500

    cursor = conexao.cursor()
    query = """UPDATE vagas 
              SET tarefa_id = %s, vagas = %s, unidade_id = %s, dia = %s, 
                  horario = %s, coordenador_id = %s, data = %s, 
                  status_vaga_id = %s, descricao = %s 
              WHERE id = %s"""
    valores = (
        dados['tarefa_id'], dados['vagas'], dados['unidade_id'], 
        dados['dia'], dados['horario'], dados['coordenador_id'], 
        dados['data'], dados['status_vaga_id'], dados['descricao'], id
    )

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