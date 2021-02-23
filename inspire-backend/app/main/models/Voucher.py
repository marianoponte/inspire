from flask_sqlalchemy import SQLAlchemy
from main.db.database import db

class Voucher(db.Model):
    """
    Clase que define la tabla Voucher
    """

    __tablename__ = 'vouchers'

    id = db.Column(db.Integer, primary_key=True)
    estado = db.Column(db.Enum('Disponible', 'Usado'), default="Disponible", nullable=False)
    fecha_de_creacion = db.Column(db.DateTime(timezone=True), nullable=True)
    fecha_de_vencimiento = db.Column(db.DateTime(timezone=True), nullable=True)
     
     # Foreigns and relations
    id_miembro = db.Column(db.Integer(),
                           db.ForeignKey('miembros.id'),
                           nullable=True)
    miembro = db.relationship('Miembro', backref='miembros_voucher')

    id_producto = db.Column(db.Integer(),
                           db.ForeignKey('productos.id'),
                           nullable=True)
    producto = db.relationship('Producto', backref='productos_voucher')

    def a_diccionario(self):
        '''
        Retorna el diccionario de la instancia
        '''

        if self.fecha_de_creacion:
            fecha_de_creacion = self.fecha_de_creacion.strftime('%Y-%m-%d')
        else:
            fecha_de_creacion = None
        if self.fecha_de_vencimiento:
            fecha_de_vencimiento = self.fecha_de_vencimiento.strftime('%Y-%m-%d')
        else:
            fecha_de_vencimiento = None
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
            'estado': self.estado,
            'fecha_de_creacion': fecha_de_creacion,
            'fecha_de_vencimiento': fecha_de_vencimiento,
            'miembro': miembro,
            'producto': producto
        }

        return d