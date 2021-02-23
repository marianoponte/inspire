from flask import jsonify, request
from flask.blueprints import Blueprint
from main.service.productos_service import (crear, obtener_producto_por, eliminar)
from main.service.productos_service import \
    obtener_productos as obtener_productos_service
from main.settings import CODIGO_HTTP
from main.controller.utils import login_requerido

productos = Blueprint('productos', __name__)

@productos.route('/products', methods=['GET'])
def obtener_productos():
	query_params = request.args

	productos = obtener_productos_service()

	return jsonify({'productos': productos, 'code': CODIGO_HTTP["OK"]})

@productos.route('/products/<int:id>', methods=['GET'])
def obtener_producto(id):
	try:
		producto = obtener_producto_por(id)
		return jsonify({'producto': producto, 'code': CODIGO_HTTP["OK"]})
	except:
		return jsonify({'mensaje': 'Producto no encontrado', 'code': CODIGO_HTTP["BAD_REQUEST"]})

@productos.route('/products', methods=['POST'])
def crear_producto():
    try:
        data = request.get_json()
        nombre = data['nombre']
        urlImage = data['urlImage']
        puntos = data['puntos']
        descripcion = data['descripcion']
    except:
        return jsonify({'mensaje': 'Parámetros inválidos', 'code': CODIGO_HTTP["BAD_REQUEST"]})
    try:
        producto = crear(data)
        return jsonify({'producto': producto, 'code': CODIGO_HTTP["CREATED"]})

    except Exception as e:
        return jsonify({'mensaje': str(e), 'code': CODIGO_HTTP["BAD_REQUEST"]})

@productos.route('/products/<int:id_producto>', methods=['DELETE'])
def eliminar_producto(id_producto):
	try:
		eliminar(id_producto)
		return jsonify({'mensaje': 'Producto eliminado con exito!'}), CODIGO_HTTP["OK"]
	except Exception as e:
		return jsonify({'mensaje': str(e)}), CODIGO_HTTP["NOT_FOUND"]