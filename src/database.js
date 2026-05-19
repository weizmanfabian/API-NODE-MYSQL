// Pool de conexiones a MySQL usando la API de promesas de mysql2.
// Las conexiones se crean bajo demanda y se reutilizan entre peticiones.
const mysql = require('mysql2/promise');
const config = require('../config');

const CONNECTION_LIMIT = 10;

const pool = mysql.createPool({
  ...config.db,
  waitForConnections: true,
  connectionLimit: CONNECTION_LIMIT,
  queueLimit: 0,
});

module.exports = pool;
