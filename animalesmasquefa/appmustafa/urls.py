from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AnimalViewSet, UsuarioViewSet, LoginView, NoticiaViewSet
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

router = DefaultRouter()
router.register(r'animales', AnimalViewSet)
router.register(r'usuarios', UsuarioViewSet)
router.register(r'noticias', NoticiaViewSet)

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Esta es la ruta correcta para obtener el token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('login/', LoginView.as_view(), name='login'),
    path('', include(router.urls)),
    
] 

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)