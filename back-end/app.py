# app.py

import mysql.connector
import re
import os 
from flask import Flask, jsonify, request
from flask_cors import CORS
from formularios.formCoordenadores import (
    criar_coordenador,
    obter_coordenadores,
    atualizar_coordenador,
    soft_delete_coordenador,
    excluir_coordenador_permanente,
    restaurar_coordenador,
    listar_coordenadores_inativos,
    conectar_db
)

app = Flask(__name__)
CORS(app) 

# resources={r"/*": {"origins": "*"}}

def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PWD"), 
            database=os.getenv("DB_NAME")
        )
        return conn
    
    except mysql.connector.Error as err:
        print(f"Erro ao conectar ao banco de dados: {err}")
        raise  

@app.route('/coordenadores/update/<int:id>', methods=['PUT'])
def update_coordenador(id):
        try:
            data = request.get_json()
            
            # Validações (similares ao create)
            required_fields = ['nome', 'telefone', 'email', 'genero']
            for field in required_fields:
                if not data.get(field):
                    return jsonify({"error": f"Campo {field} é obrigatório"}), 400
            
            # Regex para validações
            phone_regex = r'^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)?[0-9]{4,5}[-]?[0-9]{4}$'
            email_regex = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
            
            # Verificações de validação
            if not re.match(phone_regex, data['telefone']):
                return jsonify({"error": "Número de telefone inválido"}), 400
            
            if not re.match(email_regex, data['email']):
                return jsonify({"error": "E-mail inválido"}), 400
            
            # Conexão com banco de dados
            conn = get_db_connection()
            cursor = conn.cursor()
            
            # Query de atualização coordenador
            query = """
            UPDATE coordenador
            SET nome = %s, 
                telefone = %s, 
                email = %s, 
                genero = %s 
            WHERE id = %s AND ativo = 1
            """
            
            cursor.execute(query, (
                data['nome'], 
                data['telefone'], 
                data['email'], 
                data['genero'],
                id
            ))
            
            conn.commit()
            
            # Verificar se algum registro foi atualizado
            if cursor.rowcount == 0:
                return jsonify({"error": "Coordenador não encontrado ou já inativo"}), 404
            
            # Atualizar coordenador_id em todas as tarefas deste coordenador
            tarefa_query = """
            UPDATE tarefa
            SET coordenador_id = %s
            WHERE coordenador_id = %s
            """
            cursor.execute(tarefa_query, (id, id))
            conn.commit()
        
            cursor.close()
            conn.close()
            
            return jsonify({"message": "Coordenador atualizado com sucesso"}), 200
        
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        

@app.route('/coordenadores', methods=['POST'])

def api_criar_coordenador():

    try:
        dados = request.json
        print("Dados recebidos para criação:", dados)
        conexao = conectar_db()
        criar_coordenador(conexao, dados)
        conexao.close()
        return jsonify({"message": "Coordenador criado com sucesso!"}), 201
    
    except Exception as e:
        print(f"Erro ao criar coordenador: {e}")
        return jsonify({"message": "Erro ao criar coordenador"}), 500


@app.route('/coordenadores/read', methods=['GET'])
def api_obter_coordenadores():
    try:
        conexao = conectar_db()
        coordenadores = obter_coordenadores(conexao)
        conexao.close()

        return jsonify(coordenadores), 200
    
    except Exception as e:
        print(f"Erro ao obter coordenadores: {e}")
        return jsonify({"message": "Erro ao obter coordenadores"}), 500
    

@app.route('/coordenadores/<int:id>', methods=['PUT'])
def api_atualizar_coordenador(id):
    try:
        dados = request.json
        conexao = conectar_db()
        atualizar_coordenador(conexao, id, dados)
        conexao.close()
        return jsonify({"message": "Coordenador atualizado com sucesso!"}), 200
    
    except Exception as e:
        print(f"Erro ao atualizar coordenador: {e}")
        return jsonify({"message": "Erro ao atualizar coordenador"}), 500



@app.route('/coordenadores/soft_delete/<int:id>', methods=['DELETE'])
def api_soft_delete_coordenador(id):
    try:
        conexao = conectar_db()
        soft_delete_coordenador(id)
        conexao.close()
        return jsonify({"message": "Coordenador marcado como excluído com sucesso!"}), 200
    
    except Exception as e:
        print(f"Erro ao excluir coordenador: {e}")
        return jsonify({"message": "Erro ao excluir coordenador"}), 500
    

@app.route('/coordenadores/delete/<int:id>', methods=['DELETE'])
def api_excluir_permanente(id):
    conexao = None
    try:
        print(f"Iniciando exclusão permanente do coordenador ID: {id}")  # Log para debug
        conexao = conectar_db()
        excluir_coordenador_permanente(conexao, id)
        return jsonify({"message": "Coordenador excluído permanentemente!", "status": "success"}), 200
    except ValueError as ve:
        print(f"Erro de validação: {str(ve)}")  # Log para debug
        return jsonify({"error": str(ve), "status": "validation_error"}), 400
    except Exception as e:
        print(f"Erro interno: {str(e)}")  # Log para debug
        return jsonify({"error": "Erro interno ao excluir coordenador", "details": str(e), "status": "error"}), 500
    finally:
        if conexao:
            conexao.close()
            print("Conexão fechada")  # Log para debug


@app.route('/coordenadores/inativos', methods=['GET'])
def listar_coordenadores_inativos_route():
    conexao = conectar_db()
    try:
        coordenadores_inativos = listar_coordenadores_inativos(conexao)
        return jsonify(coordenadores_inativos)
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    finally:
       conexao.close()

@app.route('/coordenadores/restaurar/<int:id>', methods=['PUT'])
def api_restaurar_coordenador(id):
    try:
        conexao = conectar_db()
        restaurar_coordenador(id, conexao)
        conexao.close()
        return jsonify({"message": "Coordenador restaurado com sucesso!"}), 200
    except ValueError as ve:
        return jsonify({"message": str(ve)}), 500
    except RuntimeError as re:
        return jsonify({"message": str(re)}), 500
    except Exception as e:
        print(f"Erro inesperado ao restaurar coordenador: {e}")
        return jsonify({"message": "Erro interno no servidor"}), 500
    

@app.route('/tarefas', methods=['GET'])
def get_tarefas():
    try:
        conexao = conectar_db()
        cursor = conexao.cursor(dictionary=True)
        query = "SELECT nome_tarefa FROM tipo_tarefa"
        cursor.execute(query)
        tarefas = cursor.fetchall()
        cursor.close()
        conexao.close()
        return jsonify([tarefa['nome_tarefa'] for tarefa in tarefas])
    except Exception as e:
        print(f"Erro ao buscar tarefas: {e}")
        return jsonify({"message": "Erro ao buscar tarefas"}), 500
    
 
            
        

if __name__ == '__main__':
    app.run(debug=True)