# routes.py
from flask import Blueprint, request, jsonify
from .database import (
    conectar_db,
    criar_habilidade,
    obter_habilidades,
    atualizar_habilidade,
    soft_delete_habilidade,
    excluir_habilidade_permanente,
    restaurar_habilidade,
    listar_habilidades_inativas
)

habilidades_routes = Blueprint('habilidades', __name__, url_prefix='/habilidades')

@habilidades_routes.route('', methods=['POST'])
def api_criar_habilidade():
    try:
        dados = request.json
        conexao = conectar_db()
        return criar_habilidade(conexao, dados)
    except Exception as e:
        return jsonify({"message": f"Erro ao criar habilidade: {e}"}), 500

@habilidades_routes.route('/read', methods=['GET'])
def api_obter_habilidades():
    try:
        conexao = conectar_db()
        habilidades = obter_habilidades(conexao)
        return jsonify(habilidades), 200
    except Exception as e:
        return jsonify({"message": f"Erro ao obter habilidades: {e}"}), 500

@habilidades_routes.route('/update/<int:id>', methods=['PUT'])
def api_atualizar_habilidade(id):
    try:
        dados = request.json
        conexao = conectar_db()
        return atualizar_habilidade(conexao, id, dados)
    except Exception as e:
        return jsonify({"message": f"Erro ao atualizar habilidade: {e}"}), 500

@habilidades_routes.route('/soft_delete/<int:id>', methods=['DELETE'])
def api_soft_delete_habilidade(id):
    return soft_delete_habilidade(id)

@habilidades_routes.route('/delete/<int:id>', methods=['DELETE'])
def api_excluir_permanente(id):
    try:
        conexao = conectar_db()
        excluir_habilidade_permanente(conexao, id)
        return jsonify({"message": "Habilidade excluída permanentemente!"}), 200
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": f"Erro interno: {e}"}), 500

@habilidades_routes.route('/inativos', methods=['GET'])
def listar_habilidades_inativas_route():
    try:
        conexao = conectar_db()
        habilidades_inativas = listar_habilidades_inativas(conexao)
        return jsonify(habilidades_inativas)
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@habilidades_routes.route('/restaurar/<int:id>', methods=['PUT'])
def api_restaurar_habilidade(id):
    try:
        conexao = conectar_db()
        restaurar_habilidade(id, conexao)
        return jsonify({"message": "Habilidade restaurada com sucesso!"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500