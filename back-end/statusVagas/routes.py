from flask import Blueprint, request, jsonify
from .database import (
    conectar_db,
    criar_status_vaga,
    obter_status_vagas,
    atualizar_status_vaga,
    soft_delete_status_vaga,
    excluir_status_vaga_permanente,
    restaurar_status_vaga,
    listar_status_vagas_inativos
)

status_vagas_routes = Blueprint('status_vagas', __name__, url_prefix='/status_vagas')

@status_vagas_routes.route('', methods=['POST'])
def api_criar_status_vaga():
    try:
        dados = request.json
        conexao = conectar_db()
        return criar_status_vaga(conexao, dados)
    except Exception as e:
        return jsonify({"message": f"Erro ao criar status de vaga: {e}"}), 500

@status_vagas_routes.route('/read', methods=['GET'])
def api_obter_status_vagas():
    try:
        conexao = conectar_db()
        status_vagas = obter_status_vagas(conexao)
        print("Status Vagas:", status_vagas)
        return jsonify(status_vagas), 200
    except Exception as e:
        print("Erro:", str(e))
        return jsonify({"message": f"Erro ao obter status de vagas: {e}"}), 500

@status_vagas_routes.route('/update/<int:id>', methods=['PUT'])
def api_atualizar_status_vaga(id):
    try:
        dados = request.json
        conexao = conectar_db()
        return atualizar_status_vaga(conexao, id, dados)
    except Exception as e:
        return jsonify({"message": f"Erro ao atualizar status de vaga: {e}"}), 500

@status_vagas_routes.route('/soft_delete/<int:id>', methods=['DELETE'])
def api_soft_delete_status_vaga(id):
    return soft_delete_status_vaga(id)

@status_vagas_routes.route('/delete/<int:id>', methods=['DELETE'])
def api_excluir_permanente(id):
    try:
        conexao = conectar_db()
        excluir_status_vaga_permanente(conexao, id)
        return jsonify({"message": "Status de vaga excluído permanentemente!"}), 200
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": f"Erro interno: {e}"}), 500

@status_vagas_routes.route('/inativos', methods=['GET'])
def listar_status_vagas_inativos_route():
    try:
        conexao = conectar_db()
        status_vagas_inativos = listar_status_vagas_inativos(conexao)
        return jsonify(status_vagas_inativos)
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@status_vagas_routes.route('/restaurar/<int:id>', methods=['PUT'])
def api_restaurar_status_vaga(id):
    try:
        conexao = conectar_db()
        restaurar_status_vaga(id, conexao)
        return jsonify({"message": "Status de vaga restaurado com sucesso!"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500