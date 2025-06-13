from rest_framework import viewsets
from .models import Animal, Noticia, Comentario, Adopcion
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import AnimalSerializer, UsuarioSerializer, NoticiaSerializer, ComentarioSerializer, AdopcionSerializer, PasswordResetRequestSerializer, PasswordResetConfirmSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import permissions
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework import generics, serializers, status, viewsets
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str  # force_str para decode en Django 4+
from django.conf import settings
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from .throttles import CrearComentarioThrottle
from .throttles import UserRateThrottle, CrearAdopcionThrottle
from rest_framework.exceptions import Throttled
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import IsAdminOrReadOnly
from rest_framework.exceptions import PermissionDenied
from rest_framework import mixins, viewsets

User = get_user_model()
token_generator = PasswordResetTokenGenerator()

class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all().order_by('-fecha_nacimiento')
    serializer_class = AnimalSerializer
    permission_classes = [IsAdminOrReadOnly]

    
class NoticiaViewSet(viewsets.ModelViewSet):
    queryset = Noticia.objects.all().order_by('-fecha_publicacion')
    serializer_class = NoticiaSerializer
    permission_classes = [IsAdminOrReadOnly]



class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_throttles(self):
        if self.request.method == 'POST':
            return [CrearComentarioThrottle()]
        return []  # sin throttling para GET

    def get_queryset(self):
        noticia_id = self.request.query_params.get('noticia')
        if noticia_id:
            return Comentario.objects.filter(noticia_id=noticia_id).order_by('-fecha_hora')
        return super().get_queryset()

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
    
    def perform_update(self, serializer):
        if serializer.instance.usuario != self.request.user:
            raise PermissionDenied("No puedes editar comentarios de otro usuario.")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.usuario != self.request.user:
            raise PermissionDenied("No puedes eliminar comentarios de otro usuario.")
        instance.delete()


class AdopcionViewSet(viewsets.ModelViewSet):
    queryset = Adopcion.objects.all()
    serializer_class = AdopcionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Adopcion.objects.filter(usuario=self.request.user)

    def get_throttles(self):
        if self.request.method == 'POST':
            return [CrearAdopcionThrottle()]
        return super().get_throttles()

    def throttled(self, request, wait):
        hours = wait // 3600
        minutes = (wait % 3600) // 60
        seconds = int(wait % 60)

        if hours > 0:
            time_str = f"{int(hours)}h {int(minutes)}min"
        elif minutes > 0:
            time_str = f"{int(minutes)}min {int(seconds)}s"
        else:
            time_str = f"{seconds}s"

        raise Throttled(detail={
            'message': f'Has alcanzado el límite de solicitudes de adopción. Inténtalo de nuevo en {time_str}.'
        })


    def perform_create(self, serializer):
        animal = serializer.validated_data.get('animal')
        usuario = self.request.user

        if Adopcion.objects.filter(animal=animal, usuario=usuario).exists():
            raise PermissionDenied("Ya has solicitado adoptar este animal antes.")

        if serializer.validated_data.get('usuario') != usuario:
            raise PermissionDenied("No puedes crear una adopción en nombre de otro usuario.")

        serializer.save()
    
    def perform_update(self, serializer):
        if serializer.instance.usuario != self.request.user:
            raise PermissionDenied("No puedes modificar esta adopción.")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.usuario != self.request.user:
            raise PermissionDenied("No puedes eliminar esta adopción.")
        instance.delete()

class UsuarioViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.none() 
    serializer_class = UsuarioSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save()

    



class CookieTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        resp = super().post(request, *args, **kwargs)
        # Extrae tokens
        access = resp.data.get('access')
        refresh = resp.data.get('refresh')
        # Fija cookies HTTP-only
        resp.set_cookie(
            key='access_token',
            value=access,
            httponly=True,
            secure=True,   # En production, True
            samesite='None',
            path='/',
            max_age=3600     # coincide con ACCESS_TOKEN_LIFETIME
        )
        resp.set_cookie(
            key='refresh_token',
            value=refresh,
            httponly=True,
            secure=True,
            samesite='None',
            max_age=86400   # coincide con REFRESH_TOKEN_LIFETIME
        )
        resp.data = {'detail': 'Login exitoso'}
        return resp

class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')
        if refresh_token is None:
            return Response({"error": "Refresh token not found in cookies"}, status=status.HTTP_400_BAD_REQUEST)

        request.data['refresh'] = refresh_token
        response = super().post(request, *args, **kwargs)

        # Si el refresh tuvo éxito, guarda el nuevo access_token en una cookie
        if response.status_code == 200 and 'access' in response.data:
            access_token = response.data['access']
            response.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,  # True en producción
                samesite='None',
                max_age=3600  # 5 minutos, igual que ACCESS_TOKEN_LIFETIME
            )
            # Puedes ocultar el token del body si quieres
            response.data = {'detail': 'Token refreshed'}

        return response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({'message': 'Acceso concedido: tu token es válido.'})


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        serializer = UsuarioSerializer(request.user)
        return Response(serializer.data)
    
    



class RequestPasswordResetAPIView(generics.GenericAPIView):
    throttle_classes = [UserRateThrottle]
    permission_classes = [AllowAny]
    serializer_class = PasswordResetRequestSerializer    

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']

        user = User.objects.filter(email=email).first()
        if not user:
            return Response({"detail": "Si existe, recibirás un email."}, status=200)


        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        token = token_generator.make_token(user)

        frontend_url = settings.FRONTEND_URL.rstrip('/')
        reset_link = f"{frontend_url}/resetPassword/{uidb64}/{token}/"

        send_mail(
            subject="Recupera tu contraseña",
            message=f"Pulsa este enlace para restablecer tu contraseña:\n\n{reset_link}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
        )
        return Response({"detail": "Si existe, recibirás un email."}, status=200)


class PasswordResetConfirmAPIView(generics.GenericAPIView):
    permission_classes = []
    serializer_class = PasswordResetConfirmSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        uidb64 = serializer.validated_data['uidb64']
        token = serializer.validated_data['token']
        new_password = serializer.validated_data['new_password']

        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except Exception:
            return Response({"detail": "Link inválido."}, status=400)

        if not token_generator.check_token(user, token):
            return Response({"detail": "Token inválido o expirado."}, status=400)

        user.set_password(new_password)
        user.save()
        return Response({"detail": "Contraseña restablecida con éxito."}, status=200)
    
class LogoutView(APIView):
    def post(self, request):
        response = Response({"detail": "Logout successful"}, status=status.HTTP_200_OK)
        response.delete_cookie(
            key='access_token',
            path='/',
            samesite='None',
        )
        response.delete_cookie(
            key='refresh_token',
            path='/',
            samesite='None',
        )
        return response
    
@api_view(['POST'])
def contacto_view(request):
    nombre = request.data.get('nombre')
    email = request.data.get('email')
    asunto = request.data.get('asunto')
    mensaje = request.data.get('mensaje')

    context = {
        'nombre': nombre,
        'email': email,
        'asunto': asunto,
        'mensaje': mensaje,
    }

    html_content = render_to_string('email/contacto_recibido.html', context)

    email_message = EmailMultiAlternatives(
        subject=f"[Contacto Web] {asunto}",
        body=mensaje,  # Texto plano como respaldo
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[settings.DEFAULT_FROM_EMAIL]
    )
    email_message.attach_alternative(html_content, "text/html")
    email_message.send()

    return Response({"mensaje": "Correo enviado correctamente"})

class EliminarCuentaView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        user.delete()
        return Response({"mensaje": "Cuenta eliminada correctamente."}, status=status.HTTP_204_NO_CONTENT)