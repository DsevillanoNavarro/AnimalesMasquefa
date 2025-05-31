# 🐾 AnimalesMasquefa

**AnimalesMasquefa** es una plataforma web para la gestión integral de un refugio de animales. Este proyecto ha sido desarrollado como Trabajo de Fin de Grado, combinando tecnologías modernas para el frontend y backend.

Permite a usuarios explorar animales disponibles para adopción, enviar solicitudes, mantenerse informados con noticias del refugio y gestionar su perfil de forma segura. A los administradores les proporciona una interfaz amigable para gestionar todos los recursos, con un panel de control extendido y notificaciones automáticas por email.

---

## 🧩 Funcionalidades

### 👥 Usuarios
- Registro, inicio/cierre de sesión.
- Recuperación y restablecimiento de contraseña.
- Gestión de perfil.

### 🐕‍🦺 Animales
- Listado y detalle de animales.
- CRUD completo desde el panel admin.
- Gestión de imágenes.

### 📬 Adopciones
- Formulario de solicitud con validación.
- Control de duplicados.
- Notificaciones por email (aceptación/rechazo).

### 🗞 Noticias
- Publicación de noticias.
- Visualización en frontend (home y página dedicada).
- Notificaciones automáticas por email.

### 💬 Comentarios
- Añadir y responder comentarios (jerárquico).
- Moderación desde el panel de administración.

### ✉️ Emails
- Sistema de plantillas HTML para notificaciones.
- Email de confirmación de adopción, nuevo animal, contacto recibido, etc.

---

## 📁 Estructura del Proyecto

```
AnimalesMasquefa/
├── animalesmasquefa/     # Backend Django
│   ├── animalesmasquefa/ # Configuración del proyecto
│   ├── appmustafa/       # App principal (models, views, serializers)
│   ├── media/            # Archivos subidos
│   ├── staticfiles/      # Archivos estáticos
├── frontend/             # Frontend en React
│   ├── src/              # Código fuente
│   ├── public/           # Archivos públicos y configuración Netlify
├── porHacer              # Lista de mejoras pendientes
├── README.md             # Este archivo
```

---

## 🛠 Tecnologías Utilizadas

### Backend
- Python 3.x
- Django 5
- Django REST Framework
- PostgreSQL
- JWT (autenticación)
- Jet & Grappelli (dashboard)
- Gunicorn (producción)

### Frontend
- React
- React Router
- Axios
- Lottie (animaciones)
- Netlify / Vercel (despliegue)

---

## 🚀 Instalación

### 🔙 Backend

```bash
# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar PostgreSQL en settings.py

# Aplicar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# Ejecutar servidor
python manage.py runserver
```

### 🌐 Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🔐 Variables de Entorno

- `.env` (Django): claves secretas, base de datos, configuración JWT.
- `netlify.toml`: para soporte SPA en Netlify.

---

## 📦 Endpoints REST

### 🔑 Autenticación
| Método | Ruta                       | Descripción                      |
|--------|----------------------------|----------------------------------|
| POST   | `/api/token/`              | Obtener token JWT                |
| POST   | `/api/token/refresh/`      | Refrescar token JWT              |
| POST   | `/api/token/verify/`       | Verificar validez del token      |

### 👥 Usuarios
| Método | Ruta                       | Descripción                      |
|--------|----------------------------|----------------------------------|
| POST   | `/api/usuarios/registro/`  | Registro de nuevo usuario        |
| POST   | `/api/usuarios/login/`     | Inicio de sesión                 |
| GET    | `/api/usuarios/perfil/`    | Obtener perfil del usuario       |
| PUT    | `/api/usuarios/perfil/`    | Editar perfil del usuario        |

### 🐾 Animales
| Método | Ruta                       | Descripción                      |
|--------|----------------------------|----------------------------------|
| GET    | `/api/animales/`           | Listar todos los animales        |
| GET    | `/api/animales/:id/`       | Obtener detalles de un animal    |
| POST   | `/api/animales/`           | Crear nuevo animal               |
| PUT    | `/api/animales/:id/`       | Editar animal                    |
| DELETE | `/api/animales/:id/`       | Eliminar animal                  |

### 🗞 Noticias
| Método | Ruta                       | Descripción                      |
|--------|----------------------------|----------------------------------|
| GET    | `/api/noticias/`           | Listar noticias                  |
| GET    | `/api/noticias/:id/`       | Ver detalle de noticia           |
| POST   | `/api/noticias/`           | Crear nueva noticia              |
| PUT    | `/api/noticias/:id/`       | Editar noticia                   |
| DELETE | `/api/noticias/:id/`       | Eliminar noticia                 |

### 💬 Comentarios
| Método | Ruta                       | Descripción                      |
|--------|----------------------------|----------------------------------|
| GET    | `/api/comentarios/`        | Listar comentarios               |
| POST   | `/api/comentarios/`        | Crear nuevo comentario           |

### 📬 Adopciones
| Método | Ruta                       | Descripción                      |
|--------|----------------------------|----------------------------------|
| GET    | `/api/adopciones/`         | Listar solicitudes               |
| POST   | `/api/adopciones/`         | Enviar nueva solicitud           |

---

## 🧪 Testing

### Backend (Django)
```bash
python manage.py test
```

### Frontend (React)
```bash
npm test
```

---

## 🌍 Despliegue

- **Backend**: Render.com (usando Gunicorn + PostgreSQL).
- **Frontend**: Netlify (con `netlify.toml` para redirecciones SPA).

---

## ✅ Mejoras Pendientes

Ver el archivo [`porHacer`](./porHacer):

```txt
- Arreglar adopciones de la misma persona (validación mejorada).
- Arreglar visualización de "ver más comentarios".
- Mejorar estética de los emails enviados.
```

---

## 🤝 Contribuir

```bash
# 1. Haz fork del repositorio
# 2. Crea una rama:
git checkout -b feature/mi-nueva-funcionalidad

# 3. Realiza cambios y haz commit:
git commit -am "Agrega X"

# 4. Push y Pull Request
git push origin feature/mi-nueva-funcionalidad
```

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

> “Adopta, no compres. Este proyecto conecta vidas.” 🐶🐱
