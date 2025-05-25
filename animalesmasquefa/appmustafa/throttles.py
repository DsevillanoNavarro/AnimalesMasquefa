from rest_framework.throttling import UserRateThrottle

class CrearComentarioThrottle(UserRateThrottle):
    scope = "comentario_creacion"
