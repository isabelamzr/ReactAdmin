from flask import Blueprint, request, jsonify
from .database import (
    conectar_db,
    criar_tipo_tarefa,
    obter_tipos_tarefas,
    atualizar_tipo_tarefa,
    soft_delete_tipo_tarefa,
    excluir_tipo_tarefa_permanente,
    restaurar_tipo_tarefa,
    listar_tipos_tarefas_inativos
)

tipos_tarefas_routes = Blueprint('tipos_tarefas', __name__, url_prefix='/tipo_tarefa')

@tipos_tarefas_routes.route('', methods=['POST'])
def api_criar_tipo_tarefa():
    try:
        dados = request.json
        conexao = conectar_db()
        return criar_tipo_tarefa(conexao, dados)
    except Exception as e:
        return jsonify({"message": f"Erro ao criar tipo de tarefa: {e}"}), 500

@tipos_tarefas_routes.route('/read', methods=['GET'])
def api_obter_tipos_tarefas():
    try:
        conexao = conectar_db()
        tipos_tarefas = obter_tipos_tarefas(conexao)
        return jsonify(tipos_tarefas), 200
    except Exception as e:
        return jsonify({"message": f"Erro ao obter tipos de tarefas: {e}"}), 500

@tipos_tarefas_routes.route('/update/<int:id>', methods=['PUT'])
def api_atualizar_tipo_tarefa(id):
    try:
        dados = request.json
        conexao = conectar_db()
        return atualizar_tipo_tarefa(conexao, id, dados)
    except Exception as e:
        return jsonify({"message": f"Erro ao atualizar tipo de tarefa: {e}"}), 500

@tipos_tarefas_routes.route('/soft_delete/<int:id>', methods=['DELETE'])
def api_soft_delete_tipo_tarefa(id):
    return soft_delete_tipo_tarefa(id)

@tipos_tarefas_routes.route('/delete/<int:id>', methods=['DELETE'])
def api_excluir_permanente(id):
    try:
        conexao = conectar_db()
        excluir_tipo_tarefa_permanente(conexao, id)
        return jsonify({"message": "Tipo de tarefa excluído permanentemente!"}), 200
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": f"Erro interno: {e}"}), 500

@tipos_tarefas_routes.route('/inativos', methods=['GET'])
def listar_tipos_tarefas_inativos_route():
    try:
        conexao = conectar_db()
        tipos_tarefas_inativos = listar_tipos_tarefas_inativos(conexao)
        return jsonify(tipos_tarefas_inativos)
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@tipos_tarefas_routes.route('/restaurar/<int:id>', methods=['PUT'])
def api_restaurar_tipo_tarefa(id):
    try:
        conexao = conectar_db()
        restaurar_tipo_tarefa(id, conexao)
        return jsonify({"message": "Tipo de tarefa restaurado com sucesso!"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500