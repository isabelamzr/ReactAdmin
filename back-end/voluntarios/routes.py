from flask import Blueprint, request, jsonify
from .database import (
    conectar_db,
    criar_voluntario,
    obter_voluntarios,
    atualizar_voluntario,
    soft_delete_voluntario,
    excluir_voluntario_permanente,
    restaurar_voluntario,
    listar_voluntarios_inativos
)

voluntarios_routes = Blueprint('voluntarios', __name__, url_prefix='/voluntarios')

@voluntarios_routes.route('', methods=['POST'])
def api_criar_voluntario():
    try:
        dados = request.json
        conexao = conectar_db()
        return criar_voluntario(conexao, dados)
    except Exception as e:
        return jsonify({"message": f"Erro ao criar voluntário: {e}"}), 500

@voluntarios_routes.route('/read', methods=['GET'])
def api_obter_voluntarios():
    try:
        conexao = conectar_db()
        voluntarios = obter_voluntarios(conexao)
        return jsonify(voluntarios), 200
    except Exception as e:
        return jsonify({"message": f"Erro ao obter voluntários: {e}"}), 500

@voluntarios_routes.route('/update/<int:id>', methods=['PUT'])
def api_atualizar_voluntario(id):
    try:
        dados = request.json
        conexao = conectar_db()
        return atualizar_voluntario(conexao, id, dados)
    except Exception as e:
        return jsonify({"message": f"Erro ao atualizar voluntário: {e}"}), 500

@voluntarios_routes.route('/soft_delete/<int:id>', methods=['DELETE'])
def api_soft_delete_voluntario(id):
    return soft_delete_voluntario(id)

@voluntarios_routes.route('/delete/<int:id>', methods=['DELETE'])
def api_excluir_permanente(id):
    try:
        conexao = conectar_db()
        excluir_voluntario_permanente(conexao, id)
        return jsonify({"message": "Voluntário excluído permanentemente!"}), 200
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": f"Erro interno: {e}"}), 500

@voluntarios_routes.route('/inativos', methods=['GET'])
def listar_voluntarios_inativos_route():
    try:
        conexao = conectar_db()
        voluntarios_inativos = listar_voluntarios_inativos(conexao)
        return jsonify(voluntarios_inativos)
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@voluntarios_routes.route('/restaurar/<int:id>', methods=['PUT'])
def api_restaurar_voluntario(id):
    try:
        conexao = conectar_db()
        restaurar_voluntario(id, conexao)
        return jsonify({"message": "Voluntário restaurado com sucesso!"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500