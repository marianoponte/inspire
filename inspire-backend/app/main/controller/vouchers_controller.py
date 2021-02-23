from flask import jsonify, request
from flask.blueprints import Blueprint
from main.models.Voucher import Voucher
from main.settings import SECRET_KEY, CODIGO_HTTP
from main.service.vouchers_service import crear, obtener_vouchers as obtener_vouchers_service, obtener_voucher_por
import jwt

vouchers = Blueprint('vouchers', __name__)

@vouchers.route('/vouchers', methods=['GET'])
def obtener_vouchers():
    query_params = request.args
    vouchers = obtener_vouchers_service(query_params)
    return jsonify({'vouchers': vouchers, 'code': CODIGO_HTTP["OK"]})

@vouchers.route('/vouchers/<int:id>', methods=['GET'])
def obtener_voucher(id):
	try:
		voucher = obtener_voucher_por(id)
		return jsonify({'voucher': voucher, 'code': CODIGO_HTTP["OK"]})
	except:
		return jsonify({'mensaje': 'Voucher no encontrado', 'code': CODIGO_HTTP["BAD_REQUEST"]})

@vouchers.route('/vouchers', methods=['POST'])
def crear_voucher():
	data = request.get_json()	
	try:
		voucher = crear(data)
		return jsonify({'voucher': voucher, 'code': CODIGO_HTTP["CREATED"]})
	except Exception as e:
		return jsonify({'mensaje': str(e), 'code': CODIGO_HTTP["BAD_REQUEST"]})