from main.config import config
from main.controller.miembros_controller import miembros
from main.controller.transacciones_controller import transacciones
from main.controller.vouchers_controller import vouchers
from main.controller.productos_controller import productos
from main.db.database import db
#from main.settings import SWAGGER_URL, SWAGGERUI_BLUEPRINT

from decouple import config as config_decouple
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate

#Se crea la aplicación de Flask, se puede omitir pero sirve para testear. Se pasa el entorno por ejemplo, testing, prod
# y se levanta la apliación con esa configuración.

def create_app(env):
    app = Flask(__name__)
    #Si ponemos el CORS es para que se pueda enviar peticiones de cualquier lado, sino tira error en el navegador.
    cors = CORS(app)

    app.config.from_object(env)

#   app.register_blueprint(SWAGGERUI_BLUEPRINT, url_prefix=SWAGGER_URL)
    app.register_blueprint(transacciones)
    app.register_blueprint(miembros)
    app.register_blueprint(vouchers)
    app.register_blueprint(productos)

    with app.app_context():
        db.init_app(app)
#        db.create_all()
    
    Migrate(app,db)
    return app

#El enviroment es development a menos que sea production
environment = config['development']
if config_decouple('PRODUCTION', default=False):
    enviroment = config['production']

app = create_app(environment)

if __name__ == '__main__':
    app.run()