const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config');
const asyncHandler = require('../utils/async-handler');
const logger = require('../utils/logger');
const userRepository = require('../repositories/user.repository');
const { SolicitudInvalidaError, NoAutorizadoError } = require('../errors');

// Mensaje genérico: no revela si falló el usuario o la contraseña,
// para no facilitar la enumeración de usuarios.
const CREDENCIALES_INVALIDAS = 'Credenciales inválidas';

// Genera un token JWT con los datos públicos del usuario (sin la contraseña).
const generarToken = (usuario) => {
  const payload = {
    id: usuario.id,
    name: usuario.name,
    email: usuario.email,
  };
  return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
};

//----------------login----------------
// user: email del usuario
// pass: contraseña en texto plano
exports.login = asyncHandler(async (req, res) => {
  const { user, pass } = req.body;
  if (!user || !pass) {
    throw new SolicitudInvalidaError('El usuario y la contraseña son requeridos');
  }

  const usuario = await userRepository.findByEmail(user);
  if (!usuario) {
    throw new NoAutorizadoError(CREDENCIALES_INVALIDAS);
  }

  const passwordValida = await bcrypt.compare(pass, usuario.pass);
  if (!passwordValida) {
    throw new NoAutorizadoError(CREDENCIALES_INVALIDAS);
  }

  logger.info(`Inicio de sesión exitoso: ${usuario.email}`);
  res.json({ token: generarToken(usuario) });
});
