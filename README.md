# AnimalesMasquefa

**AnimalesMasquefa** es una aplicación web para la gestión de un refugio de animales que permite:

* 📋 Administrar animales disponibles para adopción.
* 📰 Publicar y gestionar noticias.
* 💬 Gestionar comentarios de usuarios.
* 🐾 Procesar solicitudes de adopción.
* 🔐 Autenticación y perfiles de usuario.

---

## 📂 Estructura del Proyecto

```
├── README.md                # Documentación principal
├── package.json             # Dependencias frontend
├── requirements.txt         # Dependencias backend
├── animalesmasquefa/        # Backend Django
│   ├── manage.py
│   ├── Procfile
│   ├── private.key
│   ├── public.key
│   ├── requisitos backend (requirements.txt)
│   ├── animalesmasquefa/    # Configuración Django (settings, urls, wsgi, asgi)
│   └── appmustafa/          # App principal (models, views, serializers, tests)
│       ├── models.py
│       ├── views.py
│       ├── serializers.py
│       ├── urls.py
│       └── migrations/
├── media/                   # Archivos estáticos de usuarios (imágenes de animales, noticias)
├── staticfiles/             # Archivos estáticos de Django admin y paquetes
└── frontend/                # Frontend React
    ├── README.md            # Documentación frontend
    ├── package.json
    ├── webpack.config.js
    └── src/                # Código fuente React
```

---

## 🛠 Tecnologías

**Backend**:

* Python 3.x, Django 5.x
* Django REST Framework
* PostgreSQL
* JWT para autenticación
* Gunicorn
* Jet Dashboard (dashboard personalizado)

**Frontend**:

* React
* Axios
* React Router
* Lottie para animaciones
* Netlify/Vercel (posibles despliegues)

---

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/DsevillanoNavarro/AnimalesMasquefa.git
cd AnimalesMasquefa
```

### 2. Configurar Backend

1. Crear y activar entorno virtual:

   ```bash
   python -m venv venv
   source venv/bin/activate    # Windows: venv\Scripts\activate
   ```
2. Instalar dependencias:

   ```bash
   pip install -r requirements.txt
   ```
3. Ajustar conexión a PostgreSQL en `animalesmasquefa/settings.py`.
4. Migrar la base de datos:

   ```bash
   python manage.py migrate
   ```
5. Ejecutar servidor de desarrollo:

   ```bash
   python manage.py runserver
   ```

### 3. Configurar Frontend

1. Ir al directorio frontend:

   ```bash
   cd frontend
   ```
2. Instalar dependencias:

   ```bash
   npm install
   ```
3. Levantar el servidor de React:

   ```bash
   npm start
   ```

---

## 🔗 API REST

| Endpoint              | Método | Descripción                    |
| --------------------- | ------ | ------------------------------ |
| `/api/animales/`      | GET    | Listar animales                |
|                       | POST   | Crear nuevo animal             |
|                       | PUT    | Actualizar datos de un animal  |
|                       | DELETE | Eliminar un animal             |
| `/api/noticias/`      | GET    | Listar noticias                |
| `/api/comentarios/`   | GET    | Listar comentarios             |
| `/api/adopciones/`    | GET    | Listar solicitudes de adopción |
| `/api/usuarios/`      | POST   | Registrar usuario              |
| `/api/token/`         | POST   | Obtener JWT                    |
| `/api/token/refresh/` | POST   | Refrescar JWT                  |
| `/api/token/verify/`  | POST   | Verificar validez de JWT       |

---

## 📦 Despliegue

* **Backend**: Deploy con Render.com (Gunicorn + PostgreSQL).
* **Frontend**: Deploy en Netlify, Vercel o servicio similar.

---

## 🤝 Contribución

1. Haz fork del proyecto.
2. Crea una rama para tu funcionalidad:

   ```bash
   ```

git checkout -b feature/nueva-funcionalidad

````
3. Realiza tus cambios y commitea:
   ```bash
git commit -am "Añade funcionalidad X"
````

4. Haz push a tu rama:

   ```bash
   ```

git push origin feature/nueva-funcionalidad

```
5. Abre un Pull Request.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.  

> _Desarrollado con ❤️ por DsevillanoNavarro_

```

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/DsevillanoNavarro/AnimalesMasquefa)