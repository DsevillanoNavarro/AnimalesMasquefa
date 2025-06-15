# 🐾 AnimalesMasquefa

**AnimalesMasquefa** es una plataforma web full-stack desarrollada como Trabajo de Fin de Grado. Su objetivo es ofrecer una solución integral para la gestión de un refugio de animales. Integra funcionalidades administrativas, automatizaciones, y experiencia de usuario accesible, todo construido con una arquitectura moderna basada en Django y React.

---

## 🔄 Arquitectura General

* **Frontend**: React 18 + React Router + Axios + Lottie
* **Backend**: Django 5 + Django REST Framework + PostgreSQL
* **Autenticación**: JWT (SimpleJWT)
* **Despliegue**: Netlify (frontend) y Render.com (backend)
* **Base de datos**: PostgreSQL (hosteada en Render)

```
root/
├── animalesmasquefa/         # Backend
│   ├── animalesmasquefa/     # Config global
│   ├── appmustafa/           # App principal
│   ├── media/, staticfiles/  # Archivos y recursos
├── frontend/                 # React SPA
│   └── src/                  # Componentes, servicios, rutas
└── README.md
```

---

## 🔧 Stack Tecnológico

### Backend

* **Django 5**, **Python 3.x**, **DRF**
* **PostgreSQL**, **Gunicorn**, **Whitenoise**
* **Django Auditlog**: Trazabilidad de acciones
* **Jet Dashboard**: UI avanzada en admin
* **Swagger + Redoc**: Documentación REST interactiva
* **Comandos custom**:

  * `migrar_archivos_a_cloudinary`
  * `seed_real_data`

### Frontend

* **React**, **SPA** con `react-router-dom`
* **Axios**: Integración API
* **Lottie**: Animaciones SVG
* **Netlify**: Hosting y redirecciones automáticas
* **Compresión de imágenes**: `browser-image-compression`

---

## 📂 Funcionalidades Principales

### Usuarios y Autenticación

* Registro, login, logout JWT
* Recuperación y reseteo de contraseña
* Roles diferenciados: usuario y administrador
* Auditoría automática con `auditlog`

### Animales

* CRUD desde admin (Jet Dashboard)
* Ficha detallada con imagen, especie, estado, historia
* Compresión de imágenes client-side

### Adopciones

* Solicitudes con validación anti-duplicado
* Emails HTML automáticos (aceptación/rechazo)
* Panel administrativo con estados

### Noticias

* CRUD completo y notificaciones automáticas por email
* Feed de noticias en portada

### Comentarios

* Sistema jerárquico (respuestas a comentarios)
* Moderación desde el backend

### Automatizaciones

* Emails HTML responsivos (Jinja2 templates)
* Plantillas para:

  * Nuevas solicitudes
  * Nuevos animales y noticias
  * Contacto desde frontend

---

## 📅 Navegación Principal SPA

* `/` - Inicio
* `/adoptar` - Animales en adopción
* `/detalle-animal/:id`
* `/noticias` y `/detalle-noticia/:id`
* `/perfil` - Gestión de usuario
* `/contacto`, `/sobre-nosotros`
* `/terminos-condiciones`, `/politica-privacidad`

---

## 🔢 Endpoints REST Destacados

### Autenticación

* `POST /api/token/`
* `POST /api/token/refresh/`

### Usuarios

* `POST /api/usuarios/registro/`
* `GET|PUT /api/usuarios/perfil/`

### Animales

* `GET|POST /api/animales/`
* `GET|PUT|DELETE /api/animales/:id/`

### Noticias

* `GET|POST /api/noticias/`
* `GET|PUT|DELETE /api/noticias/:id/`

### Comentarios

* `GET /api/comentarios/`
* `POST /api/comentarios/`

### Adopciones

* `GET|POST /api/adopciones/`

---

## 🚀 Instalación Local

### Backend

```bash
cd animalesmasquefa
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🔒 Variables de Entorno (Backend & Frontend)

* `SECRET_KEY`, `DEBUG`, `DATABASE_URL`, `FRONTEND_URL`
* `CLOUDINARY_URL` (si aplica para imágenes)

---

## 🔬 Testing

### Django Tests

```bash
python manage.py test
```

---

## 🌎 Despliegue

### Backend

* **Render.com**: PostgreSQL + Gunicorn + Whitenoise
* Archivos estáticos servidos desde Django

### Frontend

* **Netlify**: SPA con soporte para rutas internas (`_redirects`)

---

## 🔗 Recursos

* [DeepWiki del proyecto](https://deepwiki.com/DsevillanoNavarro/AnimalesMasquefa)
* Swagger UI: `/swagger/`
* Redoc UI: `/redoc/`

---

## 📄 Documentación técnica

Toda la documentación detallada del proyecto —incluyendo análisis, diseño, modelado de datos, endpoints de API, despliegue, pruebas, y manual de usuario— está disponible en formato Markdown en la carpeta `docs/`

Ahí encontrarás una guía completa del sistema, ideal para revisores técnicos, ampliaciones futuras o instalación en nuevos entornos.

---

## 👤 Contribuciones

```bash
# 1. Haz fork del repo
git clone https://github.com/tuusuario/animalesmasquefa.git

# 2. Crea una rama
git checkout -b feature/nueva-feature

# 3. Realiza cambios y haz commit
git commit -am "Agrega nueva funcionalidad"

# 4. Push y PR
git push origin feature/nueva-feature
```

---

## 📄 Licencia

Distribuido bajo licencia **MIT**.

---

> “Adopta, no compres. Este proyecto conecta vidas.” 🐶🐱
