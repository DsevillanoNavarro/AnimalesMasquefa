# 🐾 AnimalesMasquefa

**AnimalesMasquefa** es una plataforma web integral diseñada para la gestión eficiente y moderna de un refugio de animales. Este sistema fue desarrollado como Trabajo de Fin de Grado con el objetivo de cubrir todas las necesidades operativas y comunicacionales de una organización protectora de animales.

Combina lo mejor del frontend con **React** y un potente backend en **Django**, junto a una arquitectura RESTful robusta y segura. Permite a usuarios y administradores navegar, gestionar y automatizar el ciclo completo de adopciones, noticias y relaciones con la comunidad.

---

## 🧩 Características Clave

### 👥 Gestión de Usuarios

* Registro, login y logout con JWT.
* Recuperación y restablecimiento de contraseña.
* Edición de perfil (nombre, email, foto, etc.).
* Diferenciación clara entre **usuarios regulares** y **administradores**.
* Auditlog completo de todas las operaciones sensibles.

### 🐾 Animales

* CRUD completo de animales desde panel administrativo.
* Vista de detalle con datos como especie, edad, salud e historia.
* Carga de imagen optimizada automáticamente con `browser-image-compression` en frontend.

### 📨 Solicitudes de Adopción

* Validaciones inteligentes para evitar duplicados.
* Emails automáticos al enviar, aceptar o rechazar solicitudes.
* Plantillas HTML con diseño profesional adaptado.
* Panel de admin con filtros por estado: "Pendiente", "Aceptada", "Rechazada".

### 📰 Sistema de Noticias

* Sección de noticias destacadas en la página de inicio.
* CRUD completo de publicaciones.
* Notificación automática por correo para cada nueva noticia.

### 💬 Comentarios Jerárquicos

* Usuarios pueden comentar y responder a otros comentarios.
* Backend robusto para gestión de moderación y eliminación.

### ✉️ Emails y Notificaciones Automatizadas

* Plantillas personalizadas para:

  * Nueva solicitud de adopción.
  * Aceptación o rechazo.
  * Alta de nuevos animales o noticias.
  * Mensajes desde formulario de contacto.

---

## 📂 Estructura del Proyecto

```bash
dsevillanonavarro-animalesmasquefa/
├── animalesmasquefa/         # Backend Django
│   ├── appmustafa/           # App principal: modelos, views, auth, etc.
│   ├── media/                # Archivos subidos
│   ├── staticfiles/          # Recursos estáticos (JS, CSS, img)
│   └── animalesmasquefa/     # Configuración, dashboard Jet, URLs, settings
├── frontend/                 # SPA en React
│   ├── public/               # index.html, manifiestos, redirecciones
│   └── src/                  # Componentes, servicios, rutas
└── README.md                 # Este archivo
```

---

## 🛠️ Stack Tecnológico

### Backend

* **Python 3.x**, **Django 5**, **Django REST Framework**
* **PostgreSQL** como base de datos relacional
* **JWT** para autenticación y sesiones seguras
* **Auditlog**, **Grappelli**, **Jet Dashboard**
* **Gunicorn + Render.com** para despliegue
* Swagger disponible (DRF-YASG) para documentación interactiva

### Frontend

* **React**, **React Router**, **Axios**
* **Lottie** para animaciones SVG interactivas
* **Netlify** como host para SPA
* Optimizado con `browser-image-compression`

---

## 🚀 Instalación Local

### Backend

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Configurar archivo .env (ver .env.example)
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

## 🔐 Variables de Entorno Clave

* `SECRET_KEY`, `DEBUG`, `DATABASE_URL`, `FRONTEND_URL`
* `.env` y `.env.example` incluidos en backend y frontend

---

## 📃 Endpoints REST Principales

Autenticación:

* `POST /api/token/`
* `POST /api/token/refresh/`
* `POST /api/token/verify/`

Usuarios:

* `POST /api/usuarios/registro/`
* `POST /api/usuarios/login/`
* `GET /api/usuarios/perfil/`
* `PUT /api/usuarios/perfil/`

Animales:

* `GET /api/animales/`
* `GET /api/animales/:id/`
* `POST /api/animales/`
* `PUT /api/animales/:id/`
* `DELETE /api/animales/:id/`

Noticias:

* `GET /api/noticias/`
* `GET /api/noticias/:id/`
* `POST /api/noticias/`
* `PUT /api/noticias/:id/`
* `DELETE /api/noticias/:id/`

Comentarios:

* `GET /api/comentarios/`
* `POST /api/comentarios/`

Adopciones:

* `GET /api/adopciones/`
* `POST /api/adopciones/`

---

## 🧪 Testing

```bash
python manage.py test
```

---

## 🌍 Despliegue

* **Backend:** Render.com (Gunicorn, PostgreSQL, Whitenoise)
* **Frontend:** Netlify (SPA con soporte de redirecciones)

---

## 🔗 Recursos

* DeepWiki del proyecto: [https://deepwiki.com/DsevillanoNavarro/AnimalesMasquefa](https://deepwiki.com/DsevillanoNavarro/AnimalesMasquefa)
* Swagger UI disponible en `/swagger/` (requiere login admin)
* Redoc UI disponible en `/redoc/` (requiere login admin)

---

## 🤝 Contribuciones

```bash
# 1. Haz fork
# 2. Crea una rama
 git checkout -b feature/nueva-feature
# 3. Desarrolla y haz commit
 git commit -am "Agrega nueva feature"
# 4. Push y PR
 git push origin feature/nueva-feature
```

---

## 📄 Licencia

Distribuido bajo licencia **MIT**.

---

> "Adopta, no compres. Este proyecto conecta vidas." 🐶🐱
