from flask import jsonify, request
from flask.blueprints import Blueprint
from main.service.miembros_service import (obtener_miembros as obtener_miembros_service,
                                           crear, editar, obtener_miembro_por, eliminar, obtener_miembro_por_email)
from main.settings import CODIGO_HTTP, SECRET_KEY
from main.models.Miembro import Miembro
from flask_bcrypt import Bcrypt
import jwt

miembros = Blueprint('miembros', __name__)

@miembros.route('/login', methods=['POST'])
def autenticar():
    """Loguea un miembro y retorna el token
    """
    data = request.get_json()
    email = data['email']
    password = data['password']

    # tabla miembro: email, nombre, apellido, password, permiso
    print(data)

    miembro = Miembro.query.filter_by(email=email).first()

    if miembro and Bcrypt().check_password_hash(miembro.password, password.encode('utf-8')):
        print(miembro)
        payload = {
			'nombre': miembro.nombre,
            'apellido': miembro.apellido,
            'permiso': miembro.permiso,
            'email': miembro.email
        }

        # Creacion del token usando el payload
        jwt_token = jwt.encode(
            payload,
            SECRET_KEY,
            algorithm='HS256')
        
        # Genero token.
        token = jwt_token.decode("utf-8")        

        if token:
            return jsonify({'token': token, 'code': CODIGO_HTTP["OK"]})

    else:
        return jsonify({'mensaje': 'Email o contraseña inválidos', 'code': CODIGO_HTTP["BAD_REQUEST"]})

@miembros.route('/register', methods=['POST'])
def registrar():
	try:
		data = request.get_json()
		nombre = data['nombre']
		apellido = data['apellido']
		email = data['email']
		password = data['password']
		fecha_de_nacimiento=data["fecha_de_nacimiento"]
	
	except:
	    return jsonify({'mensaje': 'Error', 'code': CODIGO_HTTP["BAD_REQUEST"]})
	
	try:
		miembro = crear(data)
		return jsonify({'miembro': miembro, 'code': CODIGO_HTTP["CREATED"]})
	
	except Exception as e:
		return jsonify({'mensaje': str(e),'code': CODIGO_HTTP["BAD_REQUEST"]})

@miembros.route('/members', methods=['GET'])
def obtener_miembros():
	try:
		query_params = request.args
		miembros = obtener_miembros_service(query_params)
		return jsonify({'miembros': miembros, 'code': CODIGO_HTTP["OK"]})
	except:
		return jsonify({'mensaje': 'Miembro no encontrado 1'}), CODIGO_HTTP["BAD_REQUEST"]

@miembros.route('/members/<int:id>', methods=['GET'])
def obtener_miembro(id):
	try:
		miembro = obtener_miembro_por(id)
		return jsonify({'miembro': miembro, 'code': CODIGO_HTTP["OK"]})
	except:
		return jsonify({'mensaje': 'Miembro no encontrado'}), CODIGO_HTTP["BAD_REQUEST"]

@miembros.route('/members', methods=['POST'])
def crear_miembro():
	try:
		data = request.get_json()
		miembro = crear(data)
		return jsonify({'miembro': miembro, 'code': CODIGO_HTTP["CREATED"]})
	except Exception as e:
		return jsonify({'mensaje': str(e), 'code': CODIGO_HTTP["BAD_REQUEST"]})

@miembros.route('/members/<int:id>', methods=['PUT'])
def editar_miembro(id):
	try:
		data = request.get_json()
		editar(id, data)
		return jsonify({'code': CODIGO_HTTP["OK"]})
	except:
		return jsonify({'mensaje': 'Parametros invalidos'}), CODIGO_HTTP["BAD_REQUEST"]

@miembros.route('/members/<int:id_miembro>', methods=['DELETE'])
def eliminar_miembro(id_miembro):
	try:
		eliminar(id_miembro)
		return jsonify({'mensaje': 'Miembro eliminado con exito!', 'code': CODIGO_HTTP["OK"]})
	except Exception as e:
		return jsonify({'mensaje': str(e), 'code': CODIGO_HTTP["NOT_FOUND"]})
