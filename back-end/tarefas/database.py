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

def criar_tarefa(conexao, dados):
    if not conexao:
        return jsonify({"message": "Erro ao conectar ao banco"}), 500
    
    print("DADOS RECEBIDOS:", dados)
    cursor = conexao.cursor(dictionary=True)

    try:
        # Debug: Imprimir todos os dados antes da conversão
        print("Convertendo tipo_tarefa")
        if isinstance(dados['tipo_tarefa_id'], str):
            cursor.execute("SELECT id FROM tipo_tarefa WHERE nome_tarefa = %s", (dados['tipo_tarefa_id'],))
            tipo_tarefa = cursor.fetchone()
            print(f"Tipo Tarefa: {tipo_tarefa}")
            if not tipo_tarefa:
                return jsonify({"message": f"Tipo de tarefa não encontrado: {dados['tipo_tarefa_id']}"}), 400
            dados['tipo_tarefa_id'] = tipo_tarefa['id']

        print("Convertendo unidade")
        if isinstance(dados['unidade_id'], str):
            cursor.execute("SELECT id FROM unidade WHERE nome = %s", (dados['unidade_id'].strip(),))
            unidade = cursor.fetchone()
            print(f"Unidade: {unidade}")
            if not unidade:
                return jsonify({"message": f"Unidade não encontrada: {dados['unidade_id']}"}), 400
            dados['unidade_id'] = unidade['id']

        print("Convertendo voluntário")
        if isinstance(dados['voluntario_id'], str):
            cursor.execute("SELECT id FROM voluntarios WHERE nome = %s", (dados['voluntario_id'].strip(),))
            voluntario = cursor.fetchone()
            print(f"Voluntário: {voluntario}")
            if not voluntario:
                return jsonify({"message": f"Voluntário não encontrado: {dados['voluntario_id']}"}), 400
            dados['voluntario_id'] = voluntario['id']

        # Validação dos campos obrigatórios
        campos_obrigatorios = ['tipo_tarefa_id', 'dia', 'horario', 'coordenador_id', 'unidade_id', 'voluntario_id', 'local']
        for campo in campos_obrigatorios:
            if campo not in dados or not dados[campo]:
                return jsonify({"message": f"Campo obrigatório ausente: {campo}"}), 400

        query = "INSERT INTO tarefa (tipo_tarefa_id, dia, horario, coordenador_id, unidade_id, voluntario_id, local) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        valores = (dados['tipo_tarefa_id'], dados['dia'], dados['horario'], dados['coordenador_id'], dados['unidade_id'], dados['voluntario_id'], dados['local'])
        
        cursor.execute(query, valores)
        conexao.commit()
        return jsonify({"message": "Tarefa criada com sucesso!"}), 201
    
    except Exception as e:
        print(f"Erro ao criar tarefa: {str(e)}")
        conexao.rollback()
        return jsonify({"message": f"Erro ao criar tarefa: {str(e)}"}), 500
    finally:
        cursor.close()
        conexao.close()
        
def obter_tarefas(conexao):
    if conexao is None:
        return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500

    try:
        cursor = conexao.cursor(dictionary=True)
        query = "SELECT * FROM tarefa_detalhada WHERE ativo = 1"
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

def atualizar_tarefa(conexao, id, dados):
    if not conexao:
        return jsonify({"message": "Erro ao conectar ao banco de dados"}), 500

    cursor = conexao.cursor()
    query = "UPDATE tarefa SET tipo_tarefa_id = %s, dia = %s, horario = %s, coordenador_id = %s, unidade_id = %s, voluntario_id = %s, local = %s WHERE id = %s"
    valores = (dados['tipo_tarefa_id'], dados['dia'], dados['horario'], dados['coordenador_id'], dados['unidade_id'], dados['voluntario_id'], dados['local'], id)

    try:
        cursor.execute(query, valores)
        conexao.commit()
        return jsonify({"message": "Tarefa atualizada com sucesso!"})
    except Exception as e:
        return jsonify({"message": f"Erro ao atualizar tarefa: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def soft_delete_tarefa(id):
    conexao = conectar_db()
    if not conexao:
        return jsonify({"message": "Erro ao conectar ao banco de dados"}), 500

    cursor = conexao.cursor()
    query = "UPDATE tarefa SET ativo = 0 WHERE id = %s"

    try:
        cursor.execute(query, (id,))
        conexao.commit()
        return jsonify({"message": "Tarefa marcada como excluída com sucesso!"}), 200
    except Exception as e:
        return jsonify({"message": f"Erro ao marcar tarefa como excluída: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def excluir_tarefa_permanente(conexao, id):
    try:
        with conexao.cursor() as cursor:
            cursor.execute("DELETE FROM tarefa WHERE id = %s", (id,))
            conexao.commit()
            return True
    except Exception as e:
        conexao.rollback()
        raise ValueError(f"Erro ao excluir tarefa: {e}")

def listar_tarefas_inativas(conexao):
    try:
        with conexao.cursor(dictionary=True) as cursor:
            query = "SELECT * FROM tarefa WHERE ativo = 0"
            cursor.execute(query)
            return cursor.fetchall()
    except Exception as e:
        raise ValueError(f"Erro ao listar tarefas inativas: {e}")

def restaurar_tarefa(id, conexao):
    if not conexao:
        raise ValueError("Erro ao conectar ao banco de dados.")
    
    cursor = conexao.cursor()
    query = "UPDATE tarefa SET ativo = 1 WHERE id = %s"

    try:
        cursor.execute(query, (id,))
        conexao.commit()
    except Exception as e:
        raise RuntimeError(f"Erro ao restaurar tarefa: {e}")
    finally:
        cursor.close()