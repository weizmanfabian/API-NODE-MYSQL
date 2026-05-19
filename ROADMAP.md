# Roadmap — Dockerización y Refactor de API-NODE-MYSQL

> Documento vivo. Marca cada tarea (`[x]`) al completarla para no perder
> contexto entre sesiones.

## Objetivo

Levantar el proyecto completamente dockerizado para despliegue local fácil
(cualquier desarrollador que vea el repo en GitHub puede probarlo con un
`docker compose up`), y refactorizar el código con buenas prácticas **sin
perder la esencia**: CRUD genérico sobre tabla dinámica (`/:tabla`) + login JWT.

## Estrategia (acordada)

Por fases. Primero solo la base de datos en Docker; el backend corre local con
`npm start` durante el refactor (ciclo de feedback rápido con nodemon). El
backend se dockeriza al final, dejando el repo con un solo `docker compose up`
que levanta BD + API.

## Estado actual

- **Fase en curso:** Fase 4 — Documentación y cierre
- **Última actualización:** 2026-05-19

## Diagnóstico inicial (hallazgos)

- 🐞 `login` genera token aunque la contraseña sea incorrecta; revienta si el
  usuario no existe (`result[0]`); llama `res.json()` dos veces.
- 🔒 SQL Injection en todos los endpoints (tabla/columna concatenadas;
  `searchByDate` concatena valores).
- 🔒 Secreto JWT `'secretkey'` y credenciales de BD hardcodeados; contraseñas en
  texto plano.
- 🧹 Código muerto: `login1`, `login2`, `imgController`, `msgController`,
  `img.route.js` (importa archivos inexistentes), `getData`, rutas comentadas.
- 📦 Dependencias sin uso: `bcrypt`, `bcryptjs`, `sequelize`, `pug`, `multer`,
  `webpack`, `body-parser`, `path`.
- ⚙️ `npm start` usa `nodemon`; sin `.env`; `express-myconnection` sin mantener.
- 🖥️ Entorno local: Node v24.14.0 / npm 11.9.0.

## Decisiones de diseño

- **CRUD genérico seguro:** sin allowlist de tablas. Validación por
  introspección del catálogo (`INFORMATION_SCHEMA.COLUMNS`): la tabla y las
  columnas deben existir; identificadores con `escapeId()`; valores siempre
  parametrizados (`?`); metadata cacheada en memoria con TTL.
- **Migración a `mysql2/promise`** con `async/await` (habilita manejo de
  errores centralizado).
- **Manejo de excepciones:** jerarquía de errores de dominio + middleware
  centralizado + `asyncHandler` + logger dedicado + handlers globales + 404.
- **CommonJS** se conserva (no migrar a ESM).

---

## Fase 0 — Preparación

- [x] Crear rama `chore/dockerizacion-y-refactor`
- [x] Agregar `ROADMAP.md` al repo
- [x] Actualizar `.gitignore` (`.env`, `public/`, logs)
- [x] Crear `.dockerignore`
- [x] Crear `.env.example` con todas las variables
- [x] Crear `WIKI.md` (documentación detallada del proyecto)

## Fase 1 — Base de datos dockerizada

- [x] Crear `db/sql/create_schema.sql` (tabla `users`)
- [x] Crear `db/sql/data.sql` (usuarios de ejemplo)
- [x] Crear `docker-compose.yml` con servicio `db` (MySQL 8.4)
- [x] Configurar volumen persistente y `healthcheck` del servicio `db`
- [x] Montar `db/sql/` en `/docker-entrypoint-initdb.d`
- [x] Verificar: `docker compose up` levanta la BD y carga schema + datos
- [x] Commit de la Fase 1

## Fase 2 — Refactor del backend

Dividida en commits atómicos; cada uno deja la app en estado funcional.
Estructura final por capas: `routes → controllers → services → repository → middleware`.

### Commit 1 — `chore`: limpieza

- [x] Eliminar código muerto (`login1`, `login2`, `imgController`, `img.route.js`)
- [x] Eliminar dependencias sin uso de `package.json`
- [x] Corregir `npm scripts` (`start` = node, `dev` = nodemon) y `main`

### Commit 2 — `refactor(config)`: configuración por entorno

- [x] Mover configuración a variables de entorno con `dotenv`
- [x] Eliminar credenciales y secreto JWT hardcodeados

### Commit 3 — `refactor(db)`: capa de acceso a datos

- [x] Crear el pool de conexiones `mysql2/promise`
- [x] Crear `generic.repository.js` (CRUD parametrizado con `??` y `?`)
- [x] Migrar `default.controller` al repositorio con async/await
- [x] Eliminar `searchByDate` y `getData` (código muerto sin ruta)

### Commit 4 — `feat(errors)`: manejo de excepciones

- [x] Crear jerarquía de errores de dominio
- [x] Agregar logger dedicado (reemplazar `console.log`)
- [x] Crear `asyncHandler`
- [x] Crear middleware de manejo de errores centralizado y de 404
- [x] Agregar handlers globales (`unhandledRejection`, `uncaughtException`)
- [x] Crear middleware de autenticación (`verifyToken` deja de estar inline)
- [x] Envolver los errores de `mysql2` en errores de dominio (repositorio)
- [x] Refactorizar `default.controller` con `asyncHandler` y errores de dominio

### Commit 5 — `feat(validacion)`: validación por metadata

- [x] Implementar `schema.repository.js` (consulta a `INFORMATION_SCHEMA`)
- [x] Implementar `schema-validator.service.js` (validación + caché con TTL)
- [x] Agregar la capa de servicio que valida y delega al repositorio

### Commit 6 — `fix(auth)`: autenticación

- [x] Migrar `login` al repositorio y retirar `express-myconnection`
- [x] Corregir el bug de `login` (token solo con credenciales válidas)
- [x] Hashear contraseñas con `bcryptjs` (pure JS, sin build nativo en Docker)
- [x] Cargar el secreto JWT desde variables de entorno (hecho en el Commit 2)

### Cierre de fase

- [x] Verificar: la API funciona contra la BD dockerizada con `npm start`

## Fase 3 — Dockerizar el backend

- [x] Crear `Dockerfile` multi-stage (`node:24-alpine`, usuario no-root)
- [x] Agregar servicio `api` al `docker-compose.yml`
- [x] Configurar `depends_on` con `healthcheck` de la BD
- [x] Verificar: `docker compose up` levanta BD + API juntos
- [x] Commit de la Fase 3

## Fase 4 — Documentación y cierre

- [ ] Actualizar `README.md` (instrucciones de instalación y conexiones)
- [ ] Completar `WIKI.md` (arquitectura, modelo de datos, endpoints, pruebas)
- [ ] Actualizar `testing/peticion.http`
- [ ] Revisión final con quality gates
- [ ] Pull Request
