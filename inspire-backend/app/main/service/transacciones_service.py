from datetime import datetime, timedelta, date
from pytz import timezone
from random import randint, uniform,random
from sqlalchemy import func

from main.db.database import (agregar_instancia, editar_instancia,
                              eliminar_instancia,
                              obtener_instancias_por_filtro,
                              obtener_todas_las_instancias,
                              obtener_una_instancia)
from main.models.Transaccion import Transaccion

def obtener_transacciones(query_params):
	transacciones = []
	if query_params:
		transacciones = obtener_instancias_por_filtro(Transaccion, **query_params)
	else:
		transacciones = obtener_todas_las_instancias(Transaccion)
	transacciones.sort(key=lambda transaccion: transaccion.fecha_creacion, reverse=True)
	return [t.a_diccionario() for t in transacciones]

def obtener_transaccion_por(id):
	transaccion = obtener_una_instancia(Transaccion, id=id)

	return transaccion.a_diccionario()

def crear(transaccion):
	id_miembro = transaccion['id_miembro']
	fecha_creacion = datetime.now(timezone('America/Argentina/Buenos_Aires'))

	if not transaccion['puntos']:
		puntos = 0
	else:
		puntos = transaccion['puntos']

	if not transaccion['monto']:
		monto = 0 
	else: 
		monto = transaccion['monto']

	if not transaccion['id_producto']:
		producto = None
	else:
		producto = transaccion['id_producto']

	if not transaccion['puntos']:
		if transaccion['monto']:
			puntos = round(int(transaccion['monto']) / 2)

	print("Puntos:", puntos)
	print("Monto:", monto)
	print(transaccion['tipo'])

	transaccion = agregar_instancia(Transaccion,
						descripcion=transaccion['descripcion'],
						tipo=transaccion['tipo'],
						monto=monto,
						fecha_creacion=fecha_creacion,
						fecha_ultima_actualizacion=fecha_creacion,
						puntos=puntos,
						id_miembro=id_miembro,
						id_producto=producto)

	return transaccion.a_diccionario()

def crear_transaccion_canje(transaccion):
	id_miembro = transaccion['id_miembro']
	fecha_creacion = datetime.now(timezone('America/Argentina/Buenos_Aires'))
	
	if transaccion['puntos']:
		puntos = transaccion['puntos']
	else: puntos = 0

	if transaccion['monto']:
		monto = transaccion['monto']
	else: monto = 0

	transaccion = agregar_instancia(Transaccion,
						descripcion=transaccion['descripcion'],
						tipo=transaccion['tipo'],
						monto=monto,
						fecha_creacion=fecha_creacion,
						fecha_ultima_actualizacion=fecha_creacion,
						puntos=puntos,
						id_miembro=id_miembro)

	return transaccion.a_diccionario()

"""
def editar(id, ticket_editado):

	ticket_almacenado = obtener_una_instancia(Transaccion, id=id)

	if not ticket_almacenado:
		raise Exception("No existe el ticket solicitado")

	id_cliente = ticket_editado['cliente']['id']

	pasos = ticket_editado.get('pasos')
	responsable = ticket_editado.get('legajo_responsable')

	estado = ticket_editado['estado'].lower()

	if ticket_almacenado.estado == 'cerrado':
		raise Exception('El ticket ya fue cerrado previamente')

	if estado not in ['nuevo', 'en progreso', 'cerrado', 'esperando informacion']:
		raise Exception('El estado de ticket debe ser Nuevo/Asignado/Cerrado/Esperando Informacion')
	# , CODIGO_HTTP["BAD_REQUEST"]

	fecha_ultima_actualizacion = datetime.now(timezone('America/Argentina/Buenos_Aires'))

	if estado == 'cerrado' and ticket_almacenado.estado != 'cerrado':
		# Si cambio al estado cerrado, se coloca la fecha de finalización.
		fecha_finalizacion = fecha_ultima_actualizacion
	else:
		fecha_finalizacion = None

	severidad = ticket_editado['severidad'].lower()
	if severidad not in SEVERIDADES.keys():
		raise Exception('La severidad debe ser Alta, Media o Baja')

	if severidad != ticket_almacenado.severidad:
		# Si cambiaron la severidad del ticket, se actualiza la fecha limite.
		fecha_limite = ticket_almacenado.fecha_creacion + timedelta(days=SEVERIDADES[severidad.lower()])
	else:
		fecha_limite = ticket_almacenado.fecha_limite

	tipo = ticket_editado['tipo'].lower()

	if tipo not in ['error', 'consulta', 'mejora']:
		raise Exception('El tipo de ticket debe ser Error/Consulta/Mejora')
	# , CODIGO_HTTP["BAD_REQUEST"]

	if tipo != 'error':
		# Solo los tickets de tipo error llevan pasos
		pasos = None

#Codigo para la creacion de tickets que den datos a los graficos
	try:
		fecha_creacion = ticket_editado['fecha_creacion']
		fecha_creacion = datetime.strptime(fecha_creacion, '%Y-%m-%d %H:%M:%S')
	except:
		fecha_creacion = None

	try:
		fecha_finalizacion = ticket_editado['fecha_finalizacion']
		fecha_finalizacion = datetime.strptime(fecha_finalizacion, '%Y-%m-%d %H:%M:%S')
	except:
		pass

	editar_instancia(Transaccion, id,
						nombre=ticket_editado["nombre"],
						descripcion=ticket_editado["descripcion"],
						tipo=tipo,
						estado=estado,
						severidad=severidad,
						fecha_ultima_actualizacion=fecha_ultima_actualizacion,
						fecha_limite=fecha_limite,
						fecha_finalizacion=fecha_finalizacion,
						legajo_responsable=responsable,
						pasos=pasos,
						fecha_creacion=fecha_creacion,
						id_cliente=id_cliente)
# Fin de codigo para la creacion de tickets que den datos a los graficos
"""

def archivar(id):
	transaccion = obtener_una_instancia(Transaccion, id=id)

	if not transaccion:
		raise Exception('No existe el transaccion solicitado')
	# , CODIGO_HTTP["NOT_FOUND"]

	eliminar_instancia(Transaccion, id=id)