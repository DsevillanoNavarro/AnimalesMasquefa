# 🐾 AnimalesMasquefa

**AnimalesMasquefa** es una plataforma web integral para la gestión de un refugio de animales, desarrollada como Trabajo de Fin de Grado. Combina un backend robusto en Django con un frontend moderno en React para ofrecer una experiencia completa a usuarios, administradores y adoptantes.

---

## 🧩 Funcionalidades Principales

### 👤 Usuarios
- Registro, login, recuperación y restablecimiento de contraseña.
- Perfil de usuario editable y visualización de adopciones realizadas.

### 🐶 Animales
- Visualización pública de animales disponibles para adopción.
- Ficha de detalle con imágenes, descripciones y características.
- Gestión completa desde el panel de administración (CRUD).

### 📨 Adopciones
- Formulario de adopción con validación.
- Múltiples adopciones permitidas por usuario con gestión de duplicados.
- Confirmación y rechazo de solicitudes por correo electrónico.

### 📰 Noticias
- Sistema de noticias con listados y detalle.
- Publicación automática vía email a los administradores.

### 💬 Comentarios
- Sistema jerárquico de comentarios (con subcomentarios).
- Moderación y eliminación desde el panel de administración.

### 📧 Sistema de Emails
- Notificaciones automáticas personalizadas (HTML).
- Templates para contacto, adopción aceptada/rechazada, nuevo animal, etc.

### ⚙️ Panel de Administración
- Dashboard personalizado con Jet para tareas rápidas y datos recientes.
- Atajos visuales, diseño moderno y funcionalidad extendida.

---

## 📁 Estructura del Proyecto

├── backend/ (Django)
│ ├── animalesmasquefa/ (project)
│ ├── appmustafa/ (lógica principal del sistema)
│ └── media/ (uploads: animales, usuarios, noticias)
├── frontend/ (React)
│ ├── src/
│ ├── public/
│ └── netlify.toml (configuración de despliegue)
├── porHacer (tareas pendientes)
└── README.md

yaml
Copiar
Editar

---

## 🧪 Tecnologías

### Backend
- **Python 3**, **Django 5**, **Django REST Framework**
- PostgreSQL
- Autenticación JWT
- Gunicorn, Jet Dashboard, Grappelli

### Frontend
- **React** + **React Router**
- Axios para consumo de APIs
- Lottie + animaciones
- Estilos personalizados con CSS
- Deployable en **Netlify**, **Vercel** u otro proveedor

---

## ⚙️ Instalación Local

### 🔙 Backend (Django)

```bash
# Clona el repositorio
git clone https://github.com/DsevillanoNavarro/AnimalesMasquefa.git
cd AnimalesMasquefa/animalesmasquefa

# Crea y activa un entorno virtual
python -m venv venv
source venv/bin/activate  # en Windows: venv\Scripts\activate

# Instala dependencias
pip install -r requirements.txt

# Ajusta la conexión PostgreSQL en settings.py

# Ejecuta migraciones
python manage.py migrate

# Crea superusuario
python manage.py createsuperuser

# Ejecuta el servidor
python manage.py runserver
🌐 Frontend (React)
bash
Copiar
Editar
cd ../frontend
npm install
npm start
🔐 Variables de Entorno
.env para el backend: define claves secretas, base de datos, y configuración de JWT.

netlify.toml para frontend: configuración de rutas SPA.

🔌 Endpoints REST Principales
Ruta	Método	Descripción
/api/animales/	GET	Lista de animales
/api/animales/:id	GET	Detalle de un animal
/api/noticias/	GET	Lista de noticias
/api/comentarios/	POST	Añadir comentario
/api/adopciones/	POST	Enviar solicitud de adopción
/api/usuarios/	POST	Registro de usuario
/api/token/	POST	Obtener token JWT
/api/token/refresh/	POST	Refrescar token

🌍 Despliegue
Backend
Configurado para Render.com usando Procfile y Gunicorn.

Frontend
Desplegable en Netlify (con netlify.toml) o Vercel.

Redirecciones SPA habilitadas (public/_redirects).

🧪 Testing
Backend
bash
Copiar
Editar
python manage.py test
Frontend
bash
Copiar
Editar
npm test
✅ Tareas Pendientes
Ver archivo porHacer

text
Copiar
Editar
- Arreglar validación de adopciones repetidas
- Mejorar visualización de comentarios y botón "ver más"
- Mejorar diseño de emails (estética HTML)
🤝 Contribuir
Haz fork del repositorio

Crea una nueva rama:
git checkout -b feature/nueva-funcionalidad

Realiza tus cambios y commitea:
git commit -am "Agrega nueva funcionalidad"

Haz push y abre un Pull Request:
git push origin feature/nueva-funcionalidad

📄 Licencia
Este proyecto está licenciado bajo la MIT License.

✨ Autor
Daniel Sevillano Navarro
Trabajo de Fin de Grado – Grado en Ingeniería Informática
Universitat Oberta de Catalunya
2025

“Adopta, no compres 🐕🐈‍⬛. Este sistema ayuda a conectar vidas.”

arduino
Copiar
Editar

¿Quieres que también lo prepare como archivo descargable o que lo suba a un repositorio de GitHub directamente con `git`?






