# app.py

from flask import Flask, jsonify, request
from flask_cors import CORS
from formularios.formCoordenadores import (
    criar_coordenador,
    obter_coordenadores,
    atualizar_coordenador,
    soft_delete_coordenador,
    excluir_coordenador_permanente,
    restaurar_coordenador,
    listar_coordenadores_inativos,
    conectar_db
)

app = Flask(__name__)
CORS(app)

@app.route('/coordenadores', methods=['POST'])
def api_criar_coordenador():
    try:
        dados = request.json
        conexao = conectar_db()
        return criar_coordenador(conexao, dados)
    except Exception as e:
        return jsonify({"message": f"Erro ao criar coordenador: {e}"}), 500

@app.route('/coordenadores/read', methods=['GET'])
def api_obter_coordenadores():
    try:
        conexao = conectar_db()
        coordenadores = obter_coordenadores(conexao)
        return jsonify(coordenadores), 200
    except Exception as e:
        return jsonify({"message": f"Erro ao obter coordenadores: {e}"}), 500

@app.route('/coordenadores/update/<int:id>', methods=['PUT'])
def api_atualizar_coordenador(id):
    try:
        dados = request.json
        conexao = conectar_db()
        return atualizar_coordenador(conexao, id, dados)
    except Exception as e:
        return jsonify({"message": f"Erro ao atualizar coordenador: {e}"}), 500

@app.route('/coordenadores/soft_delete/<int:id>', methods=['DELETE'])
def api_soft_delete_coordenador(id):
    return soft_delete_coordenador(id)

@app.route('/coordenadores/delete/<int:id>', methods=['DELETE'])
def api_excluir_permanente(id):
    try:
        conexao = conectar_db()
        excluir_coordenador_permanente(conexao, id)
        return jsonify({"message": "Coordenador excluído permanentemente!"}), 200
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": f"Erro interno: {e}"}), 500

@app.route('/coordenadores/inativos', methods=['GET'])
def listar_coordenadores_inativos_route():
    try:
        conexao = conectar_db()
        coordenadores_inativos = listar_coordenadores_inativos(conexao)
        return jsonify(coordenadores_inativos)
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@app.route('/coordenadores/restaurar/<int:id>', methods=['PUT'])
def api_restaurar_coordenador(id):
    try:
        conexao = conectar_db()
        restaurar_coordenador(id, conexao)
        return jsonify({"message": "Coordenador restaurado com sucesso!"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)