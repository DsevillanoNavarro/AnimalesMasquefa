# 🐾 AnimalesMasquefa

**AnimalesMasquefa** es una plataforma web completa para la gestión de un refugio de animales. Desarrollada como Trabajo de Fin de Grado, combina tecnologías modernas en el frontend (React) y backend (Django).

Usuarios y administradores pueden interactuar con la plataforma: desde explorar animales, hasta gestionar solicitudes de adopción, publicaciones de noticias, perfiles de usuario y notificaciones automáticas.

---

## 🧩 Funcionalidades

### 👥 Usuarios

* Registro, inicio/cierre de sesión.
* Recuperación y restablecimiento de contraseña.
* Edición del perfil (foto, datos personales).
* Roles diferenciados (usuario/administrador).

### 🐕‍🦺 Animales

* Vista de detalle por especie, nombre, edad, descripción e imágenes.
* Panel de administrador con CRUD completo.
* Carga comprimida de imágenes (optimizadas vía `browser-image-compression`).

### 📬 Adopciones

* Formulario con validación (previene solicitudes duplicadas).
* Gestión desde panel admin: aceptación o rechazo con notificación automática.
* Emails HTML con diseño personalizado por estado (aceptado/rechazado).

### 🗞 Noticias

* CRUD desde el panel admin.
* Sección destacada en la Home y vista de detalle.
* Notificación automática por correo a usuarios registrados.

### 💬 Comentarios

* Sistema jerárquico (respuestas a comentarios).
* Visualización en frontend y administración total desde backend.

### ✉️ Emails y notificaciones

* Plantillas HTML para eventos clave:

  * Nueva adopción enviada.
  * Confirmaciones de adopción.
  * Notificación de nuevo animal / noticia.
  * Mensajes de contacto recibidos.

---

## 📁 Estructura del Proyecto

```
dsevillanonavarro-animalesmasquefa/
├── animalesmasquefa/          # Backend Django
│   ├── animalesmasquefa/      # Configuración principal y dashboard Jet
│   ├── appmustafa/            # App con modelos, views, serializers, tests
│   ├── media/                 # Archivos subidos por usuarios
│   └── staticfiles/           # Archivos estáticos y recursos admin
├── frontend/                  # Frontend en React
│   ├── src/                   # Componentes, páginas, servicios
│   └── public/                # Archivos estáticos y SPA settings
└── README.md                  # Este archivo
```

---

## 🛠 Tecnologías Utilizadas

### Backend

* Python 3.x
* Django 5
* Django REST Framework
* PostgreSQL
* JWT (autenticación segura)
* Jet & Grappelli (mejora del panel admin)
* Gunicorn + Render (producción)
* Auditlog (auditoría completa)

### Frontend

* React + React Router
* Axios
* Lottie para animaciones interactivas
* Netlify para despliegue SPA
* `browser-image-compression` para optimización de imágenes

---

## 🚀 Instalación y Uso Local

### 🔙 Backend (Django)

```bash
python -m venv venv
source venv/bin/activate  # o venv\Scripts\activate en Windows
pip install -r requirements.txt

# Configurar .env con DATABASE_URL y SECRET_KEY
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### 🌐 Frontend (React)

```bash
cd frontend
npm install
npm start
```

---

## 🔐 Variables de Entorno

* `.env`: SECRET\_KEY, DEBUG, DATABASE\_URL, FRONTEND\_URL
* `netlify.toml`: manejo de rutas SPA en producción

---

## 📦 Endpoints REST (Principales)

### 🔑 Autenticación

| Método | Ruta                  | Descripción       |
| ------ | --------------------- | ----------------- |
| POST   | `/api/token/`         | Obtener token JWT |
| POST   | `/api/token/refresh/` | Refrescar token   |
| POST   | `/api/token/verify/`  | Verificar token   |

### 👥 Usuarios

| Método | Ruta                      | Descripción   |
| ------ | ------------------------- | ------------- |
| POST   | `/api/usuarios/registro/` | Registro      |
| POST   | `/api/usuarios/login/`    | Login         |
| GET    | `/api/usuarios/perfil/`   | Ver perfil    |
| PUT    | `/api/usuarios/perfil/`   | Editar perfil |

### 🐾 Animales

| Método | Ruta                 | Descripción         |
| ------ | -------------------- | ------------------- |
| GET    | `/api/animales/`     | Listado de animales |
| GET    | `/api/animales/:id/` | Detalle de animal   |
| POST   | `/api/animales/`     | Crear animal        |
| PUT    | `/api/animales/:id/` | Editar animal       |
| DELETE | `/api/animales/:id/` | Eliminar animal     |

### 🗞 Noticias

| Método | Ruta                 | Descripción      |
| ------ | -------------------- | ---------------- |
| GET    | `/api/noticias/`     | Listar noticias  |
| GET    | `/api/noticias/:id/` | Ver detalle      |
| POST   | `/api/noticias/`     | Crear noticia    |
| PUT    | `/api/noticias/:id/` | Editar noticia   |
| DELETE | `/api/noticias/:id/` | Eliminar noticia |

### 💬 Comentarios

| Método | Ruta                | Descripción        |
| ------ | ------------------- | ------------------ |
| GET    | `/api/comentarios/` | Listar comentarios |
| POST   | `/api/comentarios/` | Crear comentario   |

### 📬 Adopciones

| Método | Ruta               | Descripción                 |
| ------ | ------------------ | --------------------------- |
| GET    | `/api/adopciones/` | Listar solicitudes          |
| POST   | `/api/adopciones/` | Nueva solicitud de adopción |

---

## 🧪 Testing

### Backend

```bash
python manage.py test
```

### Frontend

```bash
npm test
```

---

## 🌍 Despliegue

* **Backend**: Render.com (Gunicorn, PostgreSQL).
* **Frontend**: Netlify (SPA completa con configuración de redirecciones).

---

## 🤝 Contribuir

```bash
# 1. Haz fork del repositorio
# 2. Crea una rama con tu funcionalidad:
git checkout -b feature/mi-nueva-funcionalidad

# 3. Realiza tus cambios y haz commit
git commit -am "Agrega nueva funcionalidad"

# 4. Haz push y abre un Pull Request
git push origin feature/mi-nueva-funcionalidad
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

> “Adopta, no compres. Este proyecto conecta vidas.” 🐶🐱
