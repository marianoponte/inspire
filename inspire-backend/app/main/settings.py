from flask_swagger_ui import get_swaggerui_blueprint

#Buena práctica para no hardcodear los códigos
CODIGO_HTTP = {
	'OK': 200,
	'CREATED': 201,
	'NO_CONTENT': 204,
	'NOT_FOUND': 404,
	'BAD_REQUEST': 400
}

SECRET_KEY = "truco"


