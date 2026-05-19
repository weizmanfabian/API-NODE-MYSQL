// Repositorio de acceso a la tabla de usuarios.
const pool = require('../database');
const logger = require('../utils/logger');
const { ErrorBaseDatos } = require('../errors');

// Busca un usuario por su email. Devuelve null si no existe.
const findByEmail = async (email) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
  } catch (error) {
    logger.error('Error consultando el usuario por email', error);
    throw new ErrorBaseDatos();
  }
};

module.exports = {
  findByEmail,
};
