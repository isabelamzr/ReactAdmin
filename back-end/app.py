from flask import Flask
from flask_cors import CORS
from coordinators.routes import coordinators_routes
from tarefas.routes import tarefas_routes
from voluntarios.routes import voluntarios_routes
from vagas.routes import vagas_routes
from unidades.routes import unidades_routes
from statusVagas.routes import status_vagas_routes
from tiposTarefas.routes import tipos_tarefas_routes
from skills.routes import skills_routes
from vagas.routes import vagas_routes, status_routes

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.register_blueprint(coordinators_routes)
app.register_blueprint(tarefas_routes)
app.register_blueprint(voluntarios_routes)
app.register_blueprint(vagas_routes)
app.register_blueprint(status_routes)
app.register_blueprint(unidades_routes)
app.register_blueprint(status_vagas_routes)
app.register_blueprint(tipos_tarefas_routes)
app.register_blueprint(skills_routes)

if __name__ == '__main__':
    app.run(debug=True)