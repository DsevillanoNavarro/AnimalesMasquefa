# Generated by Django 5.1.3 on 2025-06-14 18:01

import appmustafa.models
import cloudinary.models
import cloudinary_storage.storage
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appmustafa', '0003_alter_customuser_foto_perfil'),
    ]

    operations = [
        migrations.AlterField(
            model_name='adopcion',
            name='contenido',
            field=models.FileField(storage=cloudinary_storage.storage.RawMediaCloudinaryStorage(), upload_to=appmustafa.models.pdf_upload_path, validators=[appmustafa.models.validate_pdf]),
        ),
        migrations.AlterField(
            model_name='animal',
            name='imagen',
            field=cloudinary.models.CloudinaryField(max_length=255, verbose_name='imagen'),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='foto_perfil',
            field=cloudinary.models.CloudinaryField(blank=True, default='default_c4hidv', max_length=255, verbose_name='foto_perfil'),
        ),
        migrations.AlterField(
            model_name='noticia',
            name='imagen',
            field=cloudinary.models.CloudinaryField(max_length=255, verbose_name='imagen'),
        ),
    ]
