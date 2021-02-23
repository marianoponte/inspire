from main.db.database import agregar_instancia, obtener_todas_las_instancias, obtener_instancias_por_filtro, obtener_una_instancia, eliminar_instancia, editar_instancia
from main.models.Voucher import Voucher
from datetime import date, datetime, timedelta
from pytz import timezone

def obtener_vouchers(query_params):
    vouchers = []
    if query_params:
        vouchers = obtener_instancias_por_filtro(Voucher, **query_params)
    else:
        vouchers = obtener_todas_las_instancias(Voucher)
    vouchers.sort(key=lambda voucher: voucher.fecha_de_creacion, reverse=True)
    return [u.a_diccionario() for u in vouchers]

def obtener_voucher_por(id):
	voucher = obtener_una_instancia(Voucher, id=id)

	return voucher.a_diccionario()

def crear(voucher):
    fecha_de_creacion = datetime.now(timezone('America/Argentina/Buenos_Aires'))
    fecha_de_vencimiento = fecha_de_creacion + timedelta(days=+30)
    print("fecha_de_creacion:", fecha_de_creacion)
    print("fecha_de_vencimiento:", fecha_de_vencimiento)
    voucher = agregar_instancia(Voucher,
    					fecha_de_creacion=fecha_de_creacion,
    					fecha_de_vencimiento=fecha_de_vencimiento,
                        id_miembro=voucher['id_miembro'],
						id_producto=voucher['id_producto'])
    return voucher.a_diccionario()

def archivar(id):
    voucher = obtener_una_instancia(Voucher, id=id)
    if not voucher:
        raise Exception("No existe el voucher solicitado")
    else:
        eliminar_instancia(Voucher, id=id)

def editar(id, voucher):
	editar_instancia(Voucher, id,
				estado=voucher['estado'])