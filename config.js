// Configuración de la aplicación a partir de variables de entorno.
// Los valores se cargan desde el archivo .env (ver .env.example).
require('dotenv').config();

const DEFAULT_SERVER_PORT = 5000;
const DEFAULT_DB_PORT = 3306;
const DEFAULT_CLIENT_URL = 'http://localhost:3000';
const DEFAULT_JWT_EXPIRES_IN = '5m';

const port = Number(process.env.PORT) || DEFAULT_SERVER_PORT;

const db = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || DEFAULT_DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const corsSetting = {
  origin: process.env.CLIENT_URL || DEFAULT_CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

const jwt = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN || DEFAULT_JWT_EXPIRES_IN,
};

module.exports = {
  port,
  db,
  corsSetting,
  jwt,
};
