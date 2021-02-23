from datetime import datetime, timedelta, date
from pytz import timezone
from random import randint, uniform,random
from sqlalchemy import func

from main.db.database import (agregar_instancia, editar_instancia,
                              eliminar_instancia,
                              obtener_todas_las_instancias,
                              obtener_una_instancia)
from main.models.Producto import Producto

def obtener_productos():
    productos = obtener_todas_las_instancias(Producto)
    
    return [t.a_diccionario() for t in productos]

def obtener_producto_por(id):
	producto = obtener_una_instancia(Producto, id=id)

	return producto.a_diccionario()

def crear(producto):
    producto = agregar_instancia(Producto,
						nombre=producto['nombre'],
						urlImage=producto['urlImage'],
						puntos=producto['puntos'],
						descripcion=producto['descripcion'])
    return producto.a_diccionario()

def eliminar(id):
	producto = obtener_una_instancia(Producto, id=id)

	if not producto:
		raise Exception("No existe el producto solicitado")

	eliminar_instancia(Producto, id=id)