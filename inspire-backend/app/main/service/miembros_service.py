from main.db.database import (agregar_instancia, editar_instancia, eliminar_instancia,
                      obtener_instancias_por_filtro,
                      obtener_todas_las_instancias, obtener_una_instancia)
from main.models.Miembro import Miembro
from main.models.Transaccion import Transaccion
from flask_bcrypt import Bcrypt
from datetime import date, datetime, timedelta
from pytz import timezone

def obtener_miembros(query_params):
	miembros = []
	if query_params:
		miembros = obtener_instancias_por_filtro(Miembro,**query_params)
	else:
		miembros = obtener_todas_las_instancias(Miembro)
	miembros.sort(key=lambda miembro: miembro.fecha_de_registro, reverse=True)
	return [c.a_diccionario() for c in miembros]

def obtener_miembro_por(id):
	miembro = obtener_una_instancia(Miembro, id=id)
	return miembro.a_diccionario()

def obtener_miembro_por_email(email):
	miembro = obtener_una_instancia(Miembro, email=email)
	return miembro.a_diccionario()

def crear(miembro):
	email=miembro["email"]
	isDuplicado = Miembro.query.filter_by(email=email).first()

	if isDuplicado:
		raise Exception("El email ingresado ya está registrado")
	else:
		fecha_de_nacimiento = miembro["fecha_de_nacimiento"]

		if not fecha_de_nacimiento:
			fecha_de_nacimiento = None
		else:
			fecha_de_nacimiento = datetime.strptime(miembro["fecha_de_nacimiento"], '%Y-%m-%d')
		
		fecha_creacion = datetime.now(timezone('America/Argentina/Buenos_Aires'))
		
		password = Bcrypt().generate_password_hash(miembro["password"]).decode('utf-8')

		if not miembro['permiso']:
			permiso = "Usuario"
		else: permiso = miembro['permiso']

		c = agregar_instancia(Miembro,
						nombre=miembro["nombre"],
						apellido=miembro["apellido"],
						email=email,
						password=password,
						fecha_de_registro=fecha_creacion,
						fecha_de_nacimiento=fecha_de_nacimiento,
						comentario=miembro["comentario"],
						permiso=permiso)

		return c.a_diccionario()

def editar(id, miembro):
	fecha_de_nacimiento = miembro["fecha_de_nacimiento"]
	if not fecha_de_nacimiento:
		fecha_de_nacimiento = None
	else:
		fecha_de_nacimiento = datetime.strptime(miembro["fecha_de_nacimiento"], '%Y-%m-%d')
	print(miembro)
	if not miembro["puntos"]:
		puntos = 0
	else:
		puntos = miembro["puntos"]
	editar_instancia(Miembro, id,
				nombre=miembro["nombre"],
				apellido=miembro["apellido"],
				email=miembro["email"],
				fecha_de_nacimiento=fecha_de_nacimiento,
				comentario=miembro["comentario"],
				estado=miembro["estado"],
				puntos=puntos)

def eliminar(id):
	miembro = obtener_una_instancia(Miembro, id=id)

	if not miembro:
		raise Exception("No existe el miembro solicitado")

	eliminar_instancia(Miembro, id=id)
