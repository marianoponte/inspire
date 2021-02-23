from flask_sqlalchemy import SQLAlchemy

from main.db.database import db

class Producto(db.Model):
    """
    Clase que define la tabla Producto
    """

    __tablename__ = 'productos'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(150), nullable=False)
    urlImage = db.Column(db.String(150), nullable=False)
    puntos = db.Column(db.Integer, nullable=False)
    descripcion = db.Column(db.String(150), nullable=False)

    def a_diccionario(self):
        '''
        Retorna el diccionario de la instancia
        '''
        d = {
            'id': self.id,
            'nombre': self.nombre,
            'urlImage': self.urlImage,
            'puntos': self.puntos,
            'descripcion': self.descripcion
        }
        
        return d