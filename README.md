# API-NODE-MYSQL

API REST en Node.js + Express que expone un **CRUD genérico sobre MySQL** (la
tabla a operar se recibe como parámetro de ruta) protegido con autenticación
**JWT**.

El proyecto está completamente dockerizado: con un solo comando se levantan la
base de datos y la API.

## Requisitos

- [Docker](https://www.docker.com/) con Docker Compose v2
- Node.js 24+ — solo si vas a desarrollar el backend en local

## Arranque rápido (todo dockerizado)

1. Clona el repositorio.

2. Crea el archivo de entorno a partir de la plantilla:

   ```bash
   cp .env.example .env
   ```

3. Levanta la base de datos y la API:

   ```bash
   docker compose up -d --build
   ```

4. La API queda disponible en `http://localhost:5000`.

Para detener los servicios:

```bash
docker compose down        # conserva los datos de la BD
docker compose down -v     # elimina también el volumen de la BD
```

## Variables de entorno

Se definen en `.env` (ver `.env.example`):

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto de la API | `5000` |
| `NODE_ENV` | Entorno de ejecución | `development` |
| `DB_HOST` | Host de MySQL (`localhost` en local, `db` en Docker) | `localhost` |
| `DB_PORT` | Puerto de MySQL | `3306` |
| `DB_NAME` | Nombre de la base de datos | `web` |
| `DB_USER` | Usuario de la base de datos | `appuser` |
| `DB_PASSWORD` | Contraseña del usuario | `apppassword` |
| `DB_ROOT_PASSWORD` | Contraseña de root de MySQL | `rootpassword` |
| `JWT_SECRET` | Secreto para firmar los tokens JWT | — |
| `JWT_EXPIRES_IN` | Vigencia del token | `5m` |
| `CLIENT_URL` | Origen permitido para CORS | `http://localhost:3000` |

## Base de datos

MySQL 8.4 corre en un contenedor. Al crearse por primera vez ejecuta
automáticamente los scripts de `db/sql/`:

- `create_schema.sql` — crea la tabla `users`
- `data.sql` — inserta los usuarios de ejemplo

Conexión desde el host (con un cliente como DBeaver o MySQL Workbench):

| Parámetro | Valor |
|-----------|-------|
| Host | `localhost` |
| Puerto | `3306` |
| Base de datos | `web` |
| Usuario | `appuser` |
| Contraseña | `apppassword` |

## Desarrollo local del backend

Si prefieres correr la API fuera de Docker (con recarga en caliente):

1. Levanta solo la base de datos:

   ```bash
   docker compose up -d db
   ```

2. Instala las dependencias y arranca en modo desarrollo:

   ```bash
   npm install
   npm run dev
   ```

   `npm run dev` usa nodemon y recarga al guardar. `npm start` corre sin recarga.

## Autenticación

Casi todos los endpoints requieren un token JWT. Para obtenerlo, inicia sesión
con un usuario de ejemplo:

| Email | Contraseña |
|-------|-----------|
| `weizman@example.com` | `Colombia2020*` |
| `ana@example.com` | `Medellin123*` |
| `carlos@example.com` | `Bogota456*` |

```
POST /auth/login
{ "user": "weizman@example.com", "pass": "Colombia2020*" }
```

La respuesta incluye un `token` que se envía en las peticiones protegidas
mediante el header `Authorization: Bearer <token>`.

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/auth/login` | Autentica y devuelve un token JWT |
| `PUT` | `/auth/reset-password` | Restablece la contraseña de un usuario (requiere token) |
| `POST` | `/server/create/:tabla` | Inserta un registro |
| `GET` | `/server/findAll/:tabla` | Lista todos los registros |
| `GET` | `/server/searchBy/:tabla/:name/:value` | Busca por un campo |
| `PUT` | `/server/update/:tabla/:name/:value` | Actualiza un registro |
| `DELETE` | `/server/delete/:tabla/:name/:value` | Elimina un registro |

El detalle de parámetros, cuerpos y respuestas está en la [WIKI](./WIKI.md).

## Documentación

- [ROADMAP.md](./ROADMAP.md) — plan de trabajo por fases
- [WIKI.md](./WIKI.md) — documentación detallada: arquitectura, capas,
  endpoints, pruebas y buenas prácticas aplicadas (Clean Code, SOLID,
  SonarQube, Conventional Commits)
