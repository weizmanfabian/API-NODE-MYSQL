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

- **Fase en curso:** Fase 1 — Base de datos dockerizada
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

- [ ] Crear `db/sql/create_schema.sql` (tabla `users`)
- [ ] Crear `db/sql/data.sql` (usuarios de ejemplo)
- [ ] Crear `docker-compose.yml` con servicio `db` (MySQL 8.4)
- [ ] Configurar volumen persistente y `healthcheck` del servicio `db`
- [ ] Montar `db/sql/` en `/docker-entrypoint-initdb.d`
- [ ] Verificar: `docker compose up` levanta la BD y carga schema + datos
- [ ] Commit de la Fase 1

## Fase 2 — Refactor del backend

- [ ] Mover configuración a variables de entorno (`dotenv`)
- [ ] Eliminar credenciales y secreto JWT hardcodeados
- [ ] Migrar a pool de `mysql2/promise`
- [ ] Estructurar en capas: `routes → controllers → services → repository → middleware`
- [ ] Implementar `SchemaRepository` (consulta a `INFORMATION_SCHEMA`)
- [ ] Implementar `SchemaValidatorService` (validación + caché con TTL)
- [ ] Crear jerarquía de errores de dominio
- [ ] Crear middleware de manejo de errores centralizado
- [ ] Crear `asyncHandler` y aplicarlo a los controladores
- [ ] Agregar logger dedicado (reemplazar `console.log`)
- [ ] Agregar handlers globales (`unhandledRejection`, `uncaughtException`) y 404
- [ ] Corregir el bug de `login`
- [ ] Hashear contraseñas con `bcrypt`
- [ ] Eliminar código muerto
- [ ] Limpiar dependencias sin uso en `package.json`
- [ ] Corregir `npm scripts` (`start` = node, `dev` = nodemon)
- [ ] Verificar: la API funciona contra la BD dockerizada con `npm start`
- [ ] Commit(s) de la Fase 2

## Fase 3 — Dockerizar el backend

- [ ] Crear `Dockerfile` multi-stage (`node:24-alpine`, usuario no-root)
- [ ] Agregar servicio `api` al `docker-compose.yml`
- [ ] Configurar `depends_on` con `healthcheck` de la BD
- [ ] Verificar: `docker compose up` levanta BD + API juntos
- [ ] Commit de la Fase 3

## Fase 4 — Documentación y cierre

- [ ] Actualizar `README.md` (instrucciones de instalación y conexiones)
- [ ] Completar `WIKI.md` (arquitectura, modelo de datos, endpoints, pruebas)
- [ ] Actualizar `testing/peticion.http`
- [ ] Revisión final con quality gates
- [ ] Pull Request
