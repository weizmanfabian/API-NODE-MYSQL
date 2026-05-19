// Valida tablas y columnas contra la estructura real de la base de datos.
// Esto conserva el CRUD genérico (cualquier tabla) sin riesgo de inyección
// ni de operar sobre identificadores inexistentes.
const schemaRepository = require('../repositories/schema.repository');
const { RecursoNoEncontradoError, SolicitudInvalidaError } = require('../errors');

const TTL_CACHE_MS = 60_000;

// Caché en memoria: nombreTabla -> { columnas: Set<string>, expiraEn: number }
const cache = new Map();

const obtenerColumnasDesdeCache = (tableName) => {
  const entrada = cache.get(tableName);
  if (entrada && entrada.expiraEn > Date.now()) {
    return entrada.columnas;
  }
  return null;
};

const guardarColumnasEnCache = (tableName, columnas) => {
  cache.set(tableName, {
    columnas,
    expiraEn: Date.now() + TTL_CACHE_MS,
  });
};

// Devuelve el conjunto de columnas de la tabla.
// Lanza RecursoNoEncontradoError si la tabla no existe en el catálogo.
const obtenerColumnasDeTabla = async (tableName) => {
  const enCache = obtenerColumnasDesdeCache(tableName);
  if (enCache) {
    return enCache;
  }

  const filas = await schemaRepository.findColumnsByTable(tableName);
  if (filas.length === 0) {
    throw new RecursoNoEncontradoError(`La tabla '${tableName}' no existe`);
  }

  const columnas = new Set(filas.map((fila) => fila.columnName));
  guardarColumnasEnCache(tableName, columnas);
  return columnas;
};

// Verifica que la tabla exista.
const validarTablaExiste = async (tableName) => {
  await obtenerColumnasDeTabla(tableName);
};

// Verifica que una columna pertenezca a la tabla.
const validarColumnaExiste = async (tableName, columnName) => {
  const columnas = await obtenerColumnasDeTabla(tableName);
  if (!columnas.has(columnName)) {
    throw new SolicitudInvalidaError(
      `La columna '${columnName}' no existe en la tabla '${tableName}'`,
    );
  }
};

// Verifica que el cuerpo no esté vacío y que todas sus claves sean
// columnas reales de la tabla.
const validarCuerpo = async (tableName, body) => {
  if (!body || typeof body !== 'object' || Object.keys(body).length === 0) {
    throw new SolicitudInvalidaError('El cuerpo de la petición está vacío');
  }

  const columnas = await obtenerColumnasDeTabla(tableName);
  const clavesInvalidas = Object.keys(body).filter((clave) => !columnas.has(clave));
  if (clavesInvalidas.length > 0) {
    throw new SolicitudInvalidaError(
      `Columnas inválidas para la tabla '${tableName}': ${clavesInvalidas.join(', ')}`,
    );
  }
};

module.exports = {
  validarTablaExiste,
  validarColumnaExiste,
  validarCuerpo,
};
