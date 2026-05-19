// Repositorio de acceso al catálogo de la base de datos (INFORMATION_SCHEMA).
// Permite conocer la estructura real de cualquier tabla.
const pool = require('../database');
const logger = require('../utils/logger');
const { ErrorBaseDatos } = require('../errors');

// Consulta las columnas de una tabla en el esquema actual.
// Devuelve un arreglo vacío si la tabla no existe.
const findColumnsByTable = async (tableName) => {
  try {
    const [rows] = await pool.query(
      `SELECT COLUMN_NAME AS columnName, DATA_TYPE AS dataType
         FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?`,
      [tableName],
    );
    return rows;
  } catch (error) {
    logger.error('Error consultando el catálogo de columnas', error);
    throw new ErrorBaseDatos();
  }
};

module.exports = {
  findColumnsByTable,
};
