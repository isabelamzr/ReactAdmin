# routes.py

from flask import Blueprint, request, jsonify
from .database import (
    conectar_db,
    criar_coordenador,
    obter_coordenadores,
    atualizar_coordenador,
    soft_delete_coordenador,
    excluir_coordenador_permanente,
    restaurar_coordenador,
    listar_coordenadores_inativos
)

coordenadores_routes = Blueprint('coordenadores', __name__, url_prefix='/coordenadores')

@coordenadores_routes.route('', methods=['POST'])
def api_criar_coordenador():
    try:
        dados = request.json
        conexao = conectar_db()
        return criar_coordenador(conexao, dados)
    except Exception as e:
        return jsonify({"message": f"Erro ao criar coordenador: {e}"}), 500

@coordenadores_routes.route('/read', methods=['GET'])
def api_obter_coordenadores():
    try:
        conexao = conectar_db()
        coordenadores = obter_coordenadores(conexao)
        return jsonify(coordenadores), 200
    except Exception as e:
        return jsonify({"message": f"Erro ao obter coordenadores: {e}"}), 500

@coordenadores_routes.route('/update/<int:id>', methods=['PUT'])
def api_atualizar_coordenador(id):
    try:
        dados = request.json
        conexao = conectar_db()
        return atualizar_coordenador(conexao, id, dados)
    except Exception as e:
        return jsonify({"message": f"Erro ao atualizar coordenador: {e}"}), 500

@coordenadores_routes.route('/soft_delete/<int:id>', methods=['DELETE'])
def api_soft_delete_coordenador(id):
    return soft_delete_coordenador(id)

@coordenadores_routes.route('/delete/<int:id>', methods=['DELETE'])
def api_excluir_permanente(id):
    try:
        conexao = conectar_db()
        excluir_coordenador_permanente(conexao, id)
        return jsonify({"message": "Coordenador excluído permanentemente!"}), 200
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": f"Erro interno: {e}"}), 500

@coordenadores_routes.route('/inativos', methods=['GET'])
def listar_coordenadores_inativos_route():
    try:
        conexao = conectar_db()
        coordenadores_inativos = listar_coordenadores_inativos(conexao)
        return jsonify(coordenadores_inativos)
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@coordenadores_routes.route('/restaurar/<int:id>', methods=['PUT'])
def api_restaurar_coordenador(id):
    try:
        conexao = conectar_db()
        restaurar_coordenador(id, conexao)
        return jsonify({"message": "Coordenador restaurado com sucesso!"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500