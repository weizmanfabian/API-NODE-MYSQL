const asyncHandler = require('../utils/async-handler');
const logger = require('../utils/logger');
const msg = require('./msgController');
const genericService = require('../services/generic.service');

// Construye el título descriptivo según la cantidad de resultados.
const describeResultCount = (count) => {
  if (count === 0) {
    return 'Sin resultados';
  }
  return count === 1 ? '1 resultado' : `${count} resultados`;
};

//----------------create----------------
// tabla: tabla afectada
// body: objeto a insertar
exports.create = asyncHandler(async (req, res) => {
  await genericService.crearRegistro(req.params.tabla, req.body);
  logger.info(`Registro insertado en ${req.params.tabla}`);
  res.json({ msg: msg.create });
});

//----------------delete----------------
// tabla: tabla afectada
// name: columna de filtrado
// value: valor del registro a eliminar
exports.delete = asyncHandler(async (req, res) => {
  const { tabla, name, value } = req.params;
  await genericService.eliminarRegistro(tabla, name, value);
  logger.info(`Registro eliminado de ${tabla} donde ${name} = ${value}`);
  res.json({ msg: msg.delete });
});

//----------------findAll----------------
// tabla: tabla a consultar
exports.findAll = asyncHandler(async (req, res) => {
  const rows = await genericService.obtenerRegistros(req.params.tabla);
  logger.info(`${rows.length} registros consultados en ${req.params.tabla}`);
  res.json(rows);
});

//----------------searchBy----------------
// tabla: tabla a consultar
// name: columna de filtrado
// value: valor a buscar
exports.searchBy = asyncHandler(async (req, res) => {
  const { tabla, name, value } = req.params;
  const rows = await genericService.buscarRegistros(tabla, name, value);
  logger.info(`${rows.length} registros encontrados en ${tabla} donde ${name} = ${value}`);
  msg.get.title = describeResultCount(rows.length);
  msg.get.icon = 'info';
  res.json({ rows, msg: msg.get });
});

//----------------update----------------
// tabla: tabla afectada
// name: columna de filtrado
// value: valor del registro a actualizar
// body: objeto con los nuevos valores
exports.update = asyncHandler(async (req, res) => {
  const { tabla, name, value } = req.params;
  await genericService.actualizarRegistro(tabla, name, value, req.body);
  logger.info(`Registro actualizado en ${tabla} donde ${name} = ${value}`);
  res.json({ msg: msg.update });
});
