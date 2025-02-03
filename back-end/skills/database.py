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
        print(f"Unable to connect database: {err}")
        return None

def create_skill(conexao, dados):
    if not conexao:
        return jsonify({"message": "Unable to connect database"}), 500

    cursor = conexao.cursor()
    query = "INSERT INTO habilidades (descricao, talentos) VALUES (%s, %s)"
    valores = (dados['descricao'], dados['talentos'])

    try:
        cursor.execute(query, valores)
        conexao.commit()
        return jsonify({"message": "Skill created successfully!"}), 201
    except Exception as e:
        return jsonify({"message": f"Failed to create skill: {str(e)}"}), 500
    finally:
        cursor.close()
        conexao.close()

def get_skills(conexao):
    if conexao is None:
        return jsonify({"error": "Unable to connect database"}), 500

    try:
        cursor = conexao.cursor(dictionary=True)
        query = "SELECT * FROM habilidades WHERE ativo = 1"
        cursor.execute(query)
        resultado = cursor.fetchall()
        return resultado
    except Exception as e:
        return jsonify({"error": f"Error executing the SQL query: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def update_skill(conexao, id, dados):
    if not conexao:
        return jsonify({"message": "Unable to connect to the database"}), 500

    cursor = conexao.cursor()
    query = "UPDATE habilidades SET descricao = %s, talentos = %s WHERE id = %s"
    valores = (dados['descricao'], dados['talentos'], id)

    try:
        cursor.execute(query, valores)
        conexao.commit()
        return jsonify({"message": "Skill updated successfully!"})
    except Exception as e:
        return jsonify({"message": f"Failed to update coordinator: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def soft_delete_skill(id):
    conexao = connect_db()
    if not conexao:
        return jsonify({"message": "Unable to connect to the database"}), 500

    cursor = conexao.cursor()
    query = "UPDATE habilidades SET ativo = 0 WHERE id = %s"

    try:
        cursor.execute(query, (id,))
        conexao.commit()
        return jsonify({"message": "Skill marked successfully as deleted!"}), 200
    except Exception as e:
        return jsonify({"message": f"Failed to mark skill as deleted: {e}"}), 500
    finally:
        cursor.close()
        conexao.close()

def delete_skill_permanently(conexao, id):
    try:
        with conexao.cursor() as cursor:
            cursor.execute("DELETE FROM habilidades WHERE id = %s", (id,))
            conexao.commit()
            return True
    except Exception as e:
        conexao.rollback()
        raise ValueError(f"Error permanently deleting skill: {e}")

def show_inactive_skills(conexao):
    try:
        with conexao.cursor(dictionary=True) as cursor:
            query = "SELECT * FROM habilidades WHERE ativo = 0"
            cursor.execute(query)
            return cursor.fetchall()
    except Exception as e:
        raise ValueError(f"Failed to list inactive skills: {e}")

def restore_skill(id, conexao):
    if not conexao:
        raise ValueError("Unable to connect database.")
    
    cursor = conexao.cursor()
    query = "UPDATE habilidades SET ativo = 1 WHERE id = %s"

    try:
        cursor.execute(query, (id,))
        conexao.commit()
    except Exception as e:
        raise RuntimeError(f"Failed to restore skill: {e}")
    finally:
      cursor.close()