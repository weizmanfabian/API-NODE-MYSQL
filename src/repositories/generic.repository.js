// Repositorio de CRUD genérico sobre cualquier tabla.
// Los identificadores (tabla, columna) se escapan con el placeholder `??`
// y los valores con `?`, lo que evita la inyección de SQL.
const pool = require('../database');

const insert = async (table, data) => {
  const [result] = await pool.query('INSERT INTO ?? SET ?', [table, data]);
  return result;
};

const findAll = async (table) => {
  const [rows] = await pool.query('SELECT * FROM ??', [table]);
  return rows;
};

const findBy = async (table, column, value) => {
  const [rows] = await pool.query(
    'SELECT * FROM ?? WHERE ?? = ?',
    [table, column, value],
  );
  return rows;
};

const update = async (table, column, value, data) => {
  const [result] = await pool.query(
    'UPDATE ?? SET ? WHERE ?? = ?',
    [table, data, column, value],
  );
  return result;
};

const remove = async (table, column, value) => {
  const [result] = await pool.query(
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
