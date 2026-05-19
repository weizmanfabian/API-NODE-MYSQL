// Capa de servicio del CRUD genérico.
// Valida la tabla y las columnas contra el catálogo y luego delega
// la operación en el repositorio.
const genericRepository = require('../repositories/generic.repository');
const schemaValidator = require('./schema-validator.service');

const crearRegistro = async (tabla, datos) => {
  await schemaValidator.validarCuerpo(tabla, datos);
  return genericRepository.insert(tabla, datos);
};

const obtenerRegistros = async (tabla) => {
  await schemaValidator.validarTablaExiste(tabla);
  return genericRepository.findAll(tabla);
};

const buscarRegistros = async (tabla, columna, valor) => {
  await schemaValidator.validarColumnaExiste(tabla, columna);
  return genericRepository.findBy(tabla, columna, valor);
};

const actualizarRegistro = async (tabla, columna, valor, datos) => {
  await schemaValidator.validarColumnaExiste(tabla, columna);
  await schemaValidator.validarCuerpo(tabla, datos);
  return genericRepository.update(tabla, columna, valor, datos);
};

const eliminarRegistro = async (tabla, columna, valor) => {
  await schemaValidator.validarColumnaExiste(tabla, columna);
  return genericRepository.remove(tabla, columna, valor);
};

module.exports = {
  crearRegistro,
  obtenerRegistros,
  buscarRegistros,
  actualizarRegistro,
  eliminarRegistro,
};
