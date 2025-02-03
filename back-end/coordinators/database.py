import mysql.connector
import os
from dotenv import load_dotenv
from flask import jsonify

load_dotenv()

def connect_db():
    try:
        return mysql.connector.connect(
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PWD"), 
            database=os.getenv("DB_NAME")
        )
    except mysql.connector.Error as err:
        print(f"Unable to connect to the database: {err}")
        return None

def create_coordinator(conexao, dados):
    if not conexao:
        return jsonify({"message": "Unable to connect to the database"}), 500

    cursor = conexao.cursor()
    query = "INSERT INTO coordenador (nome, telefone, email, genero) VALUES (%s, %s, %s, %s)"
    valores = (dados['nome'], dados['telefone'], dados['email'], dados['genero'])

    try:
        cursor.execute(query, valores)
        conexao.commit()
        return jsonify({"message": "Coordinator created successfully!"}), 201
    except Exception as e:
        return jsonify({"message": f"Failed to create coordinator: {str(e)}"}), 500
    finally:
        cursor.close()
        conexao.close()

def get_coordinators(conexao):
    if conexao is None:
        return jsonify({"error": "Unable to connect to the database"}), 500

    try:
        cursor = conexao.cursor(dictionary=True)
        query = "SELECT * FROM coordenador WHERE ativo = 1"
        cursor.execute(query)
        resultado = cursor.fetchall()
        return resultado
    except Exception as e:
        return jsonify({"error": f"Error executing the SQL query: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def update_coordinator(conexao, id, dados):
    if not conexao:
        return jsonify({"message": "Unable to connect to the database"}), 500

    cursor = conexao.cursor()
    query = "UPDATE coordenador SET nome = %s, telefone = %s, email = %s, genero = %s WHERE id = %s"
    valores = (dados['nome'], dados['telefone'], dados['email'], dados['genero'], id)

    try:
        cursor.execute(query, valores)
        conexao.commit()
        return jsonify({"message": "Coordinator updated successfully!"})
    except Exception as e:
        return jsonify({"message": f"Failed to update coordinator: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def soft_delete_coordinator(id):
    conexao = connect_db()
    if not conexao:
        return jsonify({"message": "Unable to connect to the database"}), 500

    cursor = conexao.cursor()
    query = "UPDATE coordenador SET ativo = 0 WHERE id = %s"

    try:
        cursor.execute(query, (id,))
        conexao.commit()
        return jsonify({"message": "Successfully marked coordinator as deleted!"}), 200
    except Exception as e:
        return jsonify({"message": f"Failed to mark coordinator as deleted: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def delete_coordinator_permanently(conexao, id):
    try:
        with conexao.cursor() as cursor:
            cursor.execute("DELETE FROM coordenador WHERE id = %s", (id,))
            conexao.commit()
            return True
    except Exception as e:
        conexao.rollback()
        raise ValueError(f"Error permanently deleting coordinator: {e}")

def show_inactive_coordinators(conexao):
    try:
        with conexao.cursor(dictionary=True) as cursor:
            query = "SELECT * FROM coordenador WHERE ativo = 0"
            cursor.execute(query)
            return cursor.fetchall()
    except Exception as e:
        raise ValueError(f"Failed to list inactive coordinators: {e}")

def restore_coordinator(id, conexao):
    if not conexao:
        raise ValueError("Unable to connect to the database.")
    
    cursor = conexao.cursor()
    query = "UPDATE coordenador SET ativo = 1 WHERE id = %s"

    try:
        cursor.execute(query, (id,))
        conexao.commit()
    except Exception as e:
        raise RuntimeError(f"Failed to restore coordinator: {e}")
    finally:
      cursor.close()