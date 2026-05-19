-- Datos iniciales de ejemplo.
-- Las contraseñas se almacenan como hash bcrypt.
-- Contraseñas en texto plano (solo para probar el login):
--   weizman@example.com -> Colombia2020*
--   ana@example.com     -> Medellin123*
--   carlos@example.com  -> Bogota456*

INSERT INTO users (name, email, pass) VALUES
  ('Weizman Fabian', 'weizman@example.com', '$2a$10$GhL2/MqINR0TqHSVKCT9humP..oZx4qhaUrAAcgjy51Do1a0u44Y.'),
  ('Ana Gomez',      'ana@example.com',     '$2a$10$paCHrLDE8FnJ6Y99Z20CKOi.txKUoK9F8gXvVbV.sbAcFacTPH3dW'),
  ('Carlos Ruiz',    'carlos@example.com',  '$2a$10$DIKI74F.O3YwqZ3Vmfnle./IBbx/nexEHN3f/.QAlJQsWEFPxgePC');
