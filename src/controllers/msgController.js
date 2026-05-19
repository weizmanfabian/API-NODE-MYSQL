// Mensajes de respuesta para las operaciones exitosas del CRUD.
// La estructura corresponde a la configuración de toasts del frontend.

const crearMensaje = (title) => ({
  position: 'top-end',
  icon: 'success',
  title,
  showConfirmButton: false,
  timer: 1500,
  toast: true,
  timerProgressBar: true,
});

module.exports = {
  create: crearMensaje('Registro Exitoso'),
  delete: crearMensaje('Registro Eliminado'),
  update: crearMensaje('Actualización exitosa'),
  get: crearMensaje('Resultados'),
};
