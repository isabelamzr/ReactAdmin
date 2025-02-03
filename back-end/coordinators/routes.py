from flask import Blueprint, request, jsonify
from .database import (
    connect_db,
    create_coordinator,
    get_coordinators,
    update_coordinator,
    soft_delete_coordinator,
    delete_coordinator_permanently,
    restore_coordinator,
    show_inactive_coordinators
)

coordinators_routes = Blueprint('coordinators', __name__, url_prefix='/coordinators')

@coordinators_routes.route('', methods=['POST'])
def api_insert_coordinator():
    try:
        dados = request.json
        conexao = connect_db()
        return create_coordinator(conexao, dados)
    except Exception as e:
        return jsonify({"message": f"Error creating coordinator: {e}"}), 500

@coordinators_routes.route('/read', methods=['GET'])
def api_get_coordinators():
    try:
        conexao = connect_db()
        coordinators = get_coordinators(conexao)
        return jsonify(coordinators), 200
    except Exception as e:
        return jsonify({"message": f"Unable to fetch coordinators: {e}"}), 500

@coordinators_routes.route('/update/<int:id>', methods=['PUT'])
def api_update_coordinator(id):
    try:
        dados = request.json
        conexao = connect_db()
        return update_coordinator(conexao, id, dados)
    except Exception as e:
        return jsonify({"message": f"Error updating coordinator: {e}"}), 500

@coordinators_routes.route('/soft_delete/<int:id>', methods=['DELETE'])
def api_soft_delete_coordinator(id):
    return soft_delete_coordinator(id)

@coordinators_routes.route('/delete/<int:id>', methods=['DELETE'])
def api_delete_coordinator_permanently(id):
    try:
        conexao = connect_db()
        delete_coordinator_permanently(conexao, id)
        return jsonify({"message": "Successfully deleted coordinator permanently!"}), 200
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": f"Internal error: {e}"}), 500

@coordinators_routes.route('/inativos', methods=['GET'])
def show_inactive_coordinators_route():
    try:
        conexao = connect_db()
        inactive_coordinators = show_inactive_coordinators(conexao)
        return jsonify(inactive_coordinators)
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@coordinators_routes.route('/restaurar/<int:id>', methods=['PUT'])
def api_restaurar_coordenador(id):
    try:
        conexao = connect_db()
        restore_coordinator(id, conexao)
        return jsonify({"message": "Successfully restored coordinator!"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500