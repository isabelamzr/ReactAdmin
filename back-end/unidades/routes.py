from flask import Blueprint, request, jsonify
from .database import (
    conectar_db,
    criar_unidade,
    obter_unidades,
    atualizar_unidade,
    soft_delete_unidade,
    excluir_unidade_permanente,
    restaurar_unidade,
    listar_unidades_inativas
)

unidades_routes = Blueprint('unidades', __name__, url_prefix='/unidades')

@unidades_routes.route('', methods=['POST'])
def api_criar_unidade():
    try:
        dados = request.json
        conexao = conectar_db()
        return criar_unidade(conexao, dados)
    except Exception as e:
        return jsonify({"message": f"Erro ao criar unidade: {e}"}), 500

@unidades_routes.route('/read', methods=['GET'])
def api_obter_unidades():
    try:
        conexao = conectar_db()
        unidades = obter_unidades(conexao)
        return jsonify(unidades), 200
    except Exception as e:
        return jsonify({"message": f"Erro ao obter unidades: {e}"}), 500

@unidades_routes.route('/update/<int:id>', methods=['PUT'])
def api_atualizar_unidade(id):
    try:
        dados = request.json
        conexao = conectar_db()
        return atualizar_unidade(conexao, id, dados)
    except Exception as e:
        return jsonify({"message": f"Erro ao atualizar unidade: {e}"}), 500

@unidades_routes.route('/soft_delete/<int:id>', methods=['DELETE'])
def api_soft_delete_unidade(id):
    return soft_delete_unidade(id)

@unidades_routes.route('/delete/<int:id>', methods=['DELETE'])
def api_excluir_permanente(id):
    try:
        conexao = conectar_db()
        excluir_unidade_permanente(conexao, id)
        return jsonify({"message": "Unidade excluída permanentemente!"}), 200
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": f"Erro interno: {e}"}), 500

@unidades_routes.route('/inativos', methods=['GET'])
def listar_unidades_inativas_route():
    try:
        conexao = conectar_db()
        unidades_inativas = listar_unidades_inativas(conexao)
        return jsonify(unidades_inativas)
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@unidades_routes.route('/restaurar/<int:id>', methods=['PUT'])
def api_restaurar_unidade(id):
    try:
        conexao = conectar_db()
        restaurar_unidade(id, conexao)
        return jsonify({"message": "Unidade restaurada com sucesso!"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500