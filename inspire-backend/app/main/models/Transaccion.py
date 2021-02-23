import requests

from flask_sqlalchemy import SQLAlchemy
from main.db.database import db

class Transaccion(db.Model):
    """
    Clase que define la tabla Transaccion
    """

    __tablename__ = 'transacciones'

    id = db.Column(db.Integer, primary_key=True)
    descripcion = db.Column(db.String(300), nullable=True)
    tipo = db.Column(db.Enum('Acumulo', 'Canje'), nullable=False)
    monto = db.Column(db.Integer, nullable=True)
    puntos = db.Column(db.Integer, nullable=True)
    fecha_creacion = db.Column(db.DateTime(timezone=True), nullable=True)
    fecha_ultima_actualizacion = db.Column(db.DateTime(timezone=True), nullable=True)

    # Foreigns and relations
    id_miembro = db.Column(db.Integer(),
                           db.ForeignKey('miembros.id'),
                           nullable=True)
    miembro = db.relationship('Miembro', backref='miembros_transaccion')

    id_producto = db.Column(db.Integer(),
                           db.ForeignKey('productos.id'),
                           nullable=True)
    producto = db.relationship('Producto', backref='productos_transaccion')

    def a_diccionario(self):
        ''' Retorna el diccionario de la instancia
        '''
        if self.fecha_creacion:
            fecha_creacion = self.fecha_creacion.strftime('%Y-%m-%d')
        else:
            fecha_creacion = None
        if self.fecha_ultima_actualizacion:
            fecha_actualizacion = self.fecha_ultima_actualizacion.strftime('%Y-%m-%d')
        else:
            fecha_actualizacion = None
        if self.miembro:
            miembro = self.miembro.a_diccionario()
        else:
            miembro = None
        if self.producto:
            producto = self.producto.a_diccionario()
        else:
            producto = None

        d = {
            'id': self.id,
            'descripcion': self.descripcion,
            'tipo': self.tipo,
            'monto': self.monto,
            'puntos': self.puntos,
            'fecha_creacion': fecha_creacion,
            'fecha_ultima_actualizacion': fecha_actualizacion,
            'miembro' : miembro,
            'producto': producto
        }

        return d