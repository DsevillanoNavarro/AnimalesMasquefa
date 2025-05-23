README - AnimalesMasquefa
Descripción General
AnimalesMasquefa es una aplicación web para la gestión de un refugio de animales. La plataforma permite administrar animales disponibles para adopción, publicar noticias, gestionar comentarios y solicitudes de adopción.

Arquitectura
La aplicación está construida con una arquitectura moderna de dos capas:

Backend: Desarrollado con Django y Django REST Framework, proporciona una API RESTful.
Frontend: Desarrollado con React, ofrece una interfaz de usuario interactiva y responsive.
Arquitectura de la Aplicación

Frontend (React)

API REST (Django)

Base de Datos (PostgreSQL)

Características Principales
Gestión de Animales
Registro de animales disponibles para adopción
Información detallada de cada animal (nombre, edad, situación)
Imágenes de los animales
Sistema de Noticias
Publicación de noticias relacionadas con el refugio
Imágenes para las noticias
Sistema de comentarios para usuarios registrados
Adopciones
Solicitud de adopciones por parte de usuarios
Gestión de solicitudes de adopción
Seguimiento del estado de las adopciones
Usuarios y Autenticación
Registro de usuarios
Autenticación mediante JWT (JSON Web Tokens)
Perfiles de usuario
Tecnologías Utilizadas
Backend
Django: Framework web de Python
Django REST Framework: Para la creación de APIs RESTful
PostgreSQL: Base de datos relacional
JWT: Para la autenticación de usuarios
Frontend
React: Biblioteca JavaScript para construir interfaces de usuario
Axios: Cliente HTTP para realizar peticiones a la API
React Router: Para la navegación entre páginas
Lottie: Para animaciones interactivas
Instalación y Configuración
Requisitos Previos
Python 3.x
Node.js y npm
PostgreSQL
Configuración del Backend
Clonar el repositorio:
git clone https://github.com/DsevillanoNavarro/AnimalesMasquefa.git  
cd AnimalesMasquefa
Crear y activar un entorno virtual:
python -m venv venv  
source venv/bin/activate  # En Windows: venv\Scripts\activate
Instalar dependencias:
pip install -r requirements.txt
Configurar la base de datos:
La aplicación está configurada para usar PostgreSQL en Render.com
Para desarrollo local, puedes modificar la configuración en settings.py
Aplicar migraciones:
python manage.py migrate
Iniciar el servidor:
python manage.py runserver
Configuración del Frontend
Navegar a la carpeta del frontend:
cd frontend
Instalar dependencias:
npm install
Iniciar el servidor de desarrollo:
npm start
Estructura del Proyecto
Backend
animalesmasquefa/: Directorio principal del proyecto Django
settings.py: Configuración del proyecto
urls.py: Configuración de URLs
appmustafa/: Aplicación principal
models.py: Modelos de datos (Animal, Noticia, Comentario, Adopcion)
views.py: Vistas y lógica de negocio
serializers.py: Serializadores para la API
urls.py: URLs de la aplicación
Frontend
src/: Código fuente de React
components/: Componentes reutilizables
HomeComponents/: Componentes específicos para la página de inicio
services/: Servicios para comunicación con la API
Lottie/: Archivos de animación
API REST
La aplicación expone los siguientes endpoints:

/api/animales/: Gestión de animales
/api/noticias/: Gestión de noticias
/api/comentarios/: Gestión de comentarios
/api/adopciones/: Gestión de solicitudes de adopción
/api/usuarios/: Gestión de usuarios
/api/token/: Obtención de tokens JWT
/api/token/refresh/: Actualización de tokens JWT
/api/token/verify/: Verificación de tokens JWT
Despliegue
La aplicación está configurada para ser desplegada en:

Backend: Render.com con PostgreSQL
Frontend: Puede ser desplegado en servicios como Vercel, Netlify o similar
Contribución
Para contribuir al proyecto:

Haz un fork del repositorio
Crea una rama para tu funcionalidad (git checkout -b feature/nueva-funcionalidad)
Haz commit de tus cambios (git commit -am 'Añadir nueva funcionalidad')
Haz push a la rama (git push origin feature/nueva-funcionalidad)
Crea un Pull Request
Licencia
Este proyecto está bajo la Licencia MIT.

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/DsevillanoNavarro/AnimalesMasquefa)
