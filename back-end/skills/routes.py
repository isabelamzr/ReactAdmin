from flask import Blueprint, request, jsonify
from .database import (
    connect_db,
    create_skill,
    get_skills,
    update_skill,
    soft_delete_skill,
    delete_skill_permanently,
    restore_skill,
    show_inactive_skills
)

skills_routes = Blueprint('skills', __name__, url_prefix='/skills')

@skills_routes.route('', methods=['POST'])
def api_create_skill():
    try:
        dados = request.json
        conexao = connect_db()
        return create_skill(conexao, dados)
    except Exception as e:
        return jsonify({"message": f"Error creating skill: {e}"}), 500

@skills_routes.route('/read', methods=['GET'])
def api_get_skills():
    try:
        conexao = connect_db()
        skills = get_skills(conexao)
        return jsonify(skills), 200
    except Exception as e:
        return jsonify({"message": f"Unable to fetch skills: {e}"}), 500

@skills_routes.route('/update/<int:id>', methods=['PUT'])
def api_update_skill(id):
    try:
        dados = request.json
        conexao = connect_db()
        return update_skill(conexao, id, dados)
    except Exception as e:
        return jsonify({"message": f"Error updating skill: {e}"}), 500

@skills_routes.route('/soft_delete/<int:id>', methods=['DELETE'])
def api_soft_delete_skill(id):
    return soft_delete_skill(id)

@skills_routes.route('/delete/<int:id>', methods=['DELETE'])
def api_delete_skill_permanently(id):
    try:
        conexao = connect_db()
        delete_skill_permanently(conexao, id)
        return jsonify({"message": "Successfully deleted skill permanently!"}), 200
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": f"Internal error: {e}"}), 500

@skills_routes.route('/inativos', methods=['GET'])
def show_inactive_skills_route():
    try:
        conexao = connect_db()
        inactive_skills = show_inactive_skills(conexao)
        return jsonify(inactive_skills)
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@skills_routes.route('/restaurar/<int:id>', methods=['PUT'])
def api_restore_skill(id):
    try:
        conexao = connect_db()
        restore_skill(id, conexao)
        return jsonify({"message": "Successfully restored skill!"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500