from flask import Blueprint, request, jsonify
from .database import (
    conectar_db,
    criar_vaga,
    obter_vagas,
    atualizar_vaga,
    soft_delete_vaga,
    excluir_vaga_permanente,
    restaurar_vaga,
    listar_vagas_inativas
)

vagas_routes = Blueprint('vagas', __name__, url_prefix='/vagas')
status_routes = Blueprint('status_vaga', __name__, url_prefix='/status_vaga')

@status_routes.route('/read', methods=['GET'])
def get_status():
    conexao = conectar_db()
    cursor = conexao.cursor(dictionary=True)
    try:
        cursor.execute("SELECT id, descricao FROM status_vaga")
        status = cursor.fetchall()
        return jsonify(status)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conexao.close()

@vagas_routes.route('', methods=['POST'])
def api_criar_vaga():
    try:
        print("Método da requisição:", request.method)
        print("Headers:", request.headers)
        dados = request.json
        conexao = conectar_db()
        return criar_vaga(conexao, dados)
    except Exception as e:
        print("Erro na rota:", str(e))
        return jsonify({"message": f"Erro ao criar vaga: {e}"}), 500
    
@vagas_routes.route('/read', methods=['GET'])
def api_obter_vagas():
    try:
        conexao = conectar_db()
        vagas = obter_vagas(conexao)
        return jsonify(vagas), 200
    except Exception as e:
        return jsonify({"message": f"Erro ao obter vagas: {e}"}), 500
    
@vagas_routes.route('/update/<int:id>', methods=['PUT'])
def api_atualizar_vaga(id):
    try:
        dados = request.json
        conexao = conectar_db()
        return atualizar_vaga(conexao, id, dados)
    except Exception as e:
        return jsonify({"message": f"Erro ao atualizar vaga: {e}"}), 500
    
@vagas_routes.route('/soft_delete/<int:id>', methods=['DELETE'])
def api_soft_delete_vaga(id):
    return soft_delete_vaga(id)

@vagas_routes.route('/delete/<int:id>', methods=['DELETE'])
def api_excluir_permanente(id):
    try:
        conexao = conectar_db()
        excluir_vaga_permanente(conexao, id)
        return jsonify({"message": "Vaga excluída permanentemente!"}), 200
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": f"Erro interno: {e}"}), 500
    
@vagas_routes.route('/inativos', methods=['GET'])
def listar_vagas_inativas_route():
    try:
        conexao = conectar_db()
        vagas_inativas = listar_vagas_inativas(conexao)
        return jsonify(vagas_inativas)
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    
@vagas_routes.route('/restaurar/<int:id>', methods=['PUT'])
def api_restaurar_vaga(id):
    try:
        conexao = conectar_db()
        restaurar_vaga(id, conexao)
        return jsonify({"message": "Vaga restaurada com sucesso!"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500