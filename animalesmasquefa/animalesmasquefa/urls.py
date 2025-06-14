"""
Configuración de URLs para el proyecto 'animalesmasquefa'.

Define cómo se enrutan las URLs a las vistas correspondientes.
Más info: https://docs.djangoproject.com/en/5.1/topics/http/urls/
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Ruta al panel de administración de Django
    path('admin/', admin.site.urls),

    # URLs para Jet Dashboard (interfaz de administración mejorada)
    path('jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),

    # URLs para Jet (interfaz base del admin mejorada)
    path('jet/', include('jet.urls', 'jet')),

    # Rutas de la API principal del proyecto (appmustafa)
    path('api/', include('appmustafa.urls')),
]

# Configura la entrega de archivos multimedia en modo desarrollo
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
