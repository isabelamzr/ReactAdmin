# app.py

from flask import Flask, jsonify, request
from flask_cors import CORS
from formularios.formCoordenadores import (
    criar_coordenador,
    obter_coordenadores,
    atualizar_coordenador,
    soft_delete_coordenador,
    restaurar_coordenador,
    listar_coordenadores_inativos,
    conectar_db
)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 

# , resources={r"/*":{"origins": "http://localhost:3000"}}

@app.route('/coordenadores', methods=['POST'])

def api_criar_coordenador():

    try:
        dados = request.json
        print("Dados recebidos para criação:", dados)
        conexao = conectar_db()
        criar_coordenador(conexao, dados)
        conexao.close()
        return jsonify({"message": "Coordenador criado com sucesso!"}), 201
    
    except Exception as e:
        print(f"Erro ao criar coordenador: {e}")
        return jsonify({"message": "Erro ao criar coordenador"}), 500


@app.route('/coordenadores/read', methods=['GET'])
def api_obter_coordenadores():
    try:
        conexao = conectar_db()
        coordenadores = obter_coordenadores(conexao)
        conexao.close()

        return jsonify(coordenadores), 200
    
    except Exception as e:
        print(f"Erro ao obter coordenadores: {e}")
        return jsonify({"message": "Erro ao obter coordenadores"}), 500
    

@app.route('/coordenadores/<int:id>', methods=['PUT'])
def api_atualizar_coordenador(id):
    try:
        dados = request.json
        conexao = conectar_db()
        atualizar_coordenador(conexao, id, dados)
        conexao.close()
        return jsonify({"message": "Coordenador atualizado com sucesso!"}), 200
    
    except Exception as e:
        print(f"Erro ao atualizar coordenador: {e}")
        return jsonify({"message": "Erro ao atualizar coordenador"}), 500



@app.route('/coordenadores/soft_delete/<int:id>', methods=['DELETE'])
def api_soft_delete_coordenador(id):
    try:
        conexao = conectar_db()
        soft_delete_coordenador(id)
        conexao.close()
        return jsonify({"message": "Coordenador marcado como excluído com sucesso!"}), 200
    
    except Exception as e:
        print(f"Erro ao excluir coordenador: {e}")
        return jsonify({"message": "Erro ao excluir coordenador"}), 500

@app.route('/coordenadores/inativos', methods=['GET'])
def listar_coordenadores_inativos_route():
    conexao = conectar_db()
    try:
        coordenadores_inativos = listar_coordenadores_inativos(conexao)
        return jsonify(coordenadores_inativos)
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    finally:
       conexao.close()

@app.route('/coordenadores/restaurar/<int:id>', methods=['PUT'])
def api_restaurar_coordenador(id):
    try:
        conexao = conectar_db()
        restaurar_coordenador(id, conexao)
        conexao.close()
        return jsonify({"message": "Coordenador restaurado com sucesso!"}), 200
    except ValueError as ve:
        return jsonify({"message": str(ve)}), 500
    except RuntimeError as re:
        return jsonify({"message": str(re)}), 500
    except Exception as e:
        print(f"Erro inesperado ao restaurar coordenador: {e}")
        return jsonify({"message": "Erro interno no servidor"}), 500
    

@app.route('/tarefas', methods=['GET'])
def get_tarefas():
    try:
        conexao = conectar_db()
        cursor = conexao.cursor(dictionary=True)
        query = "SELECT nome_tarefa FROM tipo_tarefa"
        cursor.execute(query)
        tarefas = cursor.fetchall()
        cursor.close()
        conexao.close()
        return jsonify([tarefa['nome_tarefa'] for tarefa in tarefas])
    except Exception as e:
        print(f"Erro ao buscar tarefas: {e}")
        return jsonify({"message": "Erro ao buscar tarefas"}), 500
        
    


if __name__ == '__main__':
    app.run(debug=True)