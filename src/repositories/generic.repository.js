// Repositorio de CRUD genérico sobre cualquier tabla.
// Los identificadores (tabla, columna) se escapan con el placeholder `??`
// y los valores con `?`, lo que evita la inyección de SQL.
const pool = require('../database');
const logger = require('../utils/logger');
const { ErrorBaseDatos } = require('../errors');

// Ejecuta una consulta y envuelve cualquier error de mysql2 en un
// error de dominio, sin exponer el SQL crudo a las capas superiores.
const ejecutarConsulta = async (sql, parametros) => {
  try {
    return await pool.query(sql, parametros);
  } catch (error) {
    logger.error('Error ejecutando consulta SQL', error);
    throw new ErrorBaseDatos();
  }
};

const insert = async (table, data) => {
  const [result] = await ejecutarConsulta('INSERT INTO ?? SET ?', [table, data]);
  return result;
};

const findAll = async (table) => {
  const [rows] = await ejecutarConsulta('SELECT * FROM ??', [table]);
  return rows;
};

const findBy = async (table, column, value) => {
  const [rows] = await ejecutarConsulta(
    'SELECT * FROM ?? WHERE ?? = ?',
    [table, column, value],
  );
  return rows;
};

const update = async (table, column, value, data) => {
  const [result] = await ejecutarConsulta(
    'UPDATE ?? SET ? WHERE ?? = ?',
    [table, data, column, value],
  );
  return result;
};

const remove = async (table, column, value) => {
  const [result] = await ejecutarConsulta(
    'DELETE FROM ?? WHERE ?? = ?',
    [table, column, value],
  );
  return result;
};

module.exports = {
  insert,
  findAll,
  findBy,
  update,
  remove,
};
