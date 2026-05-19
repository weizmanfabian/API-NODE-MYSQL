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

// Actualiza la contraseña (hash) de un usuario identificado por su email.
const updatePassword = async (email, passwordHash) => {
  try {
    await pool.query('UPDATE users SET pass = ? WHERE email = ?', [passwordHash, email]);
  } catch (error) {
    logger.error('Error actualizando la contraseña del usuario', error);
    throw new ErrorBaseDatos();
  }
};

module.exports = {
  findByEmail,
  updatePassword,
};
