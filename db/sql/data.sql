-- Datos iniciales de ejemplo.
-- Las contraseñas están en texto plano por ahora porque el login actual
-- las compara así; en la Fase 2 se reemplazan por hashes bcrypt junto
-- con el refactor de autenticación.

INSERT INTO users (name, email, pass) VALUES
  ('Weizman Fabian', 'weizman@example.com', 'Colombia2020*'),
  ('Ana Gomez',      'ana@example.com',     'Medellin123*'),
  ('Carlos Ruiz',    'carlos@example.com',  'Bogota456*');
