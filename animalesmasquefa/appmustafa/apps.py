from django.apps import AppConfig


class AppmustafaConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'appmustafa'
    
    def ready(self):
        import appmustafa.signals
