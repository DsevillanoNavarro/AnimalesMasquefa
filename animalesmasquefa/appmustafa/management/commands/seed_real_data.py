from django.core.management.base import BaseCommand
from django.core.files import File
from appmustafa.models import Animal, Noticia, CustomUser, Adopcion, Comentario
from faker import Faker
from datetime import timedelta, date
from django.utils.timezone import now
import random
from appmustafa import signals
from django.db.models.signals import pre_save, post_save, post_delete
import os

fake = Faker('es_ES')  # Español

IMG_DIR = 'media/dummy_animales'
PDF_DUMMY = 'media/dummy_adopcion.pdf'
IMAGENES = [f for f in os.listdir(IMG_DIR) if f.endswith(('.jpg', '.jpeg', '.png'))]

class Command(BaseCommand):
    help = 'Genera datos falsos realistas usando Faker'

    def handle(self, *args, **kwargs):
        # 🔌 Desactivar señales
        pre_save.disconnect(signals.borrar_imagen_anterior_animal, sender=Animal)
        pre_save.disconnect(signals.borrar_foto_anterior_usuario, sender=CustomUser)
        pre_save.disconnect(signals.borrar_pdf_anterior_adopcion, sender=Adopcion)

        post_delete.disconnect(signals.eliminar_imagen_animal, sender=Animal)
        post_delete.disconnect(signals.eliminar_imagen_usuario, sender=CustomUser)
        post_delete.disconnect(signals.eliminar_pdf_adopcion, sender=Adopcion)

        post_save.disconnect(signals.gestionar_estado_adopcion, sender=Adopcion)
        post_save.disconnect(signals.notificar_adopcion_admin, sender=Adopcion)
        post_save.disconnect(signals.notificar_nuevo_animal, sender=Animal)
        post_save.disconnect(signals.notificar_nueva_noticia, sender=Noticia)

        # 👤 Crear usuarios
        usuarios = []
        for _ in range(10):
            user = CustomUser.objects.create_user(
                username=fake.user_name(),
                email=fake.email(),
                password='12345678',
                recibir_novedades=random.choice([True, False])
            )
            usuarios.append(user)

        # 🐶 Crear animales
        for _ in range(30):
            fecha_nacimiento = date.today() - timedelta(days=random.randint(100, 5000))
            imagen_file = random.choice(IMAGENES)
            with open(os.path.join(IMG_DIR, imagen_file), 'rb') as f:
                animal = Animal(
                    nombre=fake.first_name(),
                    fecha_nacimiento=fecha_nacimiento,
                    situacion=fake.paragraph(nb_sentences=50)
                )
                animal.imagen.save(imagen_file, File(f))
                animal.save()

        # 📰 Crear noticias
        for _ in range(8):
            imagen_file = random.choice(IMAGENES)
            with open(os.path.join(IMG_DIR, imagen_file), 'rb') as f:
                noticia = Noticia(
                    titulo=fake.sentence(nb_words=6),
                    contenido=fake.paragraph(nb_sentences=5),
                    fecha_publicacion=now().date()
                )
                noticia.imagen.save(imagen_file, File(f))
                noticia.save()

        # 💬 Crear comentarios
        noticias = list(Noticia.objects.all())
        for noticia in noticias:
            cantidad_comentarios = random.randint(2, 6)
            for _ in range(cantidad_comentarios):
                usuario = random.choice(usuarios)
                contenido = fake.paragraph(nb_sentences=random.randint(2, 4))
                comentario = Comentario.objects.create(
                    noticia=noticia,
                    usuario=usuario,
                    contenido=contenido
                )
                # 50% de probabilidad de respuesta
                if random.random() < 0.5:
                    Comentario.objects.create(
                        noticia=noticia,
                        usuario=random.choice(usuarios),
                        contenido=fake.paragraph(nb_sentences=2),
                        parent=comentario
                    )

        # 📝 Crear adopciones
        animales = list(Animal.objects.all())
        for _ in range(10):
            usuario = random.choice(usuarios)
            animal = random.choice(animales)
            if Adopcion.objects.filter(animal=animal, usuario=usuario).exists():
                continue
            with open(PDF_DUMMY, 'rb') as f:
                adopcion = Adopcion(
                    usuario=usuario,
                    animal=animal,
                    aceptada=random.choice(['Pendiente', 'Aceptada']),
                )
                adopcion.contenido.save("solicitud.pdf", File(f))
                try:
                    adopcion.full_clean()
                    adopcion.save()
                except Exception as e:
                    self.stdout.write(self.style.WARNING(f"⚠️  Error al crear adopción: {e}"))

        # 🔌 Reconectar señales
        pre_save.connect(signals.borrar_imagen_anterior_animal, sender=Animal)
        pre_save.connect(signals.borrar_foto_anterior_usuario, sender=CustomUser)
        pre_save.connect(signals.borrar_pdf_anterior_adopcion, sender=Adopcion)

        post_delete.connect(signals.eliminar_imagen_animal, sender=Animal)
        post_delete.connect(signals.eliminar_imagen_usuario, sender=CustomUser)
        post_delete.connect(signals.eliminar_pdf_adopcion, sender=Adopcion)

        post_save.connect(signals.gestionar_estado_adopcion, sender=Adopcion)
        post_save.connect(signals.notificar_adopcion_admin, sender=Adopcion)
        post_save.connect(signals.notificar_nuevo_animal, sender=Animal)
        post_save.connect(signals.notificar_nueva_noticia, sender=Noticia)

        self.stdout.write(self.style.SUCCESS("✅ Datos falsos realistas creados con éxito"))
