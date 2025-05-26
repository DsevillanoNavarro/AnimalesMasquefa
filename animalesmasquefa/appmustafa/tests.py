from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Animal, Comentario, Adopcion
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import date
from django.core.files.uploadedfile import SimpleUploadedFile

User = get_user_model()

class AnimalesMasquefaTests(APITestCase):

    def setUp(self):
        # Crear usuario de prueba
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='password123')
        self.token = str(RefreshToken.for_user(self.user).access_token)
        self.auth_header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}

        # Crear imagen simulada
        image = SimpleUploadedFile("test.jpg", b"file_content", content_type="image/jpeg")

        # Crear animal válido
        self.animal = Animal.objects.create(
            nombre="Gato",
            fecha_nacimiento=date(2020, 1, 1),
            situacion="Casa de acogida",
            imagen=image
        )

    def test_registro_usuario(self):
        response = self.client.post("/api/usuarios/", {
            "username": "nuevo",
            "email": "nuevo@example.com",
            "password": "nuevopass123"
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_crear_adopcion_valida(self):
        dummy_pdf = SimpleUploadedFile("test.pdf", b"%PDF-1.4\n...", content_type="application/pdf")
        response = self.client.post("/api/adopciones/", {
            "animal": self.animal.id,
            "usuario": self.user.id,
            "justificante": dummy_pdf
        }, format='multipart', **self.auth_header)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_prevenir_adopcion_duplicada(self):
        Adopcion.objects.create(animal=self.animal, usuario=self.user, aceptada="Pendiente")
        response = self.client.post("/api/adopciones/", {
            "animal": self.animal.id,
            "usuario": self.user.id
        }, **self.auth_header)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_comentario_vacio_rechazado(self):
        response = self.client.post("/api/comentarios/", {
            "animal": self.animal.id,
            "usuario": self.user.id,
            "contenido": "   "
        }, **self.auth_header)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_adopcion_de_animal_ya_adoptado(self):
        Adopcion.objects.create(animal=self.animal, usuario=self.user, aceptada="Aceptada")
        otro_usuario = User.objects.create_user(username='otro', email='otro@example.com', password='123456')
        token = str(RefreshToken.for_user(otro_usuario).access_token)
        headers = {'HTTP_AUTHORIZATION': f'Bearer {token}'}
        response = self.client.post("/api/adopciones/", {
            "animal": self.animal.id,
            "usuario": otro_usuario.id
        }, **headers)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_jwt(self):
        response = self.client.post("/api/token/", {
            "username": "testuser",
            "password": "password123"
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)

    def test_animal_nombre_obligatorio(self):
        image = SimpleUploadedFile("test.jpg", b"file_content", content_type="image/jpeg")
        response = self.client.post("/api/animales/", {
            "nombre": "",
            "fecha_nacimiento": "2020-01-01",
            "situacion": "En acogida",
            "imagen": image
        }, **self.auth_header)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_comentario_correcto(self):
        response = self.client.post("/api/comentarios/", {
            "animal": self.animal.id,
            "usuario": self.user.id,
            "contenido": "Muy bonito el gato!"
        }, **self.auth_header)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
