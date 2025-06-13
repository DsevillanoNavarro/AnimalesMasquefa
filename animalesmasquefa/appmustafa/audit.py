# appmustafa/audit.py
from auditlog.registry import auditlog
from .models import Animal, Noticia, Comentario, Adopcion, CustomUser

def register_auditlog_models():
    auditlog.register(Animal)
    auditlog.register(Noticia)
    auditlog.register(Comentario)
    auditlog.register(Adopcion)
    auditlog.register(CustomUser)