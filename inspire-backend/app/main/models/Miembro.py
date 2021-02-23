from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from main.db.database import db

class Miembro(db.Model):
    """
    Clase que define la tabla Miembro
    """

    __tablename__ = 'miembros'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(150), nullable=False)
    apellido = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    password = db.Column(db.String(150), nullable=False)
    puntos = db.Column(db.Integer, nullable=True, default=500)
    comentario = db.Column(db.String(300), nullable=True)
    fecha_de_registro = db.Column(db.DateTime(timezone=True), nullable=True)
    fecha_de_nacimiento = db.Column(db.Date, nullable=True)
    estado = db.Column(db.Enum('Activo', 'Inactivo'), nullable=False,
                               default='Activo')
    permiso = db.Column(db.String(300), nullable=True, default="Usuario")

    def a_diccionario(self):
        '''
        Retorna el diccionario de la instancia
        '''
        if not self.fecha_de_nacimiento:
            fecha_de_nacimiento = None
        else: 
            fecha_de_nacimiento = self.fecha_de_nacimiento.strftime('%Y-%m-%d')

        d = {
            'id': self.id,
            'nombre': self.nombre,
            'apellido': self.apellido,
            'email': self.email,
            'password': self.password,
            'puntos': self.puntos,
            'comentario': self.comentario,
            'fecha_de_registro': self.fecha_de_registro.strftime('%Y-%m-%d'),
            'fecha_de_nacimiento': fecha_de_nacimiento,
            'estado': self.estado,
            'permiso': self.permiso
        }
        return d
