# Wiki — API-NODE-MYSQL

> Documentación detallada del proyecto. Es un documento vivo: se completa a
> medida que avanzan las fases del [ROADMAP](./ROADMAP.md). El `README.md`
> cubre la instalación; este archivo cubre el "cómo funciona" y las pruebas.

## 1. Descripción

API REST en Node.js + Express que expone un **CRUD genérico sobre MySQL**: la
tabla a operar se recibe como parámetro de ruta (`/:tabla`), de modo que un
mismo conjunto de endpoints sirve para cualquier tabla del esquema. El acceso
está protegido con autenticación **JWT**.

## 2. Arquitectura

_Pendiente — se documenta en la Fase 2 (refactor a capas:
`routes → controllers → services → repository → middleware`)._

## 3. Modelo de datos

_Pendiente — se documenta en la Fase 1 (esquema en `db/sql/create_schema.sql`)._

## 4. Endpoints

> Detalle de parámetros, cuerpos y respuestas. Se actualiza tras el refactor.

### Autenticación

- `POST /auth/login` — autentica un usuario y devuelve un token JWT.

### CRUD genérico (`/server`, requiere token)

- `POST   /server/create/:tabla` — inserta un registro.
- `GET    /server/findAll/:tabla` — lista todos los registros.
- `GET    /server/searchBy/:tabla/:name/:value` — busca por un campo.
- `PUT    /server/update/:tabla/:name/:value` — actualiza un registro.
- `DELETE /server/delete/:tabla/:name/:value` — elimina un registro.

## 5. Autenticación y seguridad

_Pendiente — se documenta en la Fase 2 (JWT, hash de contraseñas, validación
de identificadores por introspección del catálogo)._

## 6. Pruebas

_Pendiente — se documenta a medida que avancen las fases._

- Pruebas manuales: ver `testing/peticion.http` y la colección Postman
  `JWTMYSQL.postman_collection.json`.

## 7. Decisiones de diseño

Ver la sección "Decisiones de diseño" del [ROADMAP](./ROADMAP.md).
