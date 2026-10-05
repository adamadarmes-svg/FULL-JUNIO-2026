Día38/README.md 

##Despliegues

- **Frontend:** https://dia38-blog.vercel.app
- **Backend:** https://dia38-api.vercel.app/api/health
- **Repositorio:** https://github.com/TU-USUARIO/FULL-JUNIO-2026/tree/main/dia38

##Tecnologías

**Frontend**

- React
- Vite
- React Router v7
- Tailwind CSS v4
- Context API

**Backend**

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- express-validator

**Despliegue**

- Vercel (frontend y backend)

## ✨ Funcionalidades

- Registro e inicio de sesión con JWT y contraseñas encriptadas
- Sesión persistente en el navegador
- Lectura pública de publicaciones y comentarios sin registro
- Crear, editar y eliminar publicaciones propias
- Comentar, editar y eliminar comentarios propios
- Imágenes obligatorias almacenadas en Base64, comprimidas en el navegador
- Paginación de publicaciones
- Validaciones en frontend y backend
- Rutas protegidas y control de permisos por autor

## 📁 Estructura

- `dia38/`
  - `backend/`
    - `api/index.js`
    - `src/`
      - `config/`: Conexión a MongoDB
      - `controllers/`: auth, posts, comments
      - `middlewares/`: auth, validate, errorHandler
      - `models/`: User, Post, Comment
      - `routes/`: authRoutes, postRoutes, commentRoutes
      - `utils/`: jwt, validaciones
      - `app.js`
  - `frontend/`
    - `src/`
      - `components/`: ui, layout, auth, posts, comments
      - `context/`: AuthContext
      - `hooks/`: usePosts, usePost, useComments
      - `lib/`: constantes, formato, imagen
      - `pages/`
      - `router/`
      - `services/`

## 🔌 API

**Autenticación**

- `POST /api/auth/registro`: Público
- `POST /api/auth/login`: Público
- `GET /api/auth/perfil`: Token

**Publicaciones**

- `GET /api/posts`: Público
- `GET /api/posts/:id`: Público
- `POST /api/posts`: Token
- `PUT /api/posts/:id`: Autor
- `DELETE /api/posts/:id`: Autor

**Comentarios**

- `GET /api/posts/:postId/comments`: Público
- `POST /api/posts/:postId/comments`: Token
- `PUT /api/posts/:postId/comments/:id`: Autor
- `DELETE /api/posts/:postId/comments/:id`: Autor

## 🚀 Instalación en local

**Backend**

```bash
cd dia38/backend
npm install
npm run dev
```

`backend/.env`:

```
JWT_EXPIRES_IN=7d
PORT=3001
FRONTEND_URL=http://localhost:5173
```

**Frontend**

```bash
cd dia38/frontend
npm install
npm run dev
```

`frontend/.env`:

```
VITE_API_URL=https://full-junio-2026-hln6.vercel.app/api
```

Disponible en `https://dia38-frontend.vercel.app`.
