from flask import jsonify, request
from main.models.Miembro import Miembro
from main.settings import SECRET_KEY
import jwt
from functools import wraps

def login_requerido(permiso='Usuario'):
    """Este decorador obliga al usuario a estar logeado, y tambien
    permite validar si es un Superusuario o un Usuario y en base
    a eso permitir o no funcionalidades
    """
    def wrapper(fn):
        @wraps(fn)
        def f_decorada(*args, **kwargs):
            token = None
            if 'x-access-token' in request.headers:
                token = request.headers['x-access-token']
            if not token:
                return jsonify({'Mensaje': 'Es necesario logearse primero o falta el token!'}), 401

            try:
                data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            except Exception as e:
                return jsonify({'Mensaje': 'Sesion expirada'}), 401

            if permiso == 'admin':
                if Miembro.query.filter_by(id=data['id']).first().permiso == "usuario":
                    return jsonify({'Mensaje': 'Permisos invalidos'})

            return fn(*args, **kwargs)
        return f_decorada
    return wrapper