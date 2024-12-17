from flask import Blueprint, request, jsonify
from .database import (
    conectar_db,
    criar_tarefa,
    obter_tarefas,
    atualizar_tarefa,
    soft_delete_tarefa,
    excluir_tarefa_permanente,
    restaurar_tarefa,
    listar_tarefas_inativas
)

tarefas_routes = Blueprint('tarefas', __name__, url_prefix='/tarefas')

@tarefas_routes.route('', methods=['POST'])
def api_criar_tarefa():
    try:
        dados = request.json
        conexao = conectar_db()
        return criar_tarefa(conexao, dados)
    except Exception as e:
        return jsonify({"message": f"Erro ao criar tarefa: {e}"}), 500

@tarefas_routes.route('/read', methods=['GET'])
def api_obter_tarefas():
    try:
        conexao = conectar_db()
        tarefas = obter_tarefas(conexao)
        return jsonify(tarefas), 200
    except Exception as e:
        return jsonify({"message": f"Erro ao obter tarefas: {e}"}), 500

@tarefas_routes.route('/update/<int:id>', methods=['PUT'])
def api_atualizar_tarefa(id):
    try:
        dados = request.json
        conexao = conectar_db()
        return atualizar_tarefa(conexao, id, dados)
    except Exception as e:
        return jsonify({"message": f"Erro ao atualizar tarefa: {e}"}), 500

@tarefas_routes.route('/soft_delete/<int:id>', methods=['DELETE'])
def api_soft_delete_tarefa(id):
    return soft_delete_tarefa(id)

@tarefas_routes.route('/delete/<int:id>', methods=['DELETE'])
def api_excluir_permanente(id):
    try:
        conexao = conectar_db()
        excluir_tarefa_permanente(conexao, id)
        return jsonify({"message": "Tarefa excluída permanentemente!"}), 200
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": f"Erro interno: {e}"}), 500

@tarefas_routes.route('/inativos', methods=['GET'])
def listar_tarefas_inativas_route():
    try:
        conexao = conectar_db()
        tarefas_inativas = listar_tarefas_inativas(conexao)
        return jsonify(tarefas_inativas)
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@tarefas_routes.route('/restaurar/<int:id>', methods=['PUT'])
def api_restaurar_tarefa(id):
    try:
        conexao = conectar_db()
        restaurar_tarefa(id, conexao)
        return jsonify({"message": "Tarefa restaurada com sucesso!"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500