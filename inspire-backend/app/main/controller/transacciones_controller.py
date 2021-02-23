from flask import jsonify, request
from flask.blueprints import Blueprint
from main.service.transacciones_service import (archivar, crear, obtener_transaccion_por)
from main.service.transacciones_service import \
    obtener_transacciones as obtener_transacciones_service
from main.settings import CODIGO_HTTP
from main.controller.utils import login_requerido

transacciones = Blueprint('transacciones', __name__)

@transacciones.route('/transactions', methods=['GET'])
def obtener_transactions():
	try:
		query_params = request.args
		transacciones = obtener_transacciones_service(query_params)
		return jsonify({'transacciones': transacciones, 'code': CODIGO_HTTP["OK"]})
	except:
		return jsonify({'mensaje': 'Transacción no encontrada', 'code': CODIGO_HTTP["BAD_REQUEST"]})

@transacciones.route('/transactions/<int:id>', methods=['GET'])
def obtener_transaccion(id):
	try:
		transaccion = obtener_transaccion_por(id)
		return jsonify({'transaccion': transaccion, 'code': CODIGO_HTTP["OK"]})
	except:
		return jsonify({'mensaje': 'Transacción no encontrada', 'code': CODIGO_HTTP["BAD_REQUEST"]})

@transacciones.route('/transactions', methods=['POST'])
def crear_transaccion():
	data = request.get_json()
	try:
		transaccion = crear(data)
		return jsonify({'transaccion': transaccion, 'code': CODIGO_HTTP["CREATED"]})

	except Exception as e:
		return jsonify({'mensaje': str(e), 'code': CODIGO_HTTP["BAD_REQUEST"]})

"""
@transacciones.route('/transactions/<int:id_transaccion>', methods=['PUT'])
def editar_transaccion(id_transaccion):

	try:
		data = request.get_json()
		nombre = data['nombre']
		descripcion = data['descripcion']
		tipo = data['tipo'].lower()
		estado = data['estado'].lower()
		severidad = data['severidad'].lower()
		id_cliente = data['cliente']['id']
	except:
		return jsonify({'mensaje': 'Parametros invalidos'}), CODIGO_HTTP["BAD_REQUEST"]

	try:
		editar(id_transaccion, data)
		return jsonify(), CODIGO_HTTP["NO_CONTENT"]
	except Exception as e:
		return jsonify({'mensaje': str(e)}), CODIGO_HTTP["BAD_REQUEST"]
"""

@transacciones.route('/transactions/<int:id_transaccion>', methods=['DELETE'])
def archivar_transaccion(id_transaccion):
	try:
		archivar(id_transaccion)
		return jsonify({'mensaje': 'transaccion archivada con exito!'}), CODIGO_HTTP["OK"]
	except Exception as e:
		return jsonify({'mensaje': str(e)}), CODIGO_HTTP["BAD_REQUEST"]